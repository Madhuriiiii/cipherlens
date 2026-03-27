import zxcvbn from 'zxcvbn';

export type StrengthLabel = 'Weak' | 'Moderate' | 'Strong' | 'Very Strong';

export interface AnalysisResult {
  score: number;
  entropy: number;
  percentage: number;
  strengthLabel: StrengthLabel;
  crackTime: string;
  feedback: {
    warning: string;
    suggestions: string[];
    vulnerabilities: { id: string; label: string }[];
  };
}

const getEntropy = (password: string): number => {
  if (!password) return 0;
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  // Base entropy = L * log2(poolSize)
  return poolSize === 0 ? 0 : password.length * Math.log2(poolSize);
};

const detectSequences = (password: string): boolean => {
  // Simple check for 3+ consecutive sequential characters (e.g., "abc", "123")
  for (let i = 0; i < password.length - 2; i++) {
    const c1 = password.charCodeAt(i);
    const c2 = password.charCodeAt(i + 1);
    const c3 = password.charCodeAt(i + 2);
    if (c2 === c1 + 1 && c3 === c2 + 1) return true;
  }
  return false;
};

const detectReverseSequences = (password: string): boolean => {
  // simple check for 3+ reverse sequential chars "321", "cba"
  for (let i = 0; i < password.length - 2; i++) {
    const c1 = password.charCodeAt(i);
    const c2 = password.charCodeAt(i + 1);
    const c3 = password.charCodeAt(i + 2);
    if (c2 === c1 - 1 && c3 === c2 - 1) return true;
  }
  return false;
};

export const analyzePassword = (password: string): AnalysisResult => {
  if (!password) {
    return {
      score: 0,
      entropy: 0,
      percentage: 0,
      strengthLabel: 'Weak',
      crackTime: 'Instant',
      feedback: {
        warning: '',
        suggestions: ['Enter a password to begin analysis.'],
        vulnerabilities: [],
      },
    };
  }

  const result = zxcvbn(password);
  let entropy = getEntropy(password);
  const vulnerabilities: { id: string; label: string }[] = [];

  // 1. Zxcvbn warnings (dictionary words)
  if (result.feedback.warning || result.sequence.some(s => s.pattern === 'dictionary')) {
    vulnerabilities.push({ id: 'dict', label: 'Contains common words' });
  }

  // 2. Too short
  if (password.length < 8) {
    vulnerabilities.push({ id: 'short', label: 'Too short (under 8 chars)' });
    entropy = Math.min(entropy, 30); // Cap entropy if it's too short
  }

  // 3. Repeated patterns
  if (/(.)\1{2,}/.test(password)) {
    vulnerabilities.push({ id: 'repeat', label: 'Repeated characters (e.g., aaa)' });
    entropy *= 0.8; // Penalty
  }

  // 4. Sequential patterns
  if (detectSequences(password) || detectReverseSequences(password)) {
    vulnerabilities.push({ id: 'seq', label: 'Sequential characters (e.g., 123, cba)' });
    entropy *= 0.8;
  }

  // 5. Types
  if (/^[0-9]+$/.test(password)) {
    vulnerabilities.push({ id: 'num_only', label: 'Only numbers' });
  } else if (/^[a-zA-Z]+$/.test(password)) {
    vulnerabilities.push({ id: 'alpha_only', label: 'Only letters' });
  }

  // Cap vulnerabilities display max
  const topVulnerabilities = vulnerabilities.slice(0, 5);

  // Calculate generic score modifier
  let finalScore: number = result.score; // 0-4
  if (vulnerabilities.length > 2 && finalScore > 1) {
    finalScore -= 1;
  }
  if (entropy > 60 && finalScore < 3) {
    finalScore += 1;
  }
  // Clamp to 0-4
  finalScore = Math.max(0, Math.min(4, finalScore));

  // Percentage Mapping
  // Score 0: 10%, Score 1: 30%, Score 2: 50%, Score 3: 75%, Score 4: 100%
  let percentage = 0;
  if (finalScore === 0) percentage = 15;
  else if (finalScore === 1) percentage = 35;
  else if (finalScore === 2) percentage = 55;
  else if (finalScore === 3) percentage = 80;
  else if (finalScore === 4) percentage = 100;

  // Strength Label
  let strengthLabel: StrengthLabel = 'Weak';
  if (finalScore === 2) strengthLabel = 'Moderate';
  else if (finalScore === 3) strengthLabel = 'Strong';
  else if (finalScore === 4) strengthLabel = 'Very Strong';

  // Format Crack time cleanly
  const crackTimeRaw = String(result.crack_times_display.offline_slow_hashing_1e4_per_second);
  const crackTime = crackTimeRaw === 'instant' ? 'Instant' : crackTimeRaw;

  // Suggestions overriding
  let suggestions = result.feedback.suggestions;
  if (!suggestions.length) {
    if (finalScore < 2) suggestions.push('Try adding length and avoiding patterns.');
    else if (finalScore === 2) suggestions.push('Improve randomness and avoid predictable words.');
  }

  return {
    score: finalScore,
    entropy: Math.round(entropy),
    percentage,
    strengthLabel,
    crackTime,
    feedback: {
      warning: result.feedback.warning,
      suggestions,
      vulnerabilities: topVulnerabilities,
    },
  };
};

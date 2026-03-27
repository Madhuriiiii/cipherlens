import { useMemo } from 'react';
import { analyzePassword } from '../utils/security';
import type { AnalysisResult } from '../utils/security';

export const usePasswordStrength = (password: string): AnalysisResult => {
  return useMemo(() => {
    return analyzePassword(password);
  }, [password]);
};

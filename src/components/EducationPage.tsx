import React from 'react';
import { Shield, BookOpen, Key, AlertTriangle, Fingerprint, ShieldAlert, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export const EducationPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Password Security Hub
        </h2>
        <p className="text-lg text-slate-600">
          Understand how attackers actually steal passwords so you can defend yourself.
        </p>
      </div>

      <div className="space-y-8">
        {/* Attack 1 */}
        <AttackCard
          title="Brute Force Attacks"
          icon={<Key className="w-6 h-6 text-red-600" />}
          colorClass="border-l-red-500"
          description="A hacker uses automated software to guess every single possible combination of characters until they find a match (e.g., a, b, c... aa, ab)."
          example='Trying "0000", then "0001", then "0002" on a padlock until it opens.'
          defense="Length is the best defense. A 12-character password adds trillions of possibilities compared to an 8-character password, making brute-forcing mathematically impossible."
        />

        {/* Attack 2 */}
        <AttackCard
          title="Dictionary Attacks"
          icon={<BookOpen className="w-6 h-6 text-orange-600" />}
          colorClass="border-l-orange-500"
          description="Instead of guessing randomly, hackers use massive compiled lists of actual words, common phrases, names, and previously leaked passwords."
          example='Testing words like "password123", "admin", "sunflower", or "iloveyou" before trying random characters.'
          defense="Avoid single dictionary words. Combine multiple unrelated words (e.g., 'horse-battery-staple') or use random character generators."
        />

        {/* Attack 3 */}
        <AttackCard
          title="Credential Stuffing"
          icon={<Fingerprint className="w-6 h-6 text-purple-600" />}
          colorClass="border-l-purple-500"
          description="Hackers take a list of usernames/emails and passwords stolen from one website breach, and automate logging into entirely different websites with those same credentials."
          example='Your fitness app gets hacked. The hacker takes that password and tries logging into your bank account with it.'
          defense="NEVER reuse passwords. Use a Password Manager so every single account you own has a completely unique password."
        />

        {/* Attack 4 */}
        <AttackCard
          title="Phishing & Social Engineering"
          icon={<ShieldAlert className="w-6 h-6 text-blue-600" />}
          colorClass="border-l-blue-500"
          description="Manipulating users into voluntarily giving up their passwords by pretending to be a trusted entity."
          example='Receiving a fake email from "PayPal" urging you to click a link and log in to verify a suspicious transaction.'
          defense="Always check the URL in your browser before logging in. Enable 2-Factor Authentication (2FA) so stealing the password isn't enough."
        />
        
        {/* Attack 5 */}
        <AttackCard
          title="Keylogging & Malware"
          icon={<AlertTriangle className="w-6 h-6 text-yellow-600" />}
          colorClass="border-l-yellow-500"
          description="Malicious software secretly installed on your device that records every keystroke you type, capturing passwords as you enter them."
          example='Downloading a compromised file that silently logs you typing your master password.'
          defense="Keep devices updated, use reliable antivirus software, and utilize Password Managers that auto-fill passwords without typing."
        />
      </div>
      
      {/* Ultimate Defenses Section */}
      <div className="text-center mt-16 mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 text-green-600" />
          The Ultimate Defenses
        </h2>
        <p className="text-lg text-slate-600">
          The two most powerful security tools you should adopt today to stop attacks cold.
        </p>
      </div>

      <div className="space-y-8">
        <DefenseCard
          title="Password Managers"
          icon={<Key className="w-6 h-6 text-emerald-600" />}
          colorClass="border-l-emerald-500"
          description="A secure digital vault (like 1Password or Bitwarden) that automatically generates, remembers, and auto-fills unique, complex passwords for every single website you use. You only need to remember one strong 'Master Password'."
          example="Instead of using 'DogLover123!' everywhere, your manager creates 'Xp9$vK2#mQ' for Amazon and '8tL@nB!4cW' for Netflix. Since it auto-fills them, you don't even need to know what they are."
          advantage="If Netflix gets hacked and leaks its passwords, the hacker only gets that one random meaningless password. All your other accounts remain 100% safe because they use different random passwords."
        />

        <DefenseCard
          title="Two-Factor Authentication (2FA)"
          icon={<Smartphone className="w-6 h-6 text-cyan-600" />}
          colorClass="border-l-cyan-500"
          description="A security feature that requires two forms of proof before logging in: something you KNOW (your password) and something you HAVE (your physical phone or a security key)."
          example="You enter your password correctly on your bank's website. Before letting you in, the site asks you to type a 6-digit code sent to an Authenticator App on your phone."
          advantage="Even if a hacker steals your password in a data breach, they cannot log into your account because they don't physically possess your phone to see the 6-digit code."
        />
      </div>

    </div>
  );
};

interface AttackCardProps {
  title: string;
  description: string;
  example: string;
  defense: string;
  icon: React.ReactNode;
  colorClass: string;
}

const AttackCard: React.FC<AttackCardProps> = ({ title, description, example, defense, icon, colorClass }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`basic-panel p-6 border-l-4 ${colorClass}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      
      <div className="space-y-4 text-slate-600">
        <p className="leading-relaxed"><strong className="text-slate-900">What is it?</strong> {description}</p>
        <p className="leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
          <strong className="text-slate-900">Example:</strong> {example}
        </p>
        <p className="leading-relaxed text-green-800 bg-green-50 p-3 rounded-lg border border-green-200">
          <strong className="text-green-900 flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4" /> How to Defend
          </strong>
          {defense}
        </p>
      </div>
    </motion.div>
  );
};

interface DefenseCardProps {
  title: string;
  description: string;
  example: string;
  advantage: string;
  icon: React.ReactNode;
  colorClass: string;
}

const DefenseCard: React.FC<DefenseCardProps> = ({ title, description, example, advantage, icon, colorClass }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`basic-panel p-6 border-l-4 ${colorClass} bg-gradient-to-r from-white to-slate-50/50`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      
      <div className="space-y-4 text-slate-600">
        <p className="leading-relaxed"><strong className="text-slate-900">What is it?</strong> {description}</p>
        <p className="leading-relaxed bg-white p-3 rounded-lg border border-slate-200 text-slate-700 shadow-sm">
          <strong className="text-slate-900">Example:</strong> {example}
        </p>
        <p className="leading-relaxed text-blue-800 bg-blue-50 p-3 rounded-lg border border-blue-200 shadow-sm">
          <strong className="text-blue-900 flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4" /> The Absolute Advantage
          </strong>
          {advantage}
        </p>
      </div>
    </motion.div>
  );
};

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Wand2 } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  onGenerateClick?: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, onGenerateClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-12 pr-28 py-4 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-medium"
        placeholder="Enter your password..."
        autoComplete="new-password"
        spellCheck="false"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
        {onGenerateClick && (
          <button
            type="button"
            onClick={onGenerateClick}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
            title="Generate secure password"
          >
            <Wand2 className="h-5 w-5" />
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

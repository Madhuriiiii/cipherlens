import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2, RotateCw } from 'lucide-react';

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUsePassword: (pwd: string) => void;
}

export const GeneratorModal: React.FC<GeneratorModalProps> = ({ isOpen, onClose, onUsePassword }) => {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let chars = lower;
    if (useUpper) chars += upper;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    let newPassword = '';
    
    if (useUpper) newPassword += upper[Math.floor(Math.random() * upper.length)];
    if (useNumbers) newPassword += numbers[Math.floor(Math.random() * numbers.length)];
    if (useSymbols) newPassword += symbols[Math.floor(Math.random() * symbols.length)];
    
    while (newPassword.length < length) {
      newPassword += chars[Math.floor(Math.random() * chars.length)];
    }

    const pArray = newPassword.split('');
    for (let i = pArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pArray[i], pArray[j]] = [pArray[j], pArray[i]];
    }

    setGeneratedPassword(pArray.join(''));
    setCopied(false);
  }, [length, useUpper, useNumbers, useSymbols]);

  useEffect(() => {
    if (isOpen) {
      generatePassword();
    }
  }, [isOpen, generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUse = () => {
    onUsePassword(generatedPassword);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="bg-white border border-slate-200 p-6 rounded-2xl w-full max-w-md shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            Secure Generator
          </h2>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between gap-4 mb-6 shadow-inner">
            <span className="font-mono text-lg text-blue-600 truncate select-all flex-1">
              {generatedPassword}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button 
                onClick={handleCopy}
                className="p-2 text-slate-500 hover:text-blue-600 bg-white border border-slate-200 shadow-sm rounded-md transition-colors"
                title="Copy"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>
              <button 
                onClick={generatePassword}
                className="p-2 text-slate-500 hover:text-blue-600 bg-white border border-slate-200 shadow-sm rounded-md transition-colors"
                title="Regenerate"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-5 mb-8">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-medium text-slate-700">Length</label>
                <span className="font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">{length}</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Toggle text="Uppercase (A-Z)" checked={useUpper} onChange={setUseUpper} />
              <Toggle text="Numbers (0-9)" checked={useNumbers} onChange={setUseNumbers} />
              <Toggle text="Symbols (!@#)" checked={useSymbols} onChange={setUseSymbols} />
            </div>
          </div>

          <button
            onClick={handleUse}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl tracking-wide transition-colors shadow-sm"
          >
            Use this Password
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Toggle = ({ text, checked, onChange }: { text: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 hover:text-slate-900 transition-colors bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
    />
    {text}
  </label>
);

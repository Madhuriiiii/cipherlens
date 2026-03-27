import React from 'react';
import { Info, Skull } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <div className="w-full flex-col flex gap-6 mt-8 lg:mt-0">
      <div className="basic-panel p-6 border-l-4 border-l-blue-500 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Info className="w-24 h-24 text-blue-600" />
        </div>
        <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-3">
          <Info className="h-6 w-6 text-blue-600" />
          What is Entropy?
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
          Password entropy is a mathematical measurement of how unpredictable a password is, 
          calculating the number of <strong className="text-blue-600 font-semibold">bits</strong> needed to represent the possibilities. 
          Higher entropy means more combinations an attacker has to guess.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-500 list-disc pl-8">
          <li><strong>Length:</strong> The simplest way to boost entropy is to make the password longer.</li>
          <li><strong>Character Sets:</strong> Mixing uppercase, lowercase, numbers, and symbols exponentially increases the pool size.</li>
        </ul>
        <p className="mt-4 text-xs text-slate-400 italic">
          Formula: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-600">Entropy = Length × log₂(Pool Size)</span>
        </p>
      </div>

      <div className="basic-panel p-6 border-l-4 border-l-red-500 relative overflow-hidden group bg-slate-50/50">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Skull className="w-24 h-24 text-red-600" />
        </div>
        <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-3">
          <Skull className="h-6 w-6 text-red-600" />
          Think Like an Attacker
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
          Hackers don't guess passwords one by one manually. They use vast arrays of GPUs running advanced dictionaries, 
          pattern matching, and rainbow tables.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-orange-600 text-sm mb-1">Dictionary Attacks</h4>
            <p className="text-xs text-slate-500">Tools like Hashcat test millions of real words per second. "Password123" is cracked instantly.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-orange-600 text-sm mb-1">Brute Force Modes</h4>
            <p className="text-xs text-slate-500">If your password is short, machines simply try every combination. Under 8 chars takes seconds.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

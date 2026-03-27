import React from 'react';
import { motion } from 'framer-motion';
import type { StrengthLabel } from '../utils/security';

interface StrengthMeterProps {
  percentage: number;
  label: StrengthLabel;
  message?: string;
}

const colorMap: Record<StrengthLabel, string> = {
  'Weak': 'bg-red-500',
  'Moderate': 'bg-orange-500',
  'Strong': 'bg-blue-500',
  'Very Strong': 'bg-green-500',
};

const textMap: Record<StrengthLabel, string> = {
  'Weak': 'text-red-600',
  'Moderate': 'text-orange-600',
  'Strong': 'text-blue-600',
  'Very Strong': 'text-green-600',
};

export const StrengthMeter: React.FC<StrengthMeterProps> = ({ percentage, label, message }) => {
  const barColor = colorMap[label] || 'bg-slate-300';
  const textColor = textMap[label] || 'text-slate-500';

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-widest">Strength</h3>
        <span className={`text-sm font-bold tracking-widest ${textColor}`}>{label}</span>
      </div>
      
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(2, percentage)}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`h-full ${barColor}`}
        />
      </div>

      {message && (
        <motion.p
          className="mt-4 text-sm text-slate-600 leading-relaxed min-h-[40px]"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          key={message}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

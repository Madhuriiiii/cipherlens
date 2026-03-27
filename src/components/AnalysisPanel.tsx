import React from 'react';
import { ShieldAlert, Timer, Binary, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { AnalysisResult } from '../utils/security';
import { motion } from 'framer-motion';

interface AnalysisPanelProps {
  result: AnalysisResult;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ result }) => {
  const { entropy, crackTime, feedback } = result;

  const getCrackTimeColor = (crackTime: string) => {
    if (crackTime.toLowerCase().includes('century') || crackTime.toLowerCase().includes('centuries')) return 'text-green-600';
    if (crackTime.toLowerCase().includes('year')) return 'text-blue-600';
    if (crackTime.toLowerCase().includes('month') || crackTime.toLowerCase().includes('day')) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full flex-col flex gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Entropy Card */}
        <div className="flex-1 basic-panel p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Binary className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 capitalize">Entropy</p>
            <p className="text-xl font-bold text-slate-900">
              {entropy} <span className="text-sm font-normal text-slate-500">bits</span>
            </p>
          </div>
        </div>

        {/* Crack Time Card */}
        <div className="flex-1 basic-panel p-4 flex items-center gap-4">
          <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
            <Timer className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 capitalize">Est. Crack Time</p>
            <p className={`text-xl font-bold ${getCrackTimeColor(crackTime)}`}>
              {crackTime}
            </p>
          </div>
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="basic-panel p-5 min-h-[180px]">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          <ShieldAlert className="h-5 w-5 text-orange-500" />
          Vulnerability Scan
        </h3>
        
        {feedback.vulnerabilities.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center py-6 text-green-600"
          >
            <CheckCircle2 className="h-10 w-10 mb-2 opacity-80" />
            <p className="font-medium">No vulnerabilities detected</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {feedback.vulnerabilities.map((vuln, i) => (
              <motion.div
                key={vuln.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200"
              >
                <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{vuln.label}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

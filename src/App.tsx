import { useState } from 'react';
import { PasswordInput } from './components/PasswordInput';
import { StrengthMeter } from './components/StrengthMeter';
import { AnalysisPanel } from './components/AnalysisPanel';
import { InfoSection } from './components/InfoSection';
import { GeneratorModal } from './components/GeneratorModal';
import { EducationPage } from './components/EducationPage';
import { usePasswordStrength } from './hooks/usePasswordStrength';
import { ShieldCheck, AlertCircle, Lightbulb, Activity, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [password, setPassword] = useState('');
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'analyzer' | 'education'>('analyzer');
  const result = usePasswordStrength(password);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200 pb-16 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              CipherLens
            </h1>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'analyzer' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Analyzer</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'education' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Education Hub</span>
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'analyzer' ? (
        <main className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Analyzer */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <section className="basic-panel p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Test Your Password</h2>
              
              <PasswordInput
                value={password}
                onChange={setPassword}
                onGenerateClick={() => setIsGeneratorOpen(true)}
              />

              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-green-800 font-medium">
                    Local Validation &bull; We <strong className="text-green-700 font-semibold">never</strong> store passwords
                  </p>
                </div>
              </div>

              <StrengthMeter
                percentage={result.percentage}
                label={result.strengthLabel}
              />

              {/* Suggestions / Feedback */}
              {password && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 space-y-3"
                >
                  {result.feedback.warning && (
                    <div className="flex items-start gap-2 text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium">{result.feedback.warning}</p>
                    </div>
                  )}
                  {result.feedback.suggestions.length > 0 && (
                    <div className="flex items-start gap-2 text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <Lightbulb className="w-5 h-5 shrink-0" />
                      <ul className="text-sm space-y-1 list-disc pl-4">
                        {result.feedback.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </section>

            <AnalysisPanel result={result} />
          </div>

          {/* Right Column: Information Sidebar */}
          <aside className="lg:col-span-5">
            <div className="sticky top-20">
              <InfoSection />
            </div>
          </aside>
        </main>
      ) : (
        <main className="px-6">
          <EducationPage />
        </main>
      )}

      {/* Generator Modal */}
      {isGeneratorOpen && (
        <GeneratorModal
          isOpen={isGeneratorOpen}
          onClose={() => setIsGeneratorOpen(false)}
          onUsePassword={(generated) => {
            setPassword(generated);
            setIsGeneratorOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;

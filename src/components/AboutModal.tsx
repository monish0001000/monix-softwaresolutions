import React, { Suspense, lazy } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

const AboutUsDeepDive = lazy(() => import('./AboutUsDeepDive').then(m => ({ default: m.AboutUsDeepDive })));

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#07090E] text-white w-full h-full min-h-screen overflow-y-auto flex flex-col animate-fadeIn">
      {/* Top Floating Modal Bar */}
      <div className="bg-[#07090E]/95 backdrop-blur-xl sticky top-0 z-30 border-b border-cyan-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00F2FE]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
              MONIX // ENTERPRISE ARCHITECTURE DOSSIER
            </h3>
            <p className="text-[10px] text-cyan-400 font-mono tracking-wider">
              GOVT. MSME REGISTERED • TIRUVANNAMALAI HQ
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-mono font-bold"
          aria-label="Close About Dossier"
        >
          <span className="hidden sm:inline">CLOSE DOSSIER</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Embedded High-Authority Deep Dive */}
      <div className="flex-grow">
        <Suspense fallback={<div className="min-h-screen bg-[#07090E] flex items-center justify-center text-cyan-400 font-mono text-xs">LOADING ARCHITECTURAL DOSSIER...</div>}>
          <AboutUsDeepDive
            lang={lang}
            onBackToHome={onClose}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default AboutModal;

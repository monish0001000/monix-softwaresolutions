import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, CheckCircle2, ShieldCheck, Terminal, Clock, Sparkles, 
  ArrowRight, Award, Cpu, BookOpen, Layers, Laptop, QrCode, ExternalLink
} from 'lucide-react';
import { InternshipTrack, MSME_VERIFICATION_DATA } from '../data/cyberShowcaseData';

interface InternshipSyllabusModalProps {
  track: InternshipTrack | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (trackTitle: string, durationDays: number) => void;
}

export const InternshipSyllabusModal: React.FC<InternshipSyllabusModalProps> = ({
  track,
  isOpen,
  onClose,
  onApply,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<5 | 15 | 30>(15);

  if (!isOpen || !track) return null;

  const currentDurationData = 
    selectedDuration === 5 ? track.curriculum.durationDays5 :
    selectedDuration === 15 ? track.curriculum.durationDays15 :
    track.curriculum.durationDays30;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07090E]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#0B0F19] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Top Cyber Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400"></div>

          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-slate-800/80 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                {track.badge}
              </span>

              {track.isSpecialized && (
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border border-indigo-500/40 bg-indigo-950/60 text-indigo-300">
                  FLAGSHIP HIGH-INTENSITY LAB
                </span>
              )}

              {/* Govt MSME Verified Pill */}
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border border-emerald-500/40 bg-emerald-950/60 text-emerald-400 flex items-center gap-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Govt. MSME & ISO Verified
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {track.title}
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              {track.shortDesc}
            </p>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            
            {/* Duration Selector Tabs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Select Program Track Duration:
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  {currentDurationData.hours}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                {( [5, 15, 30] as const ).map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDuration(d)}
                    className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                      selectedDuration === d
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span>{d} Days Track</span>
                    <span className="text-[10px] font-normal opacity-85">
                      {d === 5 ? 'Sprint' : d === 15 ? 'Bootcamp' : 'Immersion'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Track Syllabus Modules */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>{currentDurationData.title}</span>
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                  {currentDurationData.hours}
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                {currentDurationData.modules.map((mod, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{mod}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
                <span className="font-bold text-cyan-300">Expected Learning Outcome: </span>
                {currentDurationData.outcome}
              </div>
            </div>

            {/* Lab Environment & Real-world Capstone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider font-bold">
                  <Laptop className="w-4 h-4" />
                  <span>Hands-on Lab Sandbox</span>
                </div>
                <p className="text-sm font-medium text-slate-200">
                  {track.labEnvironment}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 font-mono block mb-1.5">Tooling Ecosystem:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.tools.map((tool, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-700 text-slate-300 text-[10px] font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>Production Capstone Project</span>
                </div>
                <p className="text-sm font-medium text-slate-200">
                  {track.capstoneProject}
                </p>
                <div className="pt-2 text-xs text-slate-400 space-y-1">
                  <p className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Deployable on GitHub & Live Cloud</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Senior Architect 1-on-1 Code Review</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Verifiable MSME QR Credential Details */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Govt. of India MSME Certificate with QR Verification</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                      ISO 9001:2015
                    </span>
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-1">
                    Registered ID: <span className="font-mono font-bold text-emerald-300">{MSME_VERIFICATION_DATA.regNumber}</span>. Instant employer QR validation worldwide.
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                  100% Academic Credit Ready
                </span>
              </div>
            </div>

          </div>

          {/* Modal Footer with Actions */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 font-mono">
              Selected Track: <span className="text-white font-bold">{selectedDuration} Days</span> • 100% Online & Mentorship Driven
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-bold transition-all w-full sm:w-auto cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  onApply(track.title, selectedDuration);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2 w-full sm:w-auto cursor-pointer"
              >
                <span>FAST APPLY NOW →</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

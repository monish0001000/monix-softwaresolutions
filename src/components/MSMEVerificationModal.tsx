import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, QrCode, CheckCircle2, Award, ExternalLink, FileCheck, Building2 } from 'lucide-react';
import { MSME_VERIFICATION_DATA } from '../data/cyberShowcaseData';

interface MSMEVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: () => void;
}

export const MSMEVerificationModal: React.FC<MSMEVerificationModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-2xl bg-[#0B0F19] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100"
        >
          {/* Emerald Top Accent */}
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"></div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                    GOVERNMENT OF INDIA VERIFIED ENTITY
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    MSME & ISO Verified Credentials
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-400 hover:text-emerald-300 transition-all cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Registration Details Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Organization:</span>
                <span className="text-white font-bold">MONIX Software Solutions</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-400">MSME Udyam Registration:</span>
                <span className="text-emerald-400 font-bold">{MSME_VERIFICATION_DATA.regNumber}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Recognizing Authority:</span>
                <span className="text-slate-200">{MSME_VERIFICATION_DATA.regBody}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-400">Quality Management Standard:</span>
                <span className="text-cyan-400 font-bold">{MSME_VERIFICATION_DATA.isoStandard}</span>
              </div>
            </div>

            {/* Simulated Live Certificate with QR Code */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-900/50 to-slate-950/80 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-5">
              
              {/* QR Code Visual Component */}
              <div className="relative p-3 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-slate-950 text-white rounded-lg p-2 relative overflow-hidden">
                  {/* Stylized QR Matrix Pattern */}
                  <div className="grid grid-cols-5 gap-1 w-full h-full p-1 opacity-90">
                    <div className="bg-emerald-400 rounded-xs col-span-2 row-span-2"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-emerald-400 rounded-xs col-span-2 row-span-2"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-emerald-400 rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-emerald-400 rounded-xs"></div>
                    <div className="bg-emerald-400 rounded-xs col-span-2 row-span-2"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-emerald-400 rounded-xs col-span-2 row-span-2"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-7 h-7 rounded-md bg-[#07090E] border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-sm">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-800 font-bold mt-1 uppercase">
                  Scan to Verify
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <h4 className="font-bold text-white text-sm">
                  Cryptographically Signed QR Code on Every Certificate
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Every internship completion certificate and project delivery is minted with a unique tamper-proof hash. Employers and college accreditation panels can instantly scan this QR code to authenticate the student's name, track, and score.
                </p>
                <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-mono text-emerald-300">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    College Viva Valid
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    LinkedIn Shareable
                  </span>
                </div>
              </div>

            </div>

            {/* Key Assurance Points */}
            <div className="space-y-2 pt-1">
              {MSME_VERIFICATION_DATA.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-slate-400">
                Status: <span className="text-emerald-400 font-bold">Active & Certified (Govt of India)</span>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all w-full sm:w-auto cursor-pointer"
                >
                  Dismiss
                </button>
                {onOpenInquiry && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInquiry();
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all w-full sm:w-auto cursor-pointer"
                  >
                    Apply with Verified Track
                  </button>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

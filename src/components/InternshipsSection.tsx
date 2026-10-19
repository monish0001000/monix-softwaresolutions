import React, { useState } from 'react';
import { GraduationCap, ArrowRight, BookOpen, ShieldCheck, Check } from 'lucide-react';
import { Language } from '../types';
import { InternshipSyllabusModal } from './InternshipSyllabusModal';
import { MSMEVerificationModal } from './MSMEVerificationModal';

export interface InternshipsSectionProps {
  lang?: Language;
  onOpenInquiryWithProgram?: (programName: string) => void;
  onSelectCategoryDetail?: (catTitle: string, serviceType: 'internship') => void;
}

interface TrackItem {
  id: string;
  title: string;
  badge: string;
  badgeVariant: 'cyan' | 'emerald' | 'indigo' | 'amber';
  duration: string;
  stack: [string, string, string];
}

const TRACKS: TrackItem[] = [
  {
    id: 'genai',
    title: 'Generative AI & LLMs',
    badge: 'FLAGSHIP LAB',
    badgeVariant: 'cyan',
    duration: '5 - 30 Days',
    stack: ['LangChain', 'FastAPI', 'PyTorch'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & SOC',
    badge: 'ZERO-TRUST',
    badgeVariant: 'indigo',
    duration: '5 - 30 Days',
    stack: ['Wireshark', 'Burp Suite', 'Linux'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web Engineering',
    badge: 'CORE ENGINEERING',
    badgeVariant: 'emerald',
    duration: '5 - 30 Days',
    stack: ['Next.js 15', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'mobile',
    title: 'Native Mobile Engineering',
    badge: 'MOBILE LAB',
    badgeVariant: 'amber',
    duration: '5 - 30 Days',
    stack: ['Flutter', 'React Native', 'Kotlin'],
  },
  {
    id: 'datascience',
    title: 'Data Science & MLOps',
    badge: 'ANALYTICS',
    badgeVariant: 'cyan',
    duration: '5 - 30 Days',
    stack: ['Pandas', 'Scikit-Learn', 'MLflow'],
  },
  {
    id: 'cloud',
    title: 'Cloud DevOps & SRE',
    badge: 'INFRASTRUCTURE',
    badgeVariant: 'indigo',
    duration: '5 - 30 Days',
    stack: ['Kubernetes', 'Terraform', 'AWS / GCP'],
  },
];

export const InternshipsSection: React.FC<InternshipsSectionProps> = ({
  onOpenInquiryWithProgram,
}) => {
  const [selectedTrackForSyllabus, setSelectedTrackForSyllabus] = useState<TrackItem | null>(null);
  const [isMSMEModalOpen, setIsMSMEModalOpen] = useState(false);

  const getBadgeStyle = (variant: TrackItem['badgeVariant']) => {
    switch (variant) {
      case 'emerald':
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30';
      case 'amber':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'indigo':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      case 'cyan':
      default:
        return 'text-[#00F2FE] bg-[#00F2FE]/10 border-[#00F2FE]/30';
    }
  };

  return (
    <section id="internships" className="relative py-16 sm:py-24 bg-[#07090E] text-white">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Minimalist & Focused */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00F2FE] tracking-widest uppercase mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span>INDUSTRY CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Next-Gen Internships.
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <p className="text-slate-400 text-sm sm:text-base font-normal leading-relaxed">
              Govt. of India MSME verified tracks with live production deployments.
            </p>
            <button
              onClick={() => setIsMSMEModalOpen(true)}
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#10B981] hover:underline cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify MSME Certificate</span>
            </button>
          </div>
        </div>

        {/* Clean Dual-CTA Track Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {TRACKS.map((track) => (
            <div
              key={track.id}
              className="group relative rounded-2xl p-6 bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col justify-between shadow-sm hover:-translate-y-1"
            >
              <div>
                {/* Header: Badge & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${getBadgeStyle(
                      track.badgeVariant
                    )}`}
                  >
                    {track.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {track.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#00F2FE] transition-colors">
                  {track.title}
                </h3>

                {/* 3 Core Stack Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4">
                  {track.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clean Dual-CTA Row */}
              <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    if (onOpenInquiryWithProgram) {
                      onOpenInquiryWithProgram(`${track.title} Track`);
                    }
                  }}
                  className="w-full inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#6366F1] text-slate-950 font-bold text-xs tracking-wide hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedTrackForSyllabus(track)}
                  className="w-full inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-xs tracking-wide active:scale-95 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Syllabus</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightweight Syllabus Quick Modal */}
      {selectedTrackForSyllabus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg p-6 rounded-2xl bg-[#0B0F19] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-lg font-bold text-white">
                {selectedTrackForSyllabus.title} — Syllabus
              </h4>
              <button
                onClick={() => setSelectedTrackForSyllabus(null)}
                className="text-slate-400 hover:text-white text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2 text-sm text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="font-semibold text-[#00F2FE] text-xs font-mono uppercase">
                  Phase 1: Architecture & Foundations
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Core fundamentals, tooling setup, repository initialization, and environment configuration.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="font-semibold text-indigo-400 text-xs font-mono uppercase">
                  Phase 2: Core Engineering & APIs
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Real-world implementation of workflows using {selectedTrackForSyllabus.stack.join(', ')}.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="font-semibold text-[#10B981] text-xs font-mono uppercase">
                  Phase 3: Production Deployment & Viva
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Live cloud deployment, ISO verification, and MSME Govt. certificate issuance.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const title = selectedTrackForSyllabus.title;
                setSelectedTrackForSyllabus(null);
                if (onOpenInquiryWithProgram) {
                  onOpenInquiryWithProgram(`${title} Track`);
                }
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#6366F1] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
            >
              Enroll in {selectedTrackForSyllabus.title} →
            </button>
          </div>
        </div>
      )}

      {/* MSME Verification Modal */}
      <MSMEVerificationModal
        isOpen={isMSMEModalOpen}
        onClose={() => setIsMSMEModalOpen(false)}
      />
    </section>
  );
};

export default InternshipsSection;

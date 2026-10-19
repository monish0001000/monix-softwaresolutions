import React from 'react';
import { Code2, CheckCircle2, Sparkles, ArrowRight, FileText, Monitor, HelpCircle, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { PROJECT_CATEGORIES } from '../../data/content';
import { CyberDomainsSection } from '../CyberDomainsSection';

interface ProjectsPageProps {
  lang: Language;
  onOpenInquiryWithProject: (projectCategory: string) => void;
  onSelectCategoryDetail: (catTitle: string, serviceType: 'projects') => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  lang,
  onOpenInquiryWithProject,
  onSelectCategoryDetail,
}) => {
  const t = translations[lang];

  const deliverables = [
    { title: "100% Tested Source Code", desc: "Clean, documented, error-free code written in modern frameworks." },
    { title: "Project Report Document", desc: "Complete 50+ page university format report (Word & PDF)." },
    { title: "Presentation PPT Slides", desc: "Professional slide deck for final oral viva presentation." },
    { title: "Synopsis & IEEE Abstract", desc: "Initial project proposal and architectural diagram documentation." },
    { title: "Free Remote Installation", desc: "Live setup on your laptop via AnyDesk / TeamViewer." },
    { title: "Viva Voce Prep Sheet", desc: "Expected viva questions and answers to score top grades." }
  ];

  return (
    <div className="bg-[#07090E] text-slate-100 min-h-screen">
      
      {/* Cyber Hero Banner */}
      <div className="relative py-16 sm:py-20 overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 cyber-grid-pattern opacity-40 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-600/10 via-indigo-600/15 to-transparent blur-[140px] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic & Research Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Academic & IEEE <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-white bg-clip-text text-transparent">Project Domains</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            Comprehensive full-stack project domains engineered for college final years, startups, and enterprise operations.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-block px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 text-cyan-300 rounded-xl text-xs font-mono font-bold backdrop-blur-md shadow-md">
              Student Friendly Custom Pricing
            </span>
            <span className="inline-block px-5 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl text-xs font-mono font-bold">
              IEEE 2025/2026 Papers Included
            </span>
          </div>
        </div>
      </div>

      {/* Deliverables Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 rounded-3xl cyber-glass border border-cyan-500/20 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center font-mono flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Complete Turnkey Package Included with Every Project</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Section 1: Academic & Enterprise Project Domains Showcase */}
      <CyberDomainsSection
        lang={lang}
        onOpenInquiryWithDomain={onOpenInquiryWithProject}
        onSelectCategoryDetail={onSelectCategoryDetail}
      />

      {/* Traditional Academic Categories Quick Access */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
            University Degree Streams Supported
          </h2>
          <p className="text-xs text-slate-400">Tailored to Anna University, VTU, JNTU, KTU, Mumbai University and AICTE guidelines.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECT_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl cyber-glass border border-slate-800 hover:border-cyan-400/50 flex flex-col justify-between group transition-all"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded-full uppercase border border-cyan-500/20">
                  Stream #{idx + 1}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-3 mb-2">
                  {cat}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Full source code, dataset, database, ML models, report documentation, and remote execution support.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onSelectCategoryDetail(cat, 'projects')}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Details
                </button>
                <button
                  onClick={() => onOpenInquiryWithProject(cat)}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-600 text-slate-950 font-mono text-xs font-bold shadow-sm cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

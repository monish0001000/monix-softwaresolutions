import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, GraduationCap, Code2, Sparkles, Layers } from 'lucide-react';
import { Language } from '../types';
import { CyberDomainsSection } from './CyberDomainsSection';
import { CyberInternshipsSection } from './CyberInternshipsSection';

interface CyberShowcaseSectionProps {
  lang?: Language;
  onOpenInquiry: (service: string, category?: string) => void;
  onSelectCategoryDetail?: (catTitle: string, serviceType: 'internship' | 'projects') => void;
}

export const CyberShowcaseSection: React.FC<CyberShowcaseSectionProps> = ({
  lang = 'en',
  onOpenInquiry,
  onSelectCategoryDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'domains' | 'internships'>('both');

  return (
    <div id="cyber-showcase" className="bg-[#07090E] relative border-y border-cyan-500/15">
      
      {/* Flagship Switcher Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl">
          
          <div className="flex items-center gap-2.5 px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              MONIX CYBER-ENTERPRISE SHOWCASE
            </span>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'both'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Showcase
            </button>
            <button
              onClick={() => setActiveTab('domains')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'domains'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Project Domains</span>
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'internships'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>AI Internships</span>
            </button>
          </div>

        </div>
      </div>

      {/* Render Sections based on active tab */}
      {(activeTab === 'both' || activeTab === 'domains') && (
        <CyberDomainsSection
          lang={lang}
          onOpenInquiryWithDomain={(domain) => onOpenInquiry('Academic Projects', domain)}
          onSelectCategoryDetail={(cat) => onSelectCategoryDetail && onSelectCategoryDetail(cat, 'projects')}
        />
      )}

      {(activeTab === 'both' || activeTab === 'internships') && (
        <CyberInternshipsSection
          lang={lang}
          onOpenInquiryWithProgram={(prog) => onOpenInquiry('AI Internship', prog)}
          onSelectCategoryDetail={(cat) => onSelectCategoryDetail && onSelectCategoryDetail(cat, 'internship')}
        />
      )}

    </div>
  );
};

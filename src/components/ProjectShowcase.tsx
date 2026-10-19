import React, { useState } from 'react';
import { Shield, Terminal, Globe, Cpu, ArrowUpRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface ProjectShowcaseProps {
  lang?: Language;
  onOpenInquiry?: (service: string, category: string) => void;
  onSelectCategoryDetail?: (cat: string, serviceType: 'web' | 'mobile' | 'internship' | 'projects') => void;
}

interface ProjectCard {
  id: string;
  title: string;
  tag: string;
  category: string;
  desc: string;
  chips: string[];
  metric: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  serviceType: 'web' | 'mobile' | 'internship' | 'projects';
  inquiryService: string;
}

const FEATURED_PROJECTS: ProjectCard[] = [
  {
    id: 'sentinel-soc',
    title: 'Sentinel_SOC',
    tag: 'AUTONOMOUS DEFENSE',
    category: 'Cybersecurity Platform',
    desc: 'AI-powered real-time threat detection, telemetry analysis, and automated incident containment platform.',
    chips: ['Autonomous SOC', 'Threat Telemetry', 'AI Incident Triage'],
    metric: 'Zero-Day Response',
    accent: '#00F2FE',
    icon: Shield,
    serviceType: 'projects',
    inquiryService: 'Academic Projects',
  },
  {
    id: 'web-os',
    title: 'MONIX Web-OS',
    tag: 'BROWSER CLOUD OS',
    category: 'Cloud Web System',
    desc: 'Browser-based cloud OS featuring a custom Virtual File System (VFS), P2P ecosystem, and AURA Voice AI.',
    chips: ['Virtual File System', 'P2P Network', 'AURA Voice AI'],
    metric: 'Sub-millisecond Kernel',
    accent: '#6366F1',
    icon: Terminal,
    serviceType: 'web',
    inquiryService: 'Website Development',
  },
  {
    id: 'social-sim',
    title: 'Social Engineering Simulator',
    tag: 'ATTACK ANATOMY',
    category: 'Security Awareness Suite',
    desc: 'Interactive platform exposing sophisticated threat anatomy and silent data exfiltration in a Cyber-Dark UI.',
    chips: ['Attack Anatomy', 'OWASP Top 10', 'Cyber-Dark UI'],
    metric: 'Live Threat Forensics',
    accent: '#10B981',
    icon: Globe,
    serviceType: 'projects',
    inquiryService: 'Academic Projects',
  },
  {
    id: 'aura-ai',
    title: 'Aura AI',
    tag: 'NEURAL ASSISTANT',
    category: 'Enterprise AI Suite',
    desc: 'Multi-modal conversational intelligence engine with contextual vector memory and sub-20ms inference.',
    chips: ['Gemini Engine', 'Vector RAG', 'Interactive UX'],
    metric: '< 20ms Inference',
    accent: '#00F2FE',
    icon: Cpu,
    serviceType: 'internship',
    inquiryService: 'AI Internship',
  },
];

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  lang = 'en',
  onOpenInquiry,
  onSelectCategoryDetail,
}) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleAction = (project: ProjectCard) => {
    if (onSelectCategoryDetail) {
      onSelectCategoryDetail(project.title, project.serviceType);
    } else if (onOpenInquiry) {
      onOpenInquiry(project.inquiryService, project.title);
    }
  };

  return (
    <section id="portfolio" className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#07090E] text-[#F8FAFC] py-8 sm:py-12 lg:py-16 snap-section">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293714_1px,transparent_1px),linear-gradient(to_bottom,#1f293714_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-gradient-to-r from-[#00F2FE]/5 via-[#6366F1]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-2 sm:py-4 lg:py-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/25 text-[#00F2FE] text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(0,242,254,0.12)]">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>FEATURED ENGINEERING BUILDS</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Production Software Showcase
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto line-clamp-1">
            High-impact engineering deployments spanning autonomous cybersecurity, browser operating systems, and intelligent multi-agent AI.
          </p>

          <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent mx-auto rounded-full mt-1" />
        </div>

        {/* 4 Streamlined Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-4.5">
          {FEATURED_PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="group relative rounded-xl sm:rounded-2xl p-3.5 sm:p-4 lg:p-5 bg-[#111827]/70 backdrop-blur-md border border-white/[0.08] hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_0_35px_-5px_rgba(0,242,254,0.18)] hover:-translate-y-1"
              >
                {/* Subtle Ambient Flare */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: project.accent }}
                />

                <div>
                  {/* Card Header: Tag & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider uppercase bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] mr-1.5 animate-pulse" />
                        {project.tag}
                      </span>
                      <span className="hidden sm:inline-flex text-[10px] sm:text-[11px] font-mono text-slate-400">
                        {project.category}
                      </span>
                    </div>

                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-[#00F2FE] group-hover:border-[#00F2FE]/50 group-hover:bg-[#00F2FE]/10 group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </div>

                  {/* Title & Metric */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#F8FAFC] tracking-tight group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] font-mono font-medium text-[#00F2FE] bg-[#00F2FE]/5 px-2 py-0.5 rounded-md border border-[#00F2FE]/20 w-fit">
                      {project.metric}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-snug font-light mb-2.5 sm:mb-3 line-clamp-2">
                    {project.desc}
                  </p>
                </div>

                {/* Footer: Tech Chips & Direct Action Button */}
                <div className="pt-2 sm:pt-2.5 border-t border-white/[0.06] mt-2 sm:mt-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-1">
                    {project.chips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-medium bg-white/[0.03] border border-white/[0.08] text-slate-300 group-hover:border-[#00F2FE]/30 group-hover:text-cyan-200 transition-colors"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Button */}
                  <button
                    onClick={() => handleAction(project)}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-lg text-xs font-bold bg-[#00F2FE]/15 hover:bg-[#00F2FE] text-[#00F2FE] hover:text-[#07090E] border border-[#00F2FE]/40 hover:border-[#00F2FE] transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.12)] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] shrink-0"
                  >
                    <span>Inspect Specs</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );

};

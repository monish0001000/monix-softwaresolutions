import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import {
  Globe,
  Palette,
  Cpu,
  FileText,
  Server,
  Smartphone,
  ArrowUpRight,
  Layers,
  Code2,
  ShieldCheck,
  Rocket,
  ArrowRight
} from 'lucide-react';
import { Language, PageView } from '../types';

export interface ServicesSectionProps {
  lang?: Language;
  onNavigate?: (view: PageView) => void;
  onOpenInquiryWithService?: (service: string, category?: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  impactSentence: string; // Strictly 6-word impact sentence
  chips: [string, string, string]; // Strictly 3 clean tech chips
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  view: PageView;
}

interface WorkflowPhase {
  phase: string;
  title: string;
  deliverable: string;
  icon: React.ComponentType<{ className?: string }>;
}

// 6 Core Services: 1 Headline, 1 Short 6-Word Impact Sentence, 3 Clean Tech Chips
const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    tag: 'FLAGSHIP',
    impactSentence: 'High-converting full-stack web platforms shipped fast.',
    chips: ['Next.js 15', 'React 19', 'Tailwind'],
    icon: Globe,
    accent: '#00F2FE',
    view: 'web-development',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    tag: 'DESIGN',
    impactSentence: 'Intuitive design systems with premium aesthetics.',
    chips: ['Figma', 'Design Systems', 'Motion'],
    icon: Palette,
    accent: '#6366F1',
    view: 'web-development',
  },
  {
    id: 'ai-tech',
    title: 'AI & Autonomous Systems',
    tag: 'NEXT-GEN',
    impactSentence: 'Production-grade AI workflows that automate operations.',
    chips: ['LLMs', 'FastAPI', 'Vector RAG'],
    icon: Cpu,
    accent: '#00F2FE',
    view: 'ai-internships',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Applications',
    tag: 'MOBILE',
    impactSentence: 'High-performance native apps for iOS and Android.',
    chips: ['Flutter', 'React Native', 'Kotlin'],
    icon: Smartphone,
    accent: '#10B981',
    view: 'mobile-applications',
  },
  {
    id: 'custom-software',
    title: 'Custom Cloud Software',
    tag: 'ENTERPRISE',
    impactSentence: 'Scalable cloud microservices with sub-second latency.',
    chips: ['Docker', 'PostgreSQL', 'Microservices'],
    icon: Server,
    accent: '#6366F1',
    view: 'web-development',
  },
  {
    id: 'project-doc',
    title: 'Technical Architecture',
    tag: 'STANDARDS',
    impactSentence: 'IEEE-compliant architecture blueprints and system schemas.',
    chips: ['SRS Specs', 'UML / ERD', 'OpenAPI'],
    icon: FileText,
    accent: '#00F2FE',
    view: 'academic-projects',
  },
];

// 4 Phases: Ultra-Short Titles and Single-Line Deliverables
const WORKFLOW_PHASES: WorkflowPhase[] = [
  {
    phase: '01',
    title: 'Blueprints',
    deliverable: 'SRS Architecture & Schema Specifications',
    icon: Layers,
  },
  {
    phase: '02',
    title: 'Core Build',
    deliverable: 'Modular Clean Code & Tested APIs',
    icon: Code2,
  },
  {
    phase: '03',
    title: 'Security',
    deliverable: 'Zero-Defect Audit & Hardened SSL',
    icon: ShieldCheck,
  },
  {
    phase: '04',
    title: 'Launch',
    deliverable: 'Global Edge CDN & Instant Deployment',
    icon: Rocket,
  },
];

// Apple/Linear Minimalist Service Card
const ServiceCard: React.FC<{
  service: ServiceItem;
  onNavigate?: (view: PageView) => void;
  onOpenInquiry?: (service: string) => void;
}> = ({ service, onNavigate, onOpenInquiry }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = service.icon;

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={() => {
        if (onOpenInquiry) {
          onOpenInquiry(service.title);
        } else if (onNavigate) {
          onNavigate(service.view);
        }
      }}
      className="group relative rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-4.5 bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1 cursor-pointer"
    >
      {/* Subtle Cursor Spotlight Tracking Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              240px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 242, 254, 0.15),
              transparent 70%
            )
          `,
        }}
      />

      <div>
        {/* Top Header: Icon & Micro Tag */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00F2FE] group-hover:scale-105 group-hover:border-[#00F2FE]/40 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5 group-hover:text-[#00F2FE] group-hover:border-[#00F2FE]/30 transition-colors">
            {service.tag}
          </span>
        </div>

        {/* 1. Headline */}
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-tight group-hover:text-[#00F2FE] transition-colors">
          {service.title}
        </h3>

        {/* 2. Short 6-Word Impact Sentence */}
        <p className="text-xs text-slate-400 font-normal leading-relaxed mt-1 sm:mt-1.5 line-clamp-2">
          {service.impactSentence}
        </p>
      </div>

      {/* 3. Three Clean Tech Chips & Subtle Action Arrow */}
      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          {service.chips.map((chip) => (
            <span
              key={chip}
              className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 group-hover:border-white/10"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#00F2FE] group-hover:text-slate-950 transition-all shrink-0">
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>
      </div>
    </div>
  );
};

// Apple/Linear Minimalist 4-Phase Engineering Pipeline
export const EngineeringPipeline: React.FC = () => {
  return (
    <section id="pipeline" className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#07090E] text-white py-8 sm:py-12 lg:py-16 snap-section">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
          <div>
            <div className="text-[10px] sm:text-xs font-mono text-[#00F2FE] tracking-widest uppercase mb-1">
              PROCESS BLUEPRINT
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Engineering Pipeline
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
            Four disciplined phases from specification to global production.
          </p>
        </div>

        {/* 4 Pipeline Phases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {WORKFLOW_PHASES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.phase}
                className="group relative rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 bg-[#0B0F19]/70 border border-white/10 hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col justify-between shadow-sm hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="font-mono text-xs font-bold text-[#00F2FE]">
                      {item.phase}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
                    DELIVERABLE
                  </span>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {item.deliverable}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigate,
  onOpenInquiryWithService,
}) => {
  return (
    <section id="services" className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#07090E] text-white py-8 sm:py-12 lg:py-16 snap-section">
      {/* Ambient Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,242,254,0.04)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-2 sm:py-4 lg:py-6">
        
        {/* Section Header: Minimalist & Focused */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-7">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-[#00F2FE] tracking-widest uppercase mb-1.5 sm:mb-2">
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              High-Performance Services.
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
            Clean architectures engineered for performance, security, and exponential scale.
          </p>
        </div>

        {/* Clean 6-Card Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onNavigate={onNavigate}
              onOpenInquiry={(title) =>
                onOpenInquiryWithService && onOpenInquiryWithService(title)
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
};


// Aliases for backwards compatibility
export { EngineeringPipeline as EngineeringWorkflowTimeline };
export default ServicesSection;

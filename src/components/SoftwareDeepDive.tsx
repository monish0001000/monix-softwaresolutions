import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import {
  Cpu,
  Cloud,
  Globe,
  Server,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Terminal,
  Sparkles,
  Layers,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Language } from '../types';

export interface SoftwareDeepDiveProps {
  lang?: Language;
  onOpenInquiry?: (solutionTitle: string) => void;
  onBackToHome?: () => void;
}

interface SoftwareSolution {
  id: string;
  headline: string;
  impactDesc: string; // Strictly 6-word punchy impact description
  techChips: [string, string, string]; // Strictly 3 modern tech chips
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  colSpan: string;
  category: 'flagship' | 'cloud' | 'web' | 'mobile' | 'security';
  metric: string;
  badge?: string;
}

const SOLUTIONS: SoftwareSolution[] = [
  {
    id: 'ai-autonomous',
    headline: 'AI Autonomous Workflows',
    impactDesc: 'Autonomous agents automating complex business operations.',
    techChips: ['Next.js 15', 'FastAPI', 'PostgreSQL'],
    tag: 'FLAGSHIP AI',
    icon: Cpu,
    accentColor: '#00F2FE',
    colSpan: 'lg:col-span-2 md:col-span-2',
    category: 'flagship',
    metric: '< 15ms Latency',
    badge: 'FLAGSHIP OFFERING'
  },
  {
    id: 'cloud-saas',
    headline: 'Cloud SaaS Platforms',
    impactDesc: 'Multi-tenant architectures scaling to millions globally.',
    techChips: ['Docker', 'Kubernetes', 'Redis'],
    tag: 'ENTERPRISE SAAS',
    icon: Cloud,
    accentColor: '#6366F1',
    colSpan: 'lg:col-span-1 md:col-span-1',
    category: 'cloud',
    metric: '99.99% Uptime'
  },
  {
    id: 'web-architecture',
    headline: 'High-Performance Web Architecture',
    impactDesc: 'Sub-second edge portals built for conversions.',
    techChips: ['React 19', 'Tailwind', 'Edge CDN'],
    tag: 'CORE WEB',
    icon: Globe,
    accentColor: '#00F2FE',
    colSpan: 'lg:col-span-1 md:col-span-1',
    category: 'web',
    metric: '100/100 Lighthouse'
  },
  {
    id: 'microservices',
    headline: 'Enterprise Microservices Engine',
    impactDesc: 'Distributed event-driven backends with zero downtime.',
    techChips: ['Kafka', 'Go / Python', 'GraphQL'],
    tag: 'HIGH CONCURRENCY',
    icon: Server,
    accentColor: '#6366F1',
    colSpan: 'lg:col-span-2 md:col-span-2',
    category: 'flagship',
    metric: '10k+ Req/Sec'
  },
  {
    id: 'native-mobile',
    headline: 'Native Mobile Engines',
    impactDesc: 'Hardware-accelerated mobile apps with native fluidity.',
    techChips: ['Flutter', 'React Native', 'Kotlin'],
    tag: 'MOBILE APPS',
    icon: Smartphone,
    accentColor: '#10B981',
    colSpan: 'lg:col-span-1 md:col-span-1',
    category: 'mobile',
    metric: '120 FPS Motion'
  },
  {
    id: 'zero-trust',
    headline: 'Zero-Trust Security Gateways',
    impactDesc: 'Military-grade perimeter encryption and automated compliance.',
    techChips: ['OAuth2 / OIDC', 'AES-256', 'TLS 1.3'],
    tag: 'CYBERSECURITY',
    icon: ShieldCheck,
    accentColor: '#00F2FE',
    colSpan: 'lg:col-span-1 md:col-span-1',
    category: 'security',
    metric: 'SOC-2 Ready'
  },
  {
    id: 'realtime-data',
    headline: 'Real-Time Streaming Pipelines',
    impactDesc: 'Live bi-directional telemetry synchronizing distributed nodes.',
    techChips: ['WebSockets', 'gRPC', 'TimescaleDB'],
    tag: 'STREAMING',
    icon: Zap,
    accentColor: '#818CF8',
    colSpan: 'lg:col-span-1 md:col-span-1',
    category: 'cloud',
    metric: 'Sub-5ms Sync'
  }
];

// Interactive Bento Card with Localized Radial Spotlight Border Glow
const BentoCard: React.FC<{
  item: SoftwareSolution;
  onOpenInquiry?: (solutionTitle: string) => void;
}> = ({ item, onOpenInquiry }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const IconComponent = item.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onClick={() => onOpenInquiry && onOpenInquiry(item.headline)}
      className={`group relative rounded-3xl p-6 sm:p-8 bg-[#111827]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 flex flex-col justify-between overflow-hidden shadow-[0_10px_35px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_-5px_rgba(0,242,254,0.15)] cursor-pointer transition-all ${item.colSpan}`}
    >
      {/* Localized Radial Spotlight Border Glow Tracking Cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 242, 254, 0.25),
              rgba(99, 102, 241, 0.12),
              transparent 70%
            )
          `,
        }}
      />

      {/* Subtle Inner Glass Refraction Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 242, 254, 0.05),
              transparent 70%
            )
          `,
        }}
      />

      {/* Card Header: Icon, Micro Badge & Metric */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F2FE] group-hover:border-[#00F2FE]/40 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all duration-300">
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="flex items-center space-x-2">
          {item.badge && (
            <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30 shadow-[0_0_12px_rgba(0,242,254,0.2)]">
              {item.badge}
            </span>
          )}
          <span className="font-mono text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/5 group-hover:text-white">
            {item.metric}
          </span>
        </div>
      </div>

      {/* Punchy Headline & 6-Word Impact Description */}
      <div className="relative z-10 my-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#00F2FE] transition-colors">
          {item.headline}
        </h3>
        <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mt-2.5">
          {item.impactDesc}
        </p>
      </div>

      {/* 3 Modern Tech Chips & Action Indicator */}
      <div className="relative z-10 mt-7 pt-5 border-t border-white/5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {item.techChips.map((chip) => (
            <span
              key={chip}
              className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 group-hover:border-white/10 transition-colors"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-slate-950 group-hover:bg-[#00F2FE] transition-all duration-200 shrink-0">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

export const SoftwareDeepDive: React.FC<SoftwareDeepDiveProps> = ({
  onOpenInquiry,
  onBackToHome,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'flagship' | 'cloud' | 'web'>('all');

  const filteredSolutions = SOLUTIONS.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'flagship') return s.category === 'flagship';
    if (activeFilter === 'cloud') return s.category === 'cloud' || s.category === 'security';
    if (activeFilter === 'web') return s.category === 'web' || s.category === 'mobile';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07090E] text-white pt-28 sm:pt-36 pb-24 overflow-hidden relative">
      {/* Background Matrix Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,242,254,0.06)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      {/* Ambient Cyber Neon Orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#00F2FE]/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-[#6366F1]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Strip: Apple/Linear Minimalist Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00F2FE] tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span>ENTERPRISE SOLUTIONS CATALOGUE</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Software Architecture.{' '}
              <span className="bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#6366F1] bg-clip-text text-transparent">
                Engineered for Scale.
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg font-normal leading-relaxed mt-4">
              Mission-critical web, AI autonomous workflows, and cloud SaaS platforms deployed with zero text bloat.
            </p>
          </div>

          {/* Filter Navigation Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0B0F19]/90 border border-white/10 backdrop-blur-md self-start md:self-end">
            {(
              [
                { id: 'all', label: 'All Solutions' },
                { id: 'flagship', label: 'Flagship' },
                { id: 'cloud', label: 'Cloud & SaaS' },
                { id: 'web', label: 'Web & Mobile' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-[#00F2FE] to-[#6366F1] text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSolutions.map((solution) => (
            <BentoCard
              key={solution.id}
              item={solution}
              onOpenInquiry={onOpenInquiry}
            />
          ))}
        </div>

        {/* Bottom Fast Action Terminal Strip */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0B0F19]/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F2FE] shrink-0">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-base sm:text-lg">
                Need a Custom Cloud Architecture or Dedicated SLA?
              </div>
              <div className="text-slate-400 text-xs sm:text-sm font-mono mt-0.5">
                Rapid turnaround • Direct technical WhatsApp & email support • &lt; 2 Hrs SLA
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenInquiry && onOpenInquiry('Custom Software Architecture')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#6366F1] text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase font-sans hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-500/20 shrink-0 cursor-pointer"
          >
            Request Technical Quote →
          </button>
        </div>

      </div>
    </div>
  );
};

export default SoftwareDeepDive;

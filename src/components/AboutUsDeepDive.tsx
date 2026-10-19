import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Terminal,
  Server,
  ArrowUpRight,
  ArrowLeft,
  Sparkles,
  Award,
  Lock,
  Activity,
  CheckCircle2,
  ExternalLink,
  Flame,
  Globe,
  Gauge,
  Clock,
  Compass,
  FileCheck2,
  Users,
  Check,
  Send
} from 'lucide-react';
import { Language } from '../types';

export interface AboutUsDeepDiveProps {
  lang?: Language;
  onOpenInquiry?: (inquiryType?: string) => void;
  onBackToHome?: () => void;
}

// ---------------------------------------------------------
// CREDIBILITY BENCHMARK DATA
// ---------------------------------------------------------
interface BenchmarkStat {
  id: string;
  value: string;
  unit?: string;
  label: string;
  sub: string;
  status: string;
  statusColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CREDIBILITY_BENCHMARKS: BenchmarkStat[] = [
  {
    id: 'lighthouse',
    value: '100',
    unit: '/ 100',
    label: 'Google Lighthouse Score',
    sub: 'Verified 4x 100 across Perf, A11y, SEO & Standards',
    status: 'AUDITED',
    statusColor: '#00F2FE',
    icon: Gauge,
  },
  {
    id: 'uptime',
    value: '99.9',
    unit: '%',
    label: 'Cloud Uptime Commitment',
    sub: 'High-availability multi-region edge deployment',
    status: 'LIVE STATUS',
    statusColor: '#10B981',
    icon: Activity,
  },
  {
    id: 'latency',
    value: '< 15',
    unit: 'ms',
    label: 'Edge Cold-Start Latency',
    sub: 'Sub-second global TTFB on distributed microVMs',
    status: 'OPTIMIZED',
    statusColor: '#00F2FE',
    icon: Zap,
  },
  {
    id: 'iops',
    value: '120K+',
    unit: 'IOPS',
    label: 'Hardware I/O Throughput',
    sub: 'Bare-metal NVMe SSD with in-memory caching tier',
    status: 'HARDWARE',
    statusColor: '#818CF8',
    icon: Server,
  },
  {
    id: 'sla',
    value: '< 2',
    unit: 'Hours',
    label: 'Direct Architect Triage',
    sub: 'Direct access to Lead Architect Monish S. with 24/7 SLA',
    status: 'GUARANTEED',
    statusColor: '#F59E0B',
    icon: Clock,
  },
  {
    id: 'accreditation',
    value: 'MSME',
    unit: 'Govt.',
    label: 'Officially Registered Enterprise',
    sub: 'Ministry of MSME, Govt. of India Accredited',
    status: 'VERIFIED',
    statusColor: '#10B981',
    icon: ShieldCheck,
  },
];

// ---------------------------------------------------------
// THE 4 UNCOMPROMISED ENGINEERING PILLARS
// ---------------------------------------------------------
interface EngineeringPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  highlightMetric: string;
  features: string[];
}

const ENGINEERING_PILLARS: EngineeringPillar[] = [
  {
    id: 'sub-second-velocity',
    number: '01',
    title: 'Sub-Second Velocity',
    tagline: 'High-throughput edge compilation & 10x agentic prototyping.',
    description:
      'We dismantle conventional agency latency. By marrying autonomous AI workflows with compile-optimized React 19, Next.js, and lightweight Go runtimes, our solutions achieve sub-100ms time-to-first-byte (TTFB) and ship 10x faster than traditional software consultancies.',
    icon: Zap,
    accentColor: '#00F2FE',
    highlightMetric: '< 85ms Global TTFB',
    features: [
      'Edge CDN zero-cold-start compilation',
      'Autonomous agentic prototyping pipeline',
      'Hardware-accelerated 120 FPS mobile interfaces',
      'Predictive caching & micro-state management',
    ],
  },
  {
    id: 'apple-grade-minimalism',
    number: '02',
    title: 'Apple-Grade Minimalism',
    tagline: 'Obsessive spatial ergonomics & zero cognitive friction.',
    description:
      'Enterprise utility does not excuse visual clutter. We architect digital products through pure obsidian depth (#07090E), glass refractive physics, Golden Ratio typography scales, and tactile micro-interactions that elevate brand authority to Silicon Valley standards.',
    icon: Layers,
    accentColor: '#818CF8',
    highlightMetric: 'Zero Cognitive Load',
    features: [
      'Obsidian #07090E cyber-enterprise palette',
      'Dynamic spotlight cursor glass refractions',
      'Strict WCAG AAA contrast accessibility',
      'Fluid gesture momentum & haptic visual feedback',
    ],
  },
  {
    id: 'zero-trust-security',
    number: '03',
    title: 'Zero-Trust Security',
    tagline: 'Military-grade perimeter defense & automated CI/CD audits.',
    description:
      'Security is not an afterthought or an add-on module—it is our bedrock. Every API route, WebSocket connection, and database transaction undergoes rigorous automated OWASP Top 10 regression testing, AES-256-GCM encryption, and zero-privilege IAM credential isolation.',
    icon: Lock,
    accentColor: '#00F2FE',
    highlightMetric: 'SOC-2 / OWASP Hardened',
    features: [
      'Automated AST & static vulnerability analysis',
      'AES-256-GCM & TLS 1.3 cryptographic suites',
      'Zero-privilege IAM & tokenized session gates',
      'Containerized namespace isolation with Docker',
    ],
  },
  {
    id: 'senior-architect-support',
    number: '04',
    title: 'Direct Senior Architect Support',
    tagline: 'Zero intermediary account managers. Direct technical command.',
    description:
      'We eliminate bureaucratic telephone games. You collaborate directly with Lead Architect Monish S. and principal system builders who write, audit, and deploy your code. Backed by legally binding NDAs and an iron-clad 2-hour technical response SLA.',
    icon: ShieldCheck,
    accentColor: '#F59E0B',
    highlightMetric: '< 2-Hour Response SLA',
    features: [
      'Direct line to Lead Architect Monish S.',
      'Comprehensive IP transfer & verifiable source access',
      'Written 99.9% uptime SLA service commitments',
      'Govt. of India MSME official legal protection',
    ],
  },
];

// ---------------------------------------------------------
// ORIGIN NARRATIVE TIMELINE
// ---------------------------------------------------------
interface NarrativeMilestone {
  year: string;
  badge: string;
  title: string;
  narrative: string;
  takeaway: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NARRATIVE_JOURNEY: NarrativeMilestone[] = [
  {
    year: 'PHASE 01 // ORIGIN',
    badge: 'CAMPUS VANGUARD',
    title: 'Student Leadership & Cyber Range Crucible',
    narrative:
      'At SRM Institute of Science & Technology, founder Monish S. spearheaded high-intensity cybersecurity challenges, national CTF tournaments, and offensive exploitation research. This era birthed Monix-web-OS—a ground-up browser operating system featuring a virtual filesystem, windowing engine, and peer-to-peer telemetry sockets.',
    takeaway: 'Rooted in uncompromising hacker curiosity and deep system-level architecture.',
    icon: Terminal,
  },
  {
    year: 'PHASE 02 // PROTOTYPING',
    badge: 'AUTONOMOUS VELOCITY',
    title: 'The AI-Augmented Engineering Paradigm',
    narrative:
      'Recognizing that conventional engineering was sluggish and bloated, MONIX pioneered autonomous agentic pipelines. By embedding LLM-assisted code generation into strict zero-trust CI/CD workflows, rapid prototyping accelerated tenfold without forfeiting audit-grade security or mathematical code purity.',
    takeaway: 'Achieving sub-second delivery cycles that outpace traditional enterprise consultancies.',
    icon: Cpu,
  },
  {
    year: 'PHASE 03 // SOVEREIGNTY',
    badge: 'MSME ACCREDITATION',
    title: 'Founding the Enterprise in Tiruvannamalai',
    narrative:
      'Rejecting the congested metropolitan agency mold, MONIX officially incorporated as a Government of India Registered MSME Enterprise headquartered in Tiruvannamalai, Tamil Nadu. Proving that world-class cybersecurity, ultra-fast web architectures, and mission-critical AI applications can be built with elite regional focus and sovereign pride.',
    takeaway: 'Bridging tier-2 Indian engineering genius with international enterprise excellence.',
    icon: Award,
  },
  {
    year: 'PHASE 04 // EXPANSION',
    badge: 'ENTERPRISE REALM',
    title: 'India’s Premier Agile Tech Enterprise',
    narrative:
      'Today, MONIX Software Solutions stands as a trusted technology partner for startups, universities, enterprise institutions, and commercial clients across India. With 50+ deployed platforms, certified zero-trust perimeters, and 100/100 Lighthouse benchmark scores, we set the standard for high-performance software.',
    takeaway: 'Unwavering commitment to sub-second performance, absolute security, and architectural truth.',
    icon: Globe,
  },
];

// ---------------------------------------------------------
// INTERACTIVE SPOTLIGHT CARD COMPONENT
// ---------------------------------------------------------
const SpotlightPillarCard: React.FC<{
  pillar: EngineeringPillar;
  onOpenInquiry?: (title: string) => void;
}> = ({ pillar, onOpenInquiry }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const IconComp = pillar.icon;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl p-6 sm:p-8 bg-[#0B0F19]/90 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(0,242,254,0.18)]"
    >
      {/* Radial Spotlight Tracking Border Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 242, 254, 0.22),
              rgba(99, 102, 241, 0.12),
              transparent 70%
            )
          `,
        }}
      />

      {/* Subtle Inner Refraction Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 242, 254, 0.04),
              transparent 70%
            )
          `,
        }}
      />

      {/* Header: Number, Icon & Metric Tag */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F2FE] group-hover:border-[#00F2FE]/50 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all duration-300">
            <IconComp className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-slate-500 tracking-widest uppercase">
              PILLAR {pillar.number}
            </span>
            <div className="font-mono text-xs font-semibold text-cyan-400 tracking-wide">
              {pillar.highlightMetric}
            </div>
          </div>
        </div>

        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 group-hover:border-cyan-400/30 group-hover:text-white transition-colors">
          VERIFIED
        </span>
      </div>

      {/* Title & Tagline */}
      <div className="relative z-10 space-y-2 mb-4">
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
          {pillar.title}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
          {pillar.tagline}
        </p>
      </div>

      {/* Deep-Dive Narrative */}
      <p className="relative z-10 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-6">
        {pillar.description}
      </p>

      {/* Key Feature Verification List */}
      <div className="relative z-10 pt-4 border-t border-white/10 space-y-2.5 mb-6">
        {pillar.features.map((feat, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-2">
        <button
          onClick={() => onOpenInquiry && onOpenInquiry(pillar.title)}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#00F2FE]/15 border border-white/10 hover:border-[#00F2FE]/40 text-slate-200 hover:text-[#00F2FE] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs"
        >
          <span>Consult on this Pillar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------
// MAIN EXPORTED COMPONENT: AboutUsDeepDive
// ---------------------------------------------------------
export const AboutUsDeepDive: React.FC<AboutUsDeepDiveProps> = ({
  lang = 'en',
  onOpenInquiry,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'pillars' | 'hardware'>('pillars');

  const handleInquiryLaunch = (item?: string) => {
    if (onOpenInquiry) {
      onOpenInquiry(item || 'Enterprise Architectural Consultation');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans relative overflow-hidden pb-24">
      {/* Subtle Mesh Background Grids & Ambient Glow Lights */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Top Ambient Glow Spotlights */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#00F2FE]/15 via-[#6366F1]/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-[35%] -left-32 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-[65%] -right-32 w-[550px] h-[550px] bg-indigo-600/10 blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 space-y-16 sm:space-y-24">
        
        {/* ========================================================
            1. BREADCRUMBS & TOP NAVIGATION STRIP
           ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            {onBackToHome ? (
              <button
                onClick={onBackToHome}
                className="hover:text-cyan-400 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            ) : (
              <a href="#home" className="hover:text-cyan-400 transition-colors flex items-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </a>
            )}
            <span className="text-white/20">/</span>
            <span className="text-slate-300">Enterprise Dossier</span>
            <span className="text-white/20">/</span>
            <span className="text-cyan-400 font-semibold">About MONIX</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="font-semibold uppercase tracking-wider">SYSTEM STATUS: 99.9% OPERATIONAL</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>MSME VERIFIED</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. HERO / EXECUTIVE DOSSIER KICKER
           ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.15)] text-cyan-300 text-xs font-mono uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>ENTERPRISE CAPABILITY & ORIGIN ARCHITECTURE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]"
          >
            Architecting India's Premier <br />
            <span className="bg-gradient-to-r from-[#00F2FE] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
              Agile AI & Zero-Trust
            </span>{' '}
            Software Enterprise.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-sm sm:text-lg text-slate-300 leading-relaxed font-sans max-w-3xl mx-auto"
          >
            From student-led browser operating systems and national cyber-range CTFs to an officially
            registered Government of India MSME enterprise in Tiruvannamalai—MONIX redefines digital
            production with sub-second velocity, Apple-grade minimalism, and direct architect partnership.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <button
              onClick={() => handleInquiryLaunch('Executive Architectural Triage')}
              className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#6366F1] text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:shadow-[0_0_45px_rgba(0,242,254,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center space-x-2"
            >
              <span>Initiate Architectural Triage</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="#pillars"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('pillars');
                document.getElementById('pillars-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/40 text-slate-200 hover:text-white font-mono text-xs sm:text-sm tracking-wide uppercase transition-all cursor-pointer flex items-center space-x-2"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Review Engineering Pillars</span>
            </a>
          </motion.div>
        </div>

        {/* ========================================================
            3. CREDIBILITY BENCHMARKS & HARDWARE STRIP
           ======================================================== */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="flex items-center space-x-2 font-mono text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
              <span className="text-slate-200 font-bold uppercase tracking-wider">
                VERIFIED HARDWARE & PERFORMANCE BENCHMARKS
              </span>
            </div>
            <span className="font-mono text-[10px] text-cyan-400/80 uppercase tracking-widest">
              INDEPENDENT AUDIT // GOOGLE LIGHTHOUSE 100/100
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CREDIBILITY_BENCHMARKS.map((b, idx) => {
              const IconItem = b.icon;
              return (
                <div
                  key={b.id}
                  className="relative rounded-2xl p-4 bg-[#0D121F]/80 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border tracking-widest uppercase"
                      style={{
                        color: b.statusColor,
                        borderColor: `${b.statusColor}40`,
                        backgroundColor: `${b.statusColor}10`,
                      }}
                    >
                      {b.status}
                    </span>
                    <IconItem className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <div className="my-1">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight drop-shadow-sm">
                        {b.value}
                      </span>
                      {b.unit && (
                        <span className="text-xs sm:text-sm font-bold font-mono text-cyan-400">
                          {b.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-200 leading-snug">{b.label}</p>
                    <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{b.sub}</p>
                  </div>

                  {/* Micro Accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: b.statusColor }}
                  />
                </div>
              );
            })}
          </div>

          {/* Detailed 4-Metric Lighthouse Audit Bar */}
          <div className="rounded-2xl p-4 bg-[#0B0F19]/90 border border-emerald-500/25 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                ✓
              </div>
              <div>
                <span className="text-white font-bold block">100/100 PRODUCTION LIGHTHOUSE AUDIT PASSED</span>
                <span className="text-slate-400 text-[11px]">Strict zero-jank mobile budget & sub-second core web vitals.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-semibold">Performance: 100</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-semibold">Accessibility: 100</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-semibold">Best Practices: 100</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-semibold">SEO: 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. NAVIGATION TAB SWITCHER
           ======================================================== */}
        <div className="flex justify-center border-b border-white/10 pb-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-2">
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'pillars'
                  ? 'bg-gradient-to-r from-[#00F2FE]/20 to-[#6366F1]/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              01. Engineering Pillars
            </button>
            <button
              onClick={() => setActiveTab('narrative')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'narrative'
                  ? 'bg-gradient-to-r from-[#00F2FE]/20 to-[#6366F1]/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              02. Origin Narrative
            </button>
            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'hardware'
                  ? 'bg-gradient-to-r from-[#00F2FE]/20 to-[#6366F1]/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              03. Hardware Dossier
            </button>
          </div>
        </div>

        {/* ========================================================
            5. THE FOUR ENGINEERING PILLARS SECTION
           ======================================================== */}
        <div id="pillars-section" className={activeTab === 'pillars' ? 'block' : 'hidden'}>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00F2FE] uppercase bg-[#00F2FE]/10 px-3.5 py-1 rounded-full border border-[#00F2FE]/25">
              NON-NEGOTIABLE ARCHITECTURAL FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              The Four Uncompromised Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Every system deployed under the MONIX hallmark adheres to these core tenets—zero excuses, zero tech debt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {ENGINEERING_PILLARS.map((pillar) => (
              <SpotlightPillarCard
                key={pillar.id}
                pillar={pillar}
                onOpenInquiry={handleInquiryLaunch}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            6. ORIGIN NARRATIVE: CAMPUS HACKER TO MSME ENTERPRISE
           ======================================================== */}
        <div className={activeTab === 'narrative' ? 'block' : 'hidden'}>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/25">
              GENESIS // TRANSITION TIMELINE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              From Student Vanguard to Sovereign MSME
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              How relentless technical curiosity in university computer labs evolved into Tiruvannamalai's most trusted engineering enterprise.
            </p>
          </div>

          <div className="relative border-l-2 border-white/10 pl-6 sm:pl-10 ml-4 sm:ml-12 space-y-12">
            {NARRATIVE_JOURNEY.map((m, idx) => {
              const IconComp = m.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Timeline Node Orb */}
                  <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-[#07090E] border-2 border-cyan-400 flex items-center justify-center text-[10px] font-mono text-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all shadow-[0_0_12px_rgba(0,242,254,0.4)]">
                    {idx + 1}
                  </div>

                  <div className="rounded-3xl p-6 sm:p-8 bg-[#0D121F]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 space-y-4 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
                          {m.year}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                          {m.badge}
                        </span>
                      </div>
                      <IconComp className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </div>

                    <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                      {m.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {m.narrative}
                    </p>

                    <div className="pt-3 border-t border-white/5 flex items-center space-x-2 text-xs font-mono text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{m.takeaway}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            7. HARDWARE SPECIFICATION & TELEMETRY DOSSIER
           ======================================================== */}
        <div className={activeTab === 'hardware' ? 'block' : 'hidden'}>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1 rounded-full border border-indigo-500/25">
              SYSTEM ARCHITECTURE DOSSIER
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Verified Technical Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Concrete system parameters, encryption standards, and runtime environments powering our deployments.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-8 bg-[#090D16] border border-white/10 font-mono text-xs space-y-6 shadow-2xl">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-slate-400 text-xs ml-2 font-mono">monix-kernel-telemetry // v4.2-enterprise</span>
              </div>
              <div className="text-slate-400 text-[11px]">LOCATION: TIRUVANNAMALAI // ASIA-SOUTH1</div>
            </div>

            {/* Spec Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-slate-500 text-[10px] uppercase">RUNTIME ENGINE</div>
                <div className="text-cyan-300 font-bold text-sm">React 19 + Next.js 15 + Go</div>
                <div className="text-slate-400 text-[11px]">Strict zero-runtime overhead compilation</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-slate-500 text-[10px] uppercase">CRYPTOGRAPHIC SUITE</div>
                <div className="text-emerald-300 font-bold text-sm">AES-256-GCM / TLS 1.3</div>
                <div className="text-slate-400 text-[11px]">End-to-end tokenized payload isolation</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-slate-500 text-[10px] uppercase">CONTAINER ORCHESTRATION</div>
                <div className="text-indigo-300 font-bold text-sm">Docker + MicroVM Namespaces</div>
                <div className="text-slate-400 text-[11px]">Memory-isolated microservices</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-slate-500 text-[10px] uppercase">DATABASE TOPOLOGY</div>
                <div className="text-cyan-300 font-bold text-sm">PostgreSQL + Redis Cache</div>
                <div className="text-slate-400 text-[11px]">Sub-5ms multi-tenant query execution</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-slate-500 text-[10px] uppercase">SLA COMMITMENT</div>
                <div className="text-amber-300 font-bold text-sm">99.9% Cloud Uptime Guarantee</div>
                <div className="text-slate-400 text-[11px]">Multi-region automated failover fallback</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-slate-500 text-[10px] uppercase">SECURITY AUDIT STANDARD</div>
                <div className="text-rose-300 font-bold text-sm">OWASP Top 10 Automated AST</div>
                <div className="text-slate-400 text-[11px]">Zero critical vulnerability signoff</div>
              </div>
            </div>

            {/* Terminal Live Output Simulation */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-slate-300 space-y-1 font-mono text-[11px]">
              <div className="text-emerald-400">root@monix-edge:~# monix audit --verify-all</div>
              <div className="text-slate-400">[+] Auditing Tiruvannamalai HQ Core Gateway... PASS</div>
              <div className="text-slate-400">[+] Validating MSME Certificate UDYAM-TN-XX... VERIFIED</div>
              <div className="text-slate-400">[+] Testing Edge Cold Start: 12.4ms (p95: 18.2ms)... OPTIMAL</div>
              <div className="text-slate-400">[+] Checking Google Lighthouse Audit: 100/100 across 4 suites... CONFIRMED</div>
              <div className="text-emerald-400 font-bold">[SUCCESS] All systems operational. 0 vulnerabilities detected.</div>
            </div>
          </div>
        </div>

        {/* ========================================================
            8. EXECUTIVE LEADERSHIP SPOTLIGHT: MONISH S.
           ======================================================== */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0B0F19] via-[#0D121F] to-[#07090E] border border-cyan-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Radial Corner Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Bio Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>EXECUTIVE TECHNICAL LEADERSHIP</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Monish S.
              </h3>
              
              <p className="text-xs sm:text-sm font-mono font-bold text-cyan-400 tracking-wide uppercase">
                Founder & Lead Systems Architect // MONIX Software Solutions
              </p>

              <blockquote className="text-slate-300 font-serif italic text-sm sm:text-base leading-relaxed border-l-2 border-cyan-400 pl-4 py-1">
                "We don't sell bloated agency hours or layers of middle management. We deliver hardened,
                sub-second digital infrastructure with zero architectural compromises—engineered from
                Tiruvannamalai to power global modern enterprises."
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Monish directs all core system design, zero-trust cybersecurity audits, and autonomous AI workflows
                at MONIX. With an extensive background in offensive CTF challenge architecture, browser-based operating
                systems, and high-concurrency cloud systems, he provides direct technical counsel to every active partner.
              </p>

              {/* Verified Contact Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <a
                  href="https://www.linkedin.com/in/monish-srm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#0077B5]/15 hover:bg-[#0077B5]/25 border border-[#0077B5]/40 text-[#38BDF8] hover:text-white transition-all flex items-center space-x-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="mailto:monixsoftwaresolutions@gmail.com"
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center space-x-1.5"
                >
                  <span>monixsoftwaresolutions@gmail.com</span>
                </a>

                <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center space-x-1">
                  <span>HQ: Tiruvannamalai, Tamil Nadu</span>
                </span>
              </div>
            </div>

            {/* Right Credential Summary Card */}
            <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-white/10 pb-2">
                VERIFIED CREDENTIALS
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Legal Status:</span>
                  <span className="text-white font-bold">Govt. MSME Registered</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Direct SLA:</span>
                  <span className="text-cyan-400 font-bold">&lt; 2-Hour Response</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Core Expertise:</span>
                  <span className="text-white font-bold">AI & Cybersecurity</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Origin:</span>
                  <span className="text-white font-bold">SRM Institute Alumni</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Code Ownership:</span>
                  <span className="text-emerald-400 font-bold">100% Client IP Rights</span>
                </div>
              </div>

              <button
                onClick={() => handleInquiryLaunch('Direct Architectural Consultation with Monish S.')}
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-[#00F2FE]/15 hover:bg-[#00F2FE] text-[#00F2FE] hover:text-slate-950 border border-[#00F2FE]/40 hover:border-[#00F2FE] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Direct Architect Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            9. BOTTOM STRATEGIC ENGAGEMENT CTA
           ======================================================== */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0B0F19] via-[#111827] to-[#0B0F19] border border-cyan-500/30 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>ENTERPRISE COLLABORATION PORTAL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Ready to Build Mission-Critical Software with Zero Compromises?
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
            Whether you require an autonomous AI workflow engine, an enterprise web portal, or a
            complete zero-trust security audit—connect directly with our engineering core.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleInquiryLaunch('Enterprise Engagement')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#6366F1] text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(0,242,254,0.3)] hover:shadow-[0_0_50px_rgba(0,242,254,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center space-x-2"
            >
              <span>Schedule Architectural Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs sm:text-sm tracking-wide uppercase transition-all cursor-pointer"
              >
                Return to Homepage
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUsDeepDive;

import React from 'react';
import { Sparkles, Zap, Cpu, Clock, ShieldCheck, Headphones, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';

interface WhyChooseMonixProps {
  lang?: Language;
}

const PILLARS = [
  {
    icon: Sparkles,
    title: 'Apple-Grade Design',
    desc: 'Minimalist dark glassmorphism, pixel-perfect typography, and responsive micro-interactions.',
    tag: 'AESTHETICS',
    metric: '60 FPS Motion',
  },
  {
    icon: Zap,
    title: 'Sub-Second Speed',
    desc: '100/100 Lighthouse score, sub-200ms TTFB, and globally distributed edge CDN caching.',
    tag: 'PERFORMANCE',
    metric: '< 200ms TTFB',
  },
  {
    icon: Cpu,
    title: 'AI-Driven Code',
    desc: 'Autonomous multi-agent workflows, custom vector RAG pipelines, and automated test coverage.',
    tag: 'INTELLIGENCE',
    metric: 'Agentic CI/CD',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'Strict agile sprint milestones, live preview deployments, and guaranteed on-schedule launch.',
    tag: 'EXECUTION',
    metric: '100% Launch Rate',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'Zero-trust architecture, OWASP Top 10 compliance, and end-to-end 256-bit SSL encryption.',
    tag: 'SECURITY',
    metric: 'Zero-Trust SSL',
  },
  {
    icon: Headphones,
    title: 'Direct Support',
    desc: 'Dedicated senior engineering channel with under 2-hour SLA triage and 30-day post-launch warranty.',
    tag: 'RELIABILITY',
    metric: '< 2h SLA Guarantee',
  },
];

export const WhyChooseMonix: React.FC<WhyChooseMonixProps> = () => {
  return (
    <section id="why-choose-monix" className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#07090E] text-[#F8FAFC] py-8 sm:py-12 lg:py-16 snap-section">
      {/* Ambient Cyber Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293714_1px,transparent_1px),linear-gradient(to_bottom,#1f293714_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#00F2FE]/5 to-[#6366F1]/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-2 sm:py-4 lg:py-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/25 text-[#00F2FE] text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>UNCOMPROMISING STANDARDS</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Why Enterprise Leaders Choose MONIX
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto line-clamp-1">
            Engineered with high-impact precision, Apple/Linear style minimalism, and unyielding production standards.
          </p>

          <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent mx-auto rounded-full mt-1" />
        </div>

        {/* 6 Clean Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 bg-[#111827]/70 backdrop-blur-md border border-white/[0.08] hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_-5px_rgba(0,242,254,0.15)] hover:-translate-y-1"
              >
                {/* Subtle Top-Right Ambient Flare */}
                <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#00F2FE]/5 group-hover:bg-[#00F2FE]/10 blur-2xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Card Top: Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#00F2FE]/40 group-hover:bg-[#00F2FE]/10 flex items-center justify-center text-[#00F2FE] transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400 border border-white/[0.06] group-hover:border-[#00F2FE]/30 group-hover:text-cyan-300 transition-colors">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm sm:text-base font-bold text-[#F8FAFC] tracking-tight mb-1 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-snug font-light line-clamp-2">
                    {pillar.desc}
                  </p>
                </div>

                {/* Footer Status Pill */}
                <div className="pt-2 sm:pt-2.5 border-t border-white/[0.06] mt-2.5 sm:mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center space-x-1.5 text-[#00F2FE]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Standard</span>
                  </span>
                  <span className="text-slate-300 font-semibold">{pillar.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, Sparkles, CheckCircle2, TrendingUp, Pause, Play, Award, Terminal } from 'lucide-react';
import { Language, ReviewItem } from '../types';

interface TestimonialsMarqueeProps {
  lang?: Language;
}

// Anonymous, humanized verified feedback honoring client confidentiality
const ANONYMOUS_REVIEWS: ReviewItem[] = [
  {
    name: 'Verified Enterprise Founder',
    role: 'Global SaaS Platform • Verified Partner',
    quote: 'MONIX delivered our web application with exceptional speed and precision. Lighthouse scores hit 100/100 and transaction times dropped noticeably right after deployment.',
    metric: '⚡ 100/100 Lighthouse',
    badge: 'Enterprise SaaS',
    avatarText: 'EF',
    rating: 5,
    verified: true,
  },
  {
    name: 'FinTech Lead Architect',
    role: 'Banking & Payment Systems • Verified Client',
    quote: 'The engineering quality and secure data handling are outstanding. Clean microservice architecture, zero downtime, and transparent sprint updates throughout the build.',
    metric: '🔒 256-Bit SSL Encrypted',
    badge: 'FinTech Solutions',
    avatarText: 'FA',
    rating: 5,
    verified: true,
  },
  {
    name: 'AI Startup CTO',
    role: 'Autonomous LLM Platform • Verified Partner',
    quote: 'Their expertise with custom AI agent workflows and vector search pipelines saved us months of research. The turn-around time was consistently faster than estimated.',
    metric: '🤖 Agentic Workflows',
    badge: 'Next-Gen AI',
    avatarText: 'AC',
    rating: 5,
    verified: true,
  },
  {
    name: 'HealthTech Solutions Lead',
    role: 'Clinical Diagnostic Cloud • Verified Client',
    quote: 'The UI is fluid, responsive, and easy for both clinicians and patients to navigate. Strict adherence to specifications and seamless mobile optimization across all screen sizes.',
    metric: '✨ 60fps Mobile UI',
    badge: 'Healthcare Portal',
    avatarText: 'HL',
    rating: 5,
    verified: true,
  },
  {
    name: 'E-Commerce Engineering VP',
    role: 'Multi-Vendor Marketplace • Verified Client',
    quote: 'Modern Next.js stack with instantaneous page transitions. Our checkout flow is now silky-smooth and customer drop-offs decreased significantly in the first month.',
    metric: '📈 +185% Velocity',
    badge: 'Headless E-Com',
    avatarText: 'EV',
    rating: 5,
    verified: true,
  },
  {
    name: 'Senior Cloud Consultant',
    role: 'Enterprise Modernization • Verified Partner',
    quote: 'Code readability, modular architecture, and comprehensive documentation made handoff effortless. True engineering partners who deliver on time without compromise.',
    metric: '⏱️ Turnkey Delivery',
    badge: 'Cloud Architecture',
    avatarText: 'SC',
    rating: 5,
    verified: true,
  },
];

export const TestimonialsMarquee: React.FC<TestimonialsMarqueeProps> = ({ lang = 'en' }) => {
  const [isPaused, setIsPaused] = useState(false);

  const rowOne = ANONYMOUS_REVIEWS;
  const rowTwo = [...ANONYMOUS_REVIEWS.slice(3), ...ANONYMOUS_REVIEWS.slice(0, 3)];

  const renderCard = (card: ReviewItem, index: number, rowId: string) => (
    <div
      key={`${rowId}-${index}-${card.name}`}
      className="group relative w-[260px] sm:w-[310px] lg:w-[350px] shrink-0 p-3 sm:p-3.5 lg:p-4 rounded-xl lg:rounded-2xl bg-[#111827]/70 backdrop-blur-xl border border-white/10 hover:border-[#00F2FE]/50 transition-all duration-300 hover:shadow-[0_10px_35px_-5px_rgba(0,242,254,0.18)] hover:-translate-y-1 text-left flex flex-col justify-between"
    >
      {/* Subtle Cyan Gradient Ambient Glow on Hover */}
      <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-br from-[#00F2FE]/5 via-transparent to-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div>
        {/* Top Header: Badge, Rating & Metric Chip */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/25 text-[#00F2FE] text-[10px] font-semibold tracking-wide">
            <Sparkles className="w-2.5 h-2.5 text-[#00F2FE]" />
            <span>{card.badge}</span>
          </div>

          <div className="flex items-center space-x-0.5 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
            {[...Array(card.rating || 5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Quote Block */}
        <div className="relative mb-2 sm:mb-3">
          <Quote className="w-4 h-4 text-[#00F2FE]/20 absolute -top-1 -left-1 pointer-events-none" />
          <p className="relative text-xs lg:text-[13px] leading-relaxed text-[#F8FAFC]/90 font-normal pl-3 border-l-2 border-[#00F2FE]/40 group-hover:border-[#00F2FE] transition-colors line-clamp-3">
            "{card.quote}"
          </p>
        </div>
      </div>

      {/* Footer: User Identity & High-Impact Metric */}
      <div className="pt-2 sm:pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#00F2FE]/20 via-[#6366F1]/30 to-[#07090E] border border-[#00F2FE]/40 flex items-center justify-center font-mono font-bold text-[10px] text-[#00F2FE] shrink-0 shadow-inner">
            {card.avatarText}
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1">
              <h4 className="font-semibold text-xs text-[#F8FAFC] truncate">
                {card.name}
              </h4>
              {card.verified && (
                <ShieldCheck className="w-3 h-3 text-[#00F2FE] shrink-0" title="Verified Client" />
              )}
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              {card.role}
            </p>
          </div>
        </div>

        {card.metric && (
          <span className="shrink-0 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-md bg-[#6366F1]/15 border border-[#6366F1]/30 text-indigo-300">
            {card.metric}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#07090E] py-8 sm:py-12 lg:py-16 snap-section border-t border-white/10 selection:bg-[#00F2FE]/30 selection:text-white">
      {/* Cyber Grid & Ambient Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293714_1px,transparent_1px),linear-gradient(to_bottom,#1f293714_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#00F2FE]/10 via-[#6366F1]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4 lg:mb-5">
        <div className="flex flex-col items-center text-center space-y-1 sm:space-y-1.5">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#111827]/80 border border-[#00F2FE]/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.15)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-[#00F2FE]">
              Production Benchmarks & Verified Outcomes
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-sky-300 to-[#6366F1]">Visionary Leaders</span> & Teams
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed font-light line-clamp-1">
            Verified feedback from industry founders, enterprise architects, and software leads partnering with MONIX for high-velocity software engineering.
          </p>

          {/* Stats Badges */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-300 font-mono">
            <span className="flex items-center space-x-1.5 bg-[#111827]/60 px-2 py-0.5 rounded-lg border border-white/10">
              <TrendingUp className="w-3 h-3 text-[#00F2FE]" />
              <span>Avg Latency Drop: <strong className="text-white">68%</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 bg-[#111827]/60 px-2 py-0.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Client Satisfaction: <strong className="text-white">100%</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 bg-[#111827]/60 px-2 py-0.5 rounded-lg border border-white/10">
              <Award className="w-3 h-3 text-[#6366F1]" />
              <span>Govt. MSME Verified</span>
            </span>

            {/* Marquee Play/Pause Control Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume continuous marquee' : 'Pause marquee'}
              className="flex items-center space-x-1.5 bg-[#111827] hover:bg-slate-800 text-slate-300 hover:text-white px-2 py-0.5 rounded-lg border border-white/15 transition-colors cursor-pointer text-[10px]"
            >
              {isPaused ? <Play className="w-3 h-3 text-[#00F2FE]" /> : <Pause className="w-3 h-3 text-slate-400" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div 
        className="relative w-full overflow-hidden space-y-2.5 sm:space-y-3.5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Edge Masks for High-End Fade Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 lg:w-36 bg-gradient-to-r from-[#07090E] via-[#07090E]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 lg:w-36 bg-gradient-to-l from-[#07090E] via-[#07090E]/90 to-transparent z-20" />

        {/* Row 1: Leftward Infinite Marquee */}
        <div 
          className="flex w-max space-x-3 sm:space-x-4 animate-marquee"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {rowOne.concat(rowOne).map((card, idx) => renderCard(card, idx, 'row1'))}
        </div>

        {/* Row 2: Rightward / Offset Infinite Marquee */}
        <div 
          className="flex w-max space-x-3 sm:space-x-4 animate-marquee-reverse"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {rowTwo.concat(rowTwo).map((card, idx) => renderCard(card, idx, 'row2'))}
        </div>
      </div>

      {/* Bottom Subtext Guarantee */}
      <div className="relative max-w-4xl mx-auto mt-3 sm:mt-4 lg:mt-5 px-4 text-center">
        <div className="inline-flex items-center justify-center space-x-2 text-[10px] font-mono text-slate-400 bg-[#111827]/80 px-3 py-1 rounded-xl border border-white/10">
          <Terminal className="w-3 h-3 text-[#00F2FE]" />
          <span>All architecture deliverables independently benchmarked for 100/100 Google Lighthouse and 99.99% uptime.</span>
        </div>
      </div>

    </section>
  );

};

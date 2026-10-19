import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Terminal, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MetricsBentoStrip } from './MetricsBentoStrip';

export interface HeroSectionProps {
  lang?: Language;
  onExploreServices?: () => void;
  onOpenInquiry?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang = 'en',
  onExploreServices,
  onOpenInquiry,
}) => {
  const t = translations[lang] || translations.en;

  // Local responsive background video paths
  const mobileVideoSrc = '/assets/bg-mob.mp4';
  const desktopVideoSrc = '/assets/bg-pc.mp4';

  // Magnetic cursor interaction physics for the Primary CTA button
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ctaRef.current) return;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    mouseX.set(x * 0.35);
    mouseY.set(y * 0.35);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handlePrimaryCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onOpenInquiry) {
      onOpenInquiry();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '#contact';
      }
    }
  };

  const handleSecondaryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onExploreServices) {
      onExploreServices();
    } else {
      const servicesEl = document.getElementById('services');
      if (servicesEl) {
        servicesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] lg:h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#07090E] text-white pt-14 md:pt-16 snap-section"
    >
      {/* =========================================================================
          1. RESPONSIVE BACKGROUND VIDEOS (Native Hardware-Accelerated Looping)
          ========================================================================= */}

      {/* Mobile Video: screens < 768px (sm:hidden) preserves portrait 9:16 perspective */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-portrait.webp"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-80 sm:hidden"
      >
        <source src={mobileVideoSrc} type="video/mp4" />
      </video>

      {/* Desktop Video: screens >= 768px (hidden sm:block) preserves cinematic 16:9 widescreen perspective */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-landscape.webp"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-80 hidden sm:block"
      >
        <source src={desktopVideoSrc} type="video/mp4" />
      </video>

      {/* =========================================================================
          2. VIGNETTE & CONTRAST OVERLAY (Balanced for High Brightness & Legibility)
          ========================================================================= */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#07090E]/75 via-[#07090E]/30 to-[#07090E]/90 z-10 pointer-events-none" 
      />

      {/* Subtle Matrix Ambient Mesh Layer */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(0,242,254,0.05)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-30 z-10" 
      />

      {/* Ambient Cyber Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[46rem] h-[26rem] rounded-full bg-[#00F2FE]/10 blur-[150px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[34rem] h-[22rem] rounded-full bg-[#6366F1]/10 blur-[140px] pointer-events-none z-10" />

      {/* =========================================================================
          3. CENTER-ALIGNED HERO TYPOGRAPHY MATCHING REFERENCE SCREENSHOT
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 my-auto">
        
        {/* Eyebrow Badge: Blinking Emerald Status Dot */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-[#0B0F19]/80 backdrop-blur-md mb-4 md:mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#10B981] uppercase">
            MODERN. FAST. RELIABLE.
          </span>
        </motion.div>

        {/* 3-Line Exact Headline matching reference image */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight tracking-tight max-w-4xl mx-auto select-none"
        >
          <span className="text-[#F8FAFC] block drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
            WE BUILD DIGITAL
          </span>
          <span className="text-[#00F2FE] block drop-shadow-[0_0_25px_rgba(0,242,254,0.35)]">
            EXPERIENCES THAT
          </span>
          <span className="text-[#00F2FE] block drop-shadow-[0_0_25px_rgba(0,242,254,0.35)]">
            MATTER.
          </span>
        </motion.h1>

        {/* Crisp Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed mt-3 md:mt-4"
        >
          Clean design. Powerful functionality. Results that drive growth.
        </motion.p>

        {/* Action Buttons: Primary Cyan Glow CTA & Secondary Glass Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-5 md:mt-7 w-full sm:w-auto"
        >
          {/* Primary Glowing Cyan CTA with Magnetic Cursor Effect */}
          <motion.a
            ref={ctaRef}
            href="#contact"
            onClick={handlePrimaryCTAClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: magneticX, y: magneticY }}
            className="group relative inline-flex p-[1.5px] rounded-xl overflow-hidden cursor-pointer shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.6)] transition-shadow duration-300 w-full sm:w-auto"
          >
            {/* Liquid Light Rotating Gradient Border */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#00F2FE] via-[#6366F1] to-[#00F2FE] rounded-xl group-hover:rotate-180 transition-transform duration-1000" />
            
            {/* Button Inner Body */}
            <span className="relative flex items-center justify-center space-x-2 py-2.5 px-6 rounded-[10.5px] bg-[#07090E] group-hover:bg-[#0B0F19] transition-colors text-white font-bold text-xs sm:text-sm tracking-wider uppercase font-sans overflow-hidden w-full sm:w-auto">
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              <span className="tracking-widest">LET'S WORK TOGETHER</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00F2FE] group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          {/* Secondary Glass Border Button */}
          <button
            onClick={handleSecondaryClick}
            className="inline-flex items-center justify-center space-x-1.5 py-2.5 px-6 rounded-xl bg-[#0B0F19]/80 hover:bg-white/10 border border-white/15 hover:border-[#00F2FE]/50 text-slate-300 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 w-full sm:w-auto cursor-pointer shadow-sm backdrop-blur-md"
          >
            <span>&gt; EXPLORE SERVICES</span>
          </button>
        </motion.div>

        {/* Assurance Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 mt-5 md:mt-7 text-[11px] sm:text-xs font-mono text-slate-400"
        >
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>Next.js 15 & React 19 Architecture</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>MSME Govt. Registered</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-indigo-400" />
            <span>Zero-Trust Enterprise Security</span>
          </div>
        </motion.div>

      </div>

      {/* Bottom Vignette Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#07090E] via-[#07090E]/80 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroSection;

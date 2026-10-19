import React, { useState } from 'react';
import { 
  ShieldCheck, Mail, Phone, MapPin, Globe, Instagram, Linkedin, 
  Send, CheckCircle2, ArrowRight, Terminal, Cpu, Sparkles, ExternalLink 
} from 'lucide-react';
import { Language, PageView } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  lang: Language;
  onNavigate: (view: PageView) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, onOpenInquiry }) => {
  const t = translations[lang];

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim() || !emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Please enter a valid corporate or engineering email');
      return;
    }

    setNewsletterError('');
    setNewsletterStatus('loading');

    // Simulate cyber dispatch
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 800);
  };

  return (
    <footer className="bg-[#07090E] text-[#F8FAFC] border-t border-white/10 pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-12 relative overflow-hidden selection:bg-[#00F2FE]/30 selection:text-white">
      {/* Attractive Glowing Cyber Gradient Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00F2FE] via-sky-400 via-[#6366F1] to-transparent shadow-[0_0_25px_rgba(0,242,254,0.9),0_0_50px_rgba(99,102,241,0.5)] z-10" />

      {/* Atmospheric Multi-Hue Ambient Gradient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[220px] bg-gradient-to-b from-[#00F2FE]/15 via-[#6366F1]/10 to-transparent blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-[500px] h-[350px] bg-gradient-to-tr from-[#00F2FE]/15 via-[#3B82F6]/10 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-[500px] h-[350px] bg-gradient-to-tl from-[#6366F1]/20 via-[#00F2FE]/10 to-transparent blur-[100px] pointer-events-none" />

      {/* Background Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Operational Status Beacon Bar */}
        <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          
          {/* Status Beacon: ● All Systems Operational • 99.9% Uptime (Pulsing Green) */}
          <div className="inline-flex items-center space-x-2 sm:space-x-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#111827]/80 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-400 tracking-wide">
              ● All Systems Operational • 99.9% Uptime
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-[11px] font-mono text-slate-400">
              Avg Latency: 24ms (ap-south-1)
            </span>
          </div>

          {/* SLA Quick Action Link */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-[10px] sm:text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">Enterprise Response SLA: &lt; 2 Hours</span>
            <a 
              href="#contact"
              onClick={(e) => {
                const el = document.getElementById('contact') || document.getElementById('executive-contact');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[#00F2FE] hover:underline flex items-center space-x-1"
            >
              <span>Dispatch Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 pb-8 sm:pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info & MSME Credentials (4 Cols) */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#00F2FE] via-[#6366F1] to-slate-900 p-0.5 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all">
                <div className="w-full h-full bg-[#07090E] rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/monix-logo.webp" 
                    alt="MONIX Logo" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <span className="font-cinzel text-lg sm:text-xl font-black text-[#F8FAFC] tracking-wider group-hover:text-[#00F2FE] transition-colors">
                  MONIX
                </span>
                <p className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-[#00F2FE] uppercase">
                  Enterprise & AI Solutions
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Govt. MSME registered technology company engineering high-performance web systems, cross-platform mobile apps, AI microservices, and industry-accredited mentorship programs.
            </p>

            {/* MSME Registered Badge */}
            <div className="inline-flex items-center space-x-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#111827]/80 border border-white/10 text-slate-300 text-[10px] sm:text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F2FE] shrink-0" />
              <span>Ministry of MSME, Govt. of India</span>
            </div>

            {/* Tech Stack Indicator */}
            <div className="pt-1 sm:pt-2 flex flex-wrap gap-1.5 text-[9px] sm:text-[10px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Next.js 15</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">React 19</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Tailwind CSS</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">TypeScript</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Gemini AI</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#00F2FE] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#00F2FE] transition-colors cursor-pointer">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('web-development')} className="hover:text-[#00F2FE] transition-colors cursor-pointer">
                  {t.navWebDev}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mobile-applications')} className="hover:text-[#00F2FE] transition-colors cursor-pointer">
                  {t.navMobileApps}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-internships')} className="hover:text-[#00F2FE] transition-colors cursor-pointer">
                  {t.navInternships}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academic-projects')} className="hover:text-[#00F2FE] transition-colors cursor-pointer">
                  {t.navProjects}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('contact') || document.getElementById('executive-contact');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onNavigate('contact');
                    }
                  }} 
                  className="hover:text-[#00F2FE] transition-colors cursor-pointer"
                >
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#00F2FE] uppercase tracking-wider">
              Solutions & SLA
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200 transition-colors">Enterprise Web Applications</li>
              <li className="hover:text-slate-200 transition-colors">60fps Cross-Platform Mobile Apps</li>
              <li className="hover:text-slate-200 transition-colors">AI & Full-Stack Internships (MSME)</li>
              <li className="hover:text-slate-200 transition-colors">IEEE & Final Year Major Projects</li>
              <li className="hover:text-slate-200 transition-colors">Gemini AI Agent & API Microservices</li>
              <li className="hover:text-slate-200 transition-colors">Security Audits & HIPAA Portals</li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter Subscription (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5 sm:space-y-4">
            <h4 className="font-mono text-xs font-bold text-[#00F2FE] uppercase tracking-wider">
              Enterprise Desk
            </h4>
            
            {/* Cleaned up Contact Information */}
            <div className="space-y-2 text-xs font-mono text-slate-300">
              
              {/* Email: monixsoftwaresolutions@gmail.com */}
              <a 
                href="mailto:monixsoftwaresolutions@gmail.com" 
                className="flex items-center text-slate-300 hover:text-[#00F2FE] transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F2FE] mr-2 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">monixsoftwaresolutions@gmail.com</span>
              </a>

              {/* Location: Tiruvannamalai, Tamil Nadu */}
              <div className="flex items-center text-slate-400">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 mr-2 shrink-0" />
                <span>Tiruvannamalai, Tamil Nadu</span>
              </div>
            </div>

            {/* Newsletter: Enterprise engineering brief subscription with high-tech input border */}
            <div className="pt-1 sm:pt-2">
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 mb-1.5 sm:mb-2">
                Enterprise Engineering Brief
              </p>

              {newsletterStatus === 'success' ? (
                <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Subscribed to Engineering Brief v2026</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-1.5">
                  <div className="relative group">
                    {/* High-tech glowing input border wrapper */}
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#6366F1] opacity-30 group-hover:opacity-70 group-focus-within:opacity-100 transition-opacity blur-[2px]" />
                    <div className="relative flex items-center rounded-xl bg-[#07090E] overflow-hidden border border-white/15">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="engineering@company.com"
                        className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-transparent text-xs text-[#F8FAFC] placeholder-slate-500 focus:outline-none w-full font-mono"
                      />
                      <button
                        type="submit"
                        disabled={newsletterStatus === 'loading'}
                        aria-label="Subscribe to newsletter"
                        className="p-2 sm:p-2.5 bg-gradient-to-r from-[#00F2FE] to-[#6366F1] text-slate-950 hover:opacity-90 transition-opacity cursor-pointer shrink-0 disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {newsletterError && (
                    <p className="text-[10px] text-rose-400 font-mono">{newsletterError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Social Network Channels */}
            <div className="flex items-center space-x-2 pt-1 sm:pt-2">
              <a 
                href="https://www.linkedin.com/company/monix-softwaresolutions" 
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn: monix-softwaresolutions"
                className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F2FE]/50 text-slate-300 hover:text-[#00F2FE] transition-all text-[11px] sm:text-xs font-mono flex items-center space-x-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://www.instagram.com/monix.srm" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram: @monix.srm"
                className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F2FE]/50 text-slate-300 hover:text-[#00F2FE] transition-all text-[11px] sm:text-xs font-mono flex items-center space-x-1.5"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar & Legal Notice Requirement */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 font-mono gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-slate-400">
            © 2026 MONIX. All rights reserved. Registered under Ministry of MSME, Govt. of India.
          </p>
          <div className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4 text-[10px] sm:text-[11px] text-slate-500">
            <span>256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>100% IP Transfer Guarantee</span>
            <span>•</span>
            <span>ISO/MSME Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

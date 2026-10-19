import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { Language, PageView } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  lang?: Language;
  setLang?: (lang: Language) => void;
  onOpenInquiry: () => void;
  onOpenAboutModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  lang = 'en',
  onOpenInquiry,
  onOpenAboutModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Specified navigation items
  const navItems: { label: string; view: PageView | 'about'; id: string }[] = [
    { label: "About Us", view: 'about', id: 'about' },
    { label: "Software", view: 'web-development', id: 'software' },
    { label: "Project Domains", view: 'academic-projects', id: 'projects' },
    { label: "AI Internships", view: 'ai-internships', id: 'internships' },
    { label: "Contact", view: 'contact', id: 'contact' },
  ];

  const handleNavClick = (view: PageView | 'about') => {
    setMobileMenuOpen(false);
    if (view === 'about') {
      setCurrentView('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-3 sm:px-6 pt-2.5 sm:pt-3 pointer-events-none">
      {/* Floating Glass Pill Container */}
      <div 
        className={`pointer-events-auto max-w-5xl mx-auto rounded-full transition-all duration-300 backdrop-blur-xl border flex items-center h-14 md:h-16 px-4 md:px-8 ${
          scrolled
            ? 'bg-[#07090E]/90 border-cyan-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,242,254,0.15)]'
            : 'bg-[#0B0F19]/80 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_15px_rgba(0,242,254,0.06)]'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          
          {/* Brand Logo & Dynamic Gradient Text */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer origin-left"
            title="MONIX Enterprise & AI Software Solutions"
          >
            {/* Subtle Glowing Logo Icon */}
            <div className="relative w-7 sm:w-8 h-7 sm:h-8 rounded-full p-[1px] bg-gradient-to-tr from-[#00F2FE] via-[#6366F1] to-[#00F2FE] shadow-[0_0_14px_rgba(0,242,254,0.45)] group-hover:shadow-[0_0_20px_rgba(0,242,254,0.7)] transition-all duration-300">
              <div className="w-full h-full rounded-full bg-[#07090E] flex items-center justify-center p-1 overflow-hidden">
                <img
                  src="/assets/logo.webp"
                  alt="MONIX"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Dynamic Gradient Typography */}
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#6366F1] bg-clip-text text-transparent group-hover:brightness-110 transition-all font-sans">
                  MONIX
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F2FE] shadow-[0_0_8px_#00F2FE]"></span>
              </div>
              <span className="hidden sm:block font-mono text-[7.5px] font-semibold tracking-widest text-slate-400 uppercase -mt-0.5">
                ENTERPRISE & AI SOLUTIONS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.view)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/10 border border-[#00F2FE]/40 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill-active"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F2FE]/15 to-[#6366F1]/15 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: 'GET A QUOTE ->' matching reference image */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={onOpenInquiry}
              className="px-4 py-1.5 rounded-full border border-cyan-400/50 hover:border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 text-[#00F2FE] hover:text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 flex items-center space-x-1.5 shadow-[0_0_15px_rgba(0,242,254,0.2)] hover:shadow-[0_0_22px_rgba(0,242,254,0.4)] cursor-pointer active:scale-95"
            >
              <span className="text-[10px] text-cyan-400">❖</span>
              <span>GET A QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>

          {/* Mobile Menu Action Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full border border-white/10 bg-white/5 text-slate-200 hover:text-white hover:border-[#00F2FE]/40 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00F2FE]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Dark Cyber Floating Glass Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto max-w-6xl mx-auto mt-2 rounded-2xl border border-white/10 bg-[#07090E]/95 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(0,242,254,0.15)] lg:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.view)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00F2FE]/15 to-[#6366F1]/15 text-white border border-[#00F2FE]/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 mt-3 border-t border-white/10 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full relative group p-[1.5px] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#00F2FE] via-[#6366F1] to-[#00F2FE]" />
                <span className="relative flex items-center justify-center space-x-2 py-2.5 rounded-[10px] bg-[#07090E] text-white font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#00F2FE]" />
                  <span>Get a Quote</span>
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

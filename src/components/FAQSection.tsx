import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, HelpCircle, ShieldCheck, Zap, Clock, FileCode2, Award, 
  Search, Sparkles, MessageCircle, ArrowRight, Lock
} from 'lucide-react';
import { Language, FAQItem } from '../types';

interface FAQSectionProps {
  lang?: Language;
  onOpenInquiry?: (service?: string, category?: string) => void;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: "What are the standard delivery sprint timelines for enterprise projects and web applications?",
    a: "Rapid MVPs, high-converting landing funnels, and corporate web platforms are engineered and deployed in 5 to 10 business days. Custom full-stack web/mobile applications, AI microservices, and enterprise ERP suites are delivered in 2 to 4 week agile sprints with bi-weekly live staging demos, comprehensive test suites, and transparent roadmap milestones.",
    category: "timelines",
    tag: "Delivery & Sprints"
  },
  {
    q: "How does MONIX guarantee 60fps smooth animations and mobile performance?",
    a: "Every application is architected with React 19 / Next.js 15, edge-side rendering (SSR), and hardware-accelerated CSS/Motion transforms. We strictly benchmark all production releases against Google Lighthouse v12 (targeting 95+ scores), sub-800ms Time-to-First-Byte (TTFB), and zero layout shift (CLS < 0.05) to ensure buttery 60fps responsiveness across both flagship laptops and entry-level mobile devices.",
    category: "performance",
    tag: "60fps Mobile Guarantee"
  },
  {
    q: "Do we retain 100% intellectual property (IP) and full source code ownership?",
    a: "Yes, absolutely 100%. Upon project milestone sign-off, full copyright and intellectual property rights are unconditionally transferred to your organization. You receive the complete Git repository, Docker containers, automated CI/CD pipeline scripts, database migration schemas, and comprehensive developer documentation. Zero vendor lock-in, zero hidden royalty fees.",
    category: "ip",
    tag: "100% IP Ownership"
  },
  {
    q: "What official credentials and certifications back MONIX Software Solutions?",
    a: "MONIX Software Solutions is an officially registered enterprise under the Ministry of Micro, Small & Medium Enterprises (MSME), Government of India (UDYAM registered). All corporate contracts, commercial invoices, enterprise SLAs, and student academic credentials comply strictly with Indian statutory standards and international legal requirements.",
    category: "msme",
    tag: "Govt. MSME Credentials"
  },
  {
    q: "What is covered under the post-launch warranty and ongoing maintenance SLA?",
    a: "Every engagement includes our 30-Day Comprehensive Post-Launch Warranty covering zero-cost critical bug triage, cloud infrastructure monitoring, security patch deployments, and minor UX adjustments. For enterprise clients, we offer extended SLA packages with guaranteed < 2-hour response windows, uptime monitoring, and priority technical support.",
    category: "warranty",
    tag: "Post-Launch Warranty"
  },
  {
    q: "How do you protect confidential project specifications and proprietary data?",
    a: "We execute bilateral Non-Disclosure Agreements (NDAs) prior to technical discovery. All infrastructure utilizes 256-Bit SSL/TLS 1.3 encryption, role-based access control (RBAC), OWASP-compliant API proxies, and HIPAA-ready architectural patterns for sensitive data pipelines. Your code, client data, and proprietary models are never used to train public AI datasets.",
    category: "general",
    tag: "Security & NDA"
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Questions' },
  { id: 'timelines', label: 'Timelines & Sprints' },
  { id: 'performance', label: '60fps Mobile' },
  { id: 'ip', label: 'IP Ownership' },
  { id: 'msme', label: 'MSME Registered' },
  { id: 'warranty', label: 'Warranty & SLA' },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ lang = 'en', onOpenInquiry }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      const matchesQuery = 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [activeTab, searchQuery]);

  return (
    <section id="faq" className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#07090E] py-8 sm:py-12 lg:py-16 snap-section border-t border-white/10 selection:bg-[#00F2FE]/30 selection:text-white">
      {/* Background Cyber Glow & Grid */}
      <div className="absolute inset-0 cyber-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#6366F1]/10 via-[#00F2FE]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-2 sm:py-3 lg:py-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-3 lg:mb-4 space-y-1 sm:space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#111827]/80 border border-[#00F2FE]/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.12)]">
            <HelpCircle className="w-3 h-3 text-[#00F2FE]" />
            <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-[#00F2FE]">
              Enterprise Clarity & Transparency
            </span>
          </div>

          <h2 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-black text-[#F8FAFC] tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-sky-300 to-[#6366F1]">Questions</span>
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto line-clamp-1">
            Everything you need to know about our engineering milestones, 60fps mobile guarantee, IP ownership, and post-launch SLAs.
          </p>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="mb-2.5 sm:mb-3.5 space-y-1.5 sm:space-y-2">
          {/* Quick Search Input */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keywords (e.g. 60fps, IP, SLA)..."
              className="w-full pl-8 pr-4 py-1.5 sm:py-2 rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/10 text-xs text-[#F8FAFC] placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE]/50 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setOpenIndex(0);
                }}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#00F2FE]/15 border border-[#00F2FE]/50 text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                    : 'bg-[#111827]/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List with Scrollable Container on 100dvh */}
        <div className="max-h-[38vh] sm:max-h-[42vh] overflow-y-auto pr-1 space-y-2 sm:space-y-2.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-6 rounded-xl bg-[#111827]/40 border border-white/10">
              <p className="text-slate-400 text-xs">No questions match your query "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="mt-2 text-[11px] text-[#00F2FE] hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={`${faq.category}-${idx}`}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#111827]/85 border-[#00F2FE]/40 shadow-[0_10px_35px_-10px_rgba(0,242,254,0.15)] ring-1 ring-[#00F2FE]/20'
                      : 'bg-[#111827]/60 backdrop-blur-xl border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-2.5 sm:p-3.5 text-left flex items-center justify-between gap-3 cursor-pointer focus:outline-none group"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen 
                          ? 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40' 
                          : 'bg-white/5 text-slate-400 group-hover:text-white border border-white/10'
                      }`}>
                        {faq.category === 'timelines' && <Clock className="w-3.5 h-3.5" />}
                        {faq.category === 'performance' && <Zap className="w-3.5 h-3.5" />}
                        {faq.category === 'ip' && <FileCode2 className="w-3.5 h-3.5" />}
                        {faq.category === 'msme' && <Award className="w-3.5 h-3.5" />}
                        {faq.category === 'warranty' && <ShieldCheck className="w-3.5 h-3.5" />}
                        {faq.category === 'general' && <Lock className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-0.5">
                        <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-[#00F2FE] font-semibold">
                          {faq.tag}
                        </span>
                        <h3 className="font-sans text-xs sm:text-sm font-bold text-[#F8FAFC] group-hover:text-[#00F2FE] transition-colors leading-snug">
                          {faq.q}
                        </h3>
                      </div>
                    </div>

                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-[#00F2FE]/20 text-[#00F2FE] rotate-180' : 'bg-white/5 text-slate-400 group-hover:text-white'
                    }`}>
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/10">
                          <p className="pt-1">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Fast Action Prompt */}
        <div className="mt-2.5 sm:mt-3.5 p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#111827]/90 via-[#111827]/70 to-[#07090E] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <div className="space-y-0.5">
            <h4 className="font-semibold text-xs text-[#F8FAFC] flex items-center justify-center sm:justify-start space-x-1.5">
              <Sparkles className="w-3 h-3 text-[#00F2FE]" />
              <span>Have a complex architecture requirement or custom timeline?</span>
            </h4>
            <p className="text-[10px] text-slate-400">
              Speak directly with our principal engineers under full NDA protection.
            </p>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              const el = document.getElementById('contact') || document.getElementById('executive-contact');
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
              } else if (onOpenInquiry) {
                e.preventDefault();
                onOpenInquiry('Enterprise Project');
              }
            }}
            className="w-full sm:w-auto shrink-0 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00F2FE] to-[#6366F1] text-slate-950 font-bold text-xs hover:opacity-90 transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Request SLA Technical Discovery</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );

};

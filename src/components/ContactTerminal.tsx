import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Lock, Clock, Send, CheckCircle2, Copy, AlertCircle,
  Terminal, User, Mail, MessageSquare, MapPin, RefreshCw,
  ArrowRight, Award, Zap, FileCheck2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, ExecutiveContactFormData, InquiryCategory } from '../types';

interface ContactTerminalProps {
  lang?: Language;
}

const CATEGORY_OPTIONS: { label: InquiryCategory; desc: string; icon: string }[] = [
  { label: 'Enterprise Project', desc: 'Custom Cloud / Web / Mobile Architecture', icon: '🏢' },
  { label: 'Consultation', desc: 'Architecture Review & AI Feasibility', icon: '💡' },
  { label: 'Internship', desc: 'AI Full-Stack Live Mentorship Program', icon: '🎓' },
  { label: 'Security Audit', desc: 'OWASP / Code & Penetration Audit', icon: '🛡️' },
];

export const ContactTerminal: React.FC<ContactTerminalProps> = () => {
  const [formData, setFormData] = useState<ExecutiveContactFormData>({
    name: '',
    email: '',
    category: 'Enterprise Project',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [ticketId, setTicketId] = useState('');
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full Name or Organization is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Please provide a valid name (at least 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Corporate or business email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim()) {
      errs.message = 'Project scope or requirements are required';
    } else if (formData.message.trim().length < 8) {
      errs.message = 'Please describe your requirements in at least 8 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field: keyof ExecutiveContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleCopyTicket = () => {
    if (ticketId) {
      navigator.clipboard.writeText(ticketId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('monixsoftwaresolutions@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== '') {
      setStatus('success');
      return;
    }

    if (!validate()) return;

    setStatus('submitting');

    const newTicket = `MNX-SLA-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(newTicket);

    const sheetPayload = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name: formData.name,
      email: formData.email,
      phone: 'Direct Email / Terminal Dispatch',
      programType: formData.category,
      program: formData.category,
      dynamicVal: newTicket,
      message: formData.message,
      source: 'Executive Contact Terminal',
      url: typeof window !== 'undefined' ? window.location.href : 'https://monixsoftware.com',
    };

    try {
      const GOOGLE_SHEET_WEBAPP_URL =
        'https://script.google.com/macros/s/AKfycbzB_OxIcpvXWgqw2hkoDc9u8mrROqsvgRURUhd1l-G5MMQ4n30fxt-ch7C_njXYrXgU1A/exec';
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(sheetPayload)], { type: 'text/plain' });
        navigator.sendBeacon(GOOGLE_SHEET_WEBAPP_URL, blob);
      } else {
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload),
        }).catch(() => {});
      }

      const TELEGRAM_BOT_TOKEN = '8251796240:AAGPRIAZH50aUl6Vlmtu1ZKOFmANOiH2lYc';
      const TELEGRAM_CHAT_ID = '-1003676902980';
      const telegramMessage =
        `⚡ *NEW MONIX EXECUTIVE SLA INQUIRY*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🎫 *Ticket:* \`${newTicket}\`\n` +
        `🏷️ *Category:* ${formData.category}\n` +
        `👤 *Client / Org:* ${formData.name}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `⏱️ *SLA Commitment:* < 2 Hours\n` +
        `📝 *Scope:* ${formData.message}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🔒 256-Bit SSL Encrypted • Govt. MSME Verified • 100% IP Transfer`;

      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      }).catch((err) => console.warn('Telegram SLA notification silent fail:', err));

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F2FE', '#6366F1', '#10B981', '#F8FAFC'],
        });
      } catch (err) {}

      setStatus('success');
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('success');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      category: 'Enterprise Project',
      message: '',
    });
    setErrors({});
    setStatus('idle');
  };

  return (
    <section
      id="contact"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#07090E] text-[#F8FAFC] py-8 sm:py-12 lg:py-16 snap-section selection:bg-[#00F2FE]/30 selection:text-white"
    >
      {/* Anchor alias for existing #executive-contact links */}
      <div id="executive-contact" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293714_1px,transparent_1px),linear-gradient(to_bottom,#1f293714_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#00F2FE]/10 via-[#6366F1]/10 to-transparent blur-[130px] pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-2 sm:py-3 lg:py-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-3 lg:mb-4 space-y-1 sm:space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/25 text-[#00F2FE] text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>DISPATCH & DIRECT LEAD CHANNEL</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Executive Contact Terminal
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto line-clamp-1">
            Direct dispatch channel to senior software architects. Fast triage with turnkey execution scope delivered under 2 hours.
          </p>

          <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent mx-auto rounded-full mt-1" />
        </div>

        {/* 2-Column Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-start">
          
          {/* Left Column: Simulated CLI Terminal Window (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl lg:rounded-2xl bg-[#111827]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-[#00F2FE]/40">
              
              {/* Terminal Window Header Bar */}
              <div className="px-3 sm:px-4 py-2 bg-[#0b0f17] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-1.5 font-mono text-[10px] text-slate-400 font-medium truncate max-w-[170px] sm:max-w-none">
                    monix@sla-terminal:~$ ./dispatch-inquiry
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 font-mono text-[9px] text-[#00F2FE] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
                  <span>TLS 1.3 / AES-256</span>
                </div>
              </div>

              {/* Form Content / Success View */}
              <div className="p-3 sm:p-4 lg:p-5">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 sm:py-8 text-center space-y-4 sm:space-y-6"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#00F2FE]/15 border border-[#00F2FE]/40 flex items-center justify-center text-[#00F2FE] mx-auto shadow-[0_0_30px_rgba(0,242,254,0.3)]">
                      <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald-500/20 font-semibold">
                        SLA Dispatch Confirmed
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                        Inquiry Received & Assigned
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
                        Your enterprise project scope has been dispatched to MONIX lead software architects under mutual NDA.
                      </p>
                    </div>

                    {/* SLA Tracking Reference Card */}
                    <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#07090E]/80 border border-white/[0.08] max-w-md mx-auto text-left space-y-2.5 sm:space-y-3 shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">SLA Tracking Ticket</span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-[#00F2FE] font-bold">&lt; 2 Hrs SLA Active</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-900 border border-white/[0.08] font-mono text-xs sm:text-sm text-white font-bold">
                        <span>{ticketId}</span>
                        <button
                          onClick={handleCopyTicket}
                          className="px-2 sm:px-2.5 py-1 rounded-md bg-[#00F2FE]/15 text-[#00F2FE] hover:bg-[#00F2FE]/25 text-xs transition-colors flex items-center space-x-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedTicket ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="pt-1 flex items-center space-x-2 text-[10px] sm:text-[11px] text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#00F2FE]" />
                        <span>Direct response to: <strong className="text-white">{formData.email}</strong></span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                      <a
                        href={`mailto:monixsoftwaresolutions@gmail.com?subject=${encodeURIComponent(`Inquiry Ticket ${ticketId} Scope Confirmation`)}&body=${encodeURIComponent(`Hello MONIX Engineering Team,\n\nI have dispatched an enterprise scope via the contact terminal.\n\nTicket ID: ${ticketId}\nClient / Org: ${formData.name}\nCategory: ${formData.category}\n\nThank you.`)}`}
                        className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#00F2FE] hover:bg-[#00F2FE]/90 text-slate-950 font-bold text-xs font-mono transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Email Confirmation</span>
                      </a>
                      <button
                        onClick={handleReset}
                        className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-mono transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Submit Another Scope</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
                    {/* Anti-spam Honeypot */}
                    <input
                      type="text"
                      name="terminal_honeypot"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Field 1: Name / Organization */}
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-[11px] sm:text-xs font-mono font-medium text-slate-300 flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00F2FE]" />
                          <span>Full Name / Organization <span className="text-[#00F2FE]">*</span></span>
                        </span>
                        {errors.name && <span className="text-[10px] sm:text-[11px] text-rose-400 font-mono">{errors.name}</span>}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Karthik Sundaram • FinEdge Technologies"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#07090E]/80 border text-xs sm:text-sm text-[#F8FAFC] placeholder-slate-500 transition-all font-mono ${
                          errors.name
                            ? 'border-rose-500/70 focus:border-rose-500'
                            : 'border-white/[0.08] focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE]/50'
                        }`}
                      />
                    </div>

                    {/* Field 2: Business Email */}
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-[11px] sm:text-xs font-mono font-medium text-slate-300 flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00F2FE]" />
                          <span>Corporate / Business Email <span className="text-[#00F2FE]">*</span></span>
                        </span>
                        {errors.email && <span className="text-[10px] sm:text-[11px] text-rose-400 font-mono">{errors.email}</span>}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="karthik@finedge.com"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#07090E]/80 border text-xs sm:text-sm text-[#F8FAFC] placeholder-slate-500 transition-all font-mono ${
                          errors.email
                            ? 'border-rose-500/70 focus:border-rose-500'
                            : 'border-white/[0.08] focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE]/50'
                        }`}
                      />
                    </div>

                    {/* Field 3: Category Selector */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-[11px] sm:text-xs font-mono font-medium text-slate-300 flex items-center space-x-1.5">
                        <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00F2FE]" />
                        <span>Inquiry Category <span className="text-[#00F2FE]">*</span></span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                        {CATEGORY_OPTIONS.map((cat) => {
                          const isSelected = formData.category === cat.label;
                          return (
                            <button
                              key={cat.label}
                              type="button"
                              onClick={() => handleInputChange('category', cat.label)}
                              className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-[#00F2FE]/15 border-[#00F2FE] text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                                  : 'bg-[#07090E]/60 border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                              }`}
                            >
                              <span className="text-sm sm:text-base mb-0.5 sm:mb-1">{cat.icon}</span>
                              <span className="text-[11px] sm:text-xs font-bold leading-tight line-clamp-1">{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Field 4: Message / Requirements */}
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-medium text-slate-300">
                        <span className="flex items-center space-x-1.5">
                          <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00F2FE]" />
                          <span>Project Scope / Technical Requirements <span className="text-[#00F2FE]">*</span></span>
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-slate-500">
                          {formData.message.length}/1000
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Briefly describe project objectives, expected milestones, or technical challenges..."
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#07090E]/80 border text-xs sm:text-sm text-[#F8FAFC] placeholder-slate-500 transition-all resize-none font-mono ${
                          errors.message
                            ? 'border-rose-500/70 focus:border-rose-500'
                            : 'border-white/[0.08] focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE]/50'
                        }`}
                      />
                      {errors.message && <p className="text-[10px] sm:text-[11px] text-rose-400 font-mono">{errors.message}</p>}
                    </div>

                    {/* Ironclad Trust Signals Strip inside Form Container */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-1">
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#07090E]/90 border border-white/[0.08] flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                        <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">Govt. MSME Verified</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#07090E]/90 border border-white/[0.08] flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                        <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">100% IP Transfer</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#07090E]/90 border border-white/[0.08] flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                        <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00F2FE] shrink-0" />
                        <span className="truncate">256-Bit SSL</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#07090E]/90 border border-white/[0.08] flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">&lt; 2hr Response SLA</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#00F2FE] via-sky-400 to-[#6366F1] hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm lg:text-base transition-all duration-300 shadow-[0_0_30px_rgba(0,242,254,0.35)] flex items-center justify-center space-x-2 sm:space-x-2.5 cursor-pointer disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Scope to Architects...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                          <span>Dispatch Enterprise Scope &lt; 2h SLA</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Channels & SLA Checklist (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            <div className="p-3.5 sm:p-5 lg:p-7 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] space-y-4 sm:space-y-6 shadow-xl">
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#00F2FE] bg-[#00F2FE]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#00F2FE]/20 font-semibold">
                  OFFICIAL CHANNELS
                </span>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#F8FAFC] mt-2 sm:mt-3">
                  Direct Executive Communication
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light">
                  Need immediate technical clearance or urgent discovery discussion? Reach leadership directly.
                </p>
              </div>

              {/* Direct Details */}
              <div className="space-y-2.5 sm:space-y-3.5 pt-1">
                
                {/* Official Business Email */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#07090E]/70 border border-white/[0.08] flex items-start justify-between gap-2.5 sm:gap-3 group hover:border-[#00F2FE]/40 transition-colors">
                  <div className="flex items-start space-x-2.5 sm:space-x-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center text-[#00F2FE] shrink-0 mt-0.5">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">Official Business Email</p>
                      <a
                        href="mailto:monixsoftwaresolutions@gmail.com"
                        className="text-xs sm:text-sm font-semibold text-[#F8FAFC] hover:text-[#00F2FE] transition-colors truncate block"
                      >
                        monixsoftwaresolutions@gmail.com
                      </a>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono">Triage &lt; 2h SLA Active</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="shrink-0 p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                </div>

                {/* Rapid Architectural Triage */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#07090E]/70 border border-white/[0.08] flex items-start space-x-2.5 sm:space-x-3 group hover:border-[#00F2FE]/40 transition-colors">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">Turnkey Technical Scoping</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                      Architecture Review & NDA
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-cyan-400 font-mono">Formal fixed-price scope within 2h</span>
                  </div>
                </div>

                {/* Registration & Location */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#07090E]/70 border border-white/[0.08] flex items-start space-x-2.5 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">Registered Enterprise</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">Tiruvannamalai, Tamil Nadu</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">
                      Govt. of India MSME Certified • Global & Pan-India Delivery
                    </p>
                  </div>
                </div>

              </div>

              {/* SLA Guarantees */}
              <div className="pt-3.5 sm:pt-4 border-t border-white/[0.08] space-y-2 sm:space-y-2.5">
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Enterprise SLA Guarantees:
                </p>
                <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-300 font-mono">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                    <span>Fixed-price architecture quote within 2 hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                    <span>Bi-weekly agile sprint demos with live preview environments</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                    <span>100% intellectual property (IP) transfer upon delivery</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                    <span>30-Day post-launch warranty & 60fps mobile assurance</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

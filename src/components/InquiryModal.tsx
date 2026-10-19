import React, { useState, useEffect } from 'react';
import { 
  X, Check, Upload, Sparkles, Send, ShieldCheck, ArrowRight, ArrowLeft, 
  Copy, FileText, AlertCircle, MessageCircle, Lock, RefreshCw, Trash2,
  Award, Clock, CheckCircle2, Zap, Star, PartyPopper, Mail, User, Phone,
  Layers, ChevronRight, Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, InquiryFormData } from '../types';
import { translations } from '../data/translations';
import { WEB_CATEGORIES, MOBILE_CATEGORIES, INTERNSHIP_PROGRAMS, PROJECT_CATEGORIES } from '../data/content';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedService?: string;
  preselectedCategory?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  captcha?: string;
  requirement?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedService = 'Website Development',
  preselectedCategory = '',
}) => {
  const t = translations[lang];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  // Math Captcha for Anti-Spam
  const [captchaNum1, setCaptchaNum1] = useState(7);
  const [captchaNum2, setCaptchaNum2] = useState(4);
  const [userCaptcha, setUserCaptcha] = useState('');
  
  // Honeypot field (hidden for human users)
  const [honeypot, setHoneypot] = useState('');

  // Extended Form State with Timeline
  const [formData, setFormData] = useState<InquiryFormData & { timeline?: string }>({
    name: '',
    phone: '',
    email: '',
    service: preselectedService,
    category: preselectedCategory || WEB_CATEGORIES[0],
    budget: '₹4,999 - ₹10,000 (Standard)',
    requirement: '',
    documentName: '',
    timeline: 'Standard (1 - 2 Weeks)',
  });

  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset or initialize state on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      setSubmitting(false);
      setErrors({});
      setRefId('');
      setCopied(false);

      // Generate random captcha
      const num1 = Math.floor(Math.random() * 8) + 2;
      const num2 = Math.floor(Math.random() * 8) + 1;
      setCaptchaNum1(num1);
      setCaptchaNum2(num2);
      setUserCaptcha('');
      setHoneypot('');

      setFormData({
        name: '',
        phone: '',
        email: '',
        service: preselectedService || 'Website Development',
        category: preselectedCategory || WEB_CATEGORIES[0],
        budget: preselectedService === 'Mobile Applications' ? '₹7,999 - ₹15,000' : '₹4,999 - ₹10,000',
        requirement: '',
        documentName: '',
        timeline: 'Standard (1 - 2 Weeks)',
      });
      setUploadedFile(null);
    }
  }, [isOpen, preselectedService, preselectedCategory]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters)';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit WhatsApp number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid corporate or business email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: FormErrors = {};

    // Validate Captcha
    const expectedSum = captchaNum1 + captchaNum2;
    if (parseInt(userCaptcha.trim(), 10) !== expectedSum) {
      newErrors.captcha = `Incorrect verification. What is ${captchaNum1} + ${captchaNum2}?`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: digitsOnly });
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handleServiceChange = (service: string) => {
    let defaultCat = '';
    let defaultBudget = '₹4,999 - ₹10,000';

    if (service === 'Website Development') {
      defaultCat = WEB_CATEGORIES[0];
      defaultBudget = '₹4,999 - ₹10,000';
    } else if (service === 'Mobile Applications') {
      defaultCat = MOBILE_CATEGORIES[0];
      defaultBudget = '₹7,999 - ₹15,000';
    } else if (service === 'AI Internship') {
      defaultCat = INTERNSHIP_PROGRAMS[0];
      defaultBudget = 'Student Internship Package';
    } else if (service === 'Academic Projects') {
      defaultCat = PROJECT_CATEGORIES[0];
      defaultBudget = 'Student Package (IEEE Major)';
    }

    setFormData({
      ...formData,
      service,
      category: defaultCat,
      budget: defaultBudget,
    });
  };

  const getCategoryOptions = () => {
    switch (formData.service) {
      case 'Website Development':
        return WEB_CATEGORIES;
      case 'Mobile Applications':
        return MOBILE_CATEGORIES;
      case 'AI Internship':
        return INTERNSHIP_PROGRAMS;
      case 'Academic Projects':
        return PROJECT_CATEGORIES;
      default:
        return WEB_CATEGORIES;
    }
  };

  const appendRequirementTag = (tag: string) => {
    const current = formData.requirement.trim();
    if (!current) {
      setFormData({ ...formData, requirement: `Included: ${tag}` });
    } else if (!current.includes(tag)) {
      setFormData({ ...formData, requirement: `${current}\n• ${tag}` });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadedFile({
        name: file.name,
        size: `${fileSizeInMB} MB`,
        type: file.type || 'Document'
      });
      setFormData({ ...formData, documentName: file.name });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadedFile({
        name: file.name,
        size: `${fileSizeInMB} MB`,
        type: file.type || 'Document'
      });
      setFormData({ ...formData, documentName: file.name });
    }
  };

  const fireGrandCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#00F2FE', '#38BDF8', '#6366F1', '#10B981', '#F59E0B']
      });
    } catch {
      // Safe fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== '') {
      setSubmitted(true);
      return;
    }

    // Rate Limiting Cooldown Check (30 seconds)
    const lastSubTime = localStorage.getItem('monix_last_inquiry_time');
    if (lastSubTime) {
      const elapsed = Date.now() - parseInt(lastSubTime, 10);
      if (elapsed < 30000) {
        const remainingSecs = Math.ceil((30000 - elapsed) / 1000);
        setErrors(prev => ({
          ...prev,
          captcha: `Rate limit active: Please wait ${remainingSecs}s before sending another inquiry.`
        }));
        return;
      }
    }

    if (!validateStep3()) return;

    localStorage.setItem('monix_last_inquiry_time', Date.now().toString());
    setSubmitting(true);

    const generatedId = `MONIX-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedId);

    // Telegram & Google Sheet Dispatch Configuration
    const TELEGRAM_BOT_TOKEN = "8251796240:AAGPRIAZH50aUl6Vlmtu1ZKOFmANOiH2lYc";
    const TELEGRAM_CHAT_ID = "-1003676902980";
    const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzB_OxIcpvXWgqw2hkoDc9u8mrROqsvgRURUhd1l-G5MMQ4n30fxt-ch7C_njXYrXgU1A/exec";
    const GOOGLE_SHEET_VIEW_URL = "https://docs.google.com/spreadsheets/d/1TTbSQXCOWDICz3EZw_E8BeQdWI17oyonYGyZlS-jGI4/edit?usp=sharing";

    const escapeHtml = (str: string) => (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 1. Dispatch to Google Sheet Web App
    const sheetPayload = {
      ticketId: generatedId,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      programType: formData.category || formData.service || "General Inquiry",
      program: formData.service || formData.category || "General Inquiry",
      dynamicVal: `[Ticket: ${generatedId}] ` + (formData.budget || ""),
      message: `Inquiry Ticket Ref: ${generatedId} | Details: ${formData.requirement || "None"}`,
      source: `Inquiry Modal (${generatedId})`,
      url: window.location.href
    };

    try {
      const payloadString = JSON.stringify(sheetPayload);
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([payloadString], { type: 'text/plain;charset=utf-8' });
        navigator.sendBeacon(GOOGLE_SHEET_WEBAPP_URL, blob);
      } else {
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: payloadString
        }).catch(() => {});
      }
    } catch {
      // Safe fallback
    }

    // 2. Dispatch to Telegram Bot
    const telegramText = `
🌟 <b>New Website Enquiry Received!</b> 🌟
━━━━━━━━━━━━━━━━━━
🎫 <b>Inquiry Reference Ticket ID:</b> <code>${generatedId}</code>
📝 <b>Source / Category:</b> ${escapeHtml(formData.category || formData.service)}
💼 <b>Service / Program:</b> ${escapeHtml(formData.service || formData.category)}
✏️ <b>Target Timeline:</b> ${escapeHtml(formData.timeline || 'Standard')}
👤 <b>Client Name:</b> ${escapeHtml(formData.name)}
📞 <b>WhatsApp Phone:</b> +91 ${escapeHtml(formData.phone)}
📧 <b>Email Address:</b> ${escapeHtml(formData.email)}
💰 <b>Estimated Budget:</b> ${escapeHtml(formData.budget)}
🕒 <b>Time (IST):</b> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
📊 <b>Google Sheet:</b> <a href="${GOOGLE_SHEET_VIEW_URL}">Open Leads Database ↗</a>
━━━━━━━━━━━━━━━━━━
    `.trim();

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramText,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    }).catch(err => console.error('Telegram notification dispatch error:', err));

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      fireGrandCelebration();
    }, 1200);
  };

  const copyRefId = () => {
    if (refId) {
      navigator.clipboard.writeText(refId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buildEmailUrl = () => {
    const text = encodeURIComponent(
      `Hello MONIX Team!\n\nI have submitted an official inquiry on your website.\n\nTicket ID: ${refId}\nClient Name: ${formData.name}\nService: ${formData.service}\nCategory: ${formData.category}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline || 'Standard'}\n\nPlease share the formal quotation and execution milestones.`
    );
    return `mailto:monixsoftwaresolutions@gmail.com?subject=${encodeURIComponent(`Inquiry Scope [${refId}]: ${formData.service}`)}&body=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090D16]/95 rounded-3xl border border-cyan-500/30 shadow-[0_0_60px_rgba(0,242,254,0.18),0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden my-4 sm:my-8 backdrop-blur-2xl">
        
        {/* Top Multi-Stop Neon Gradient Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-[#00F2FE] via-sky-400 to-[#6366F1] shadow-[0_0_15px_rgba(0,242,254,0.8)]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.2)]">
              <Sparkles className="w-5 h-5 text-[#00F2FE]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-sans text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight">
                  {t.modalTitle}
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] font-mono text-cyan-300 font-semibold">
                  2h SLA Triage
                </span>
              </div>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                {t.modalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Inquiry Dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cyber Telemetry Step Indicator */}
        {!submitted && (
          <div className="bg-[#0B0F19]/90 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
            
            {/* Step 1 Pill */}
            <button
              type="button"
              onClick={() => step > 1 && setStep(1)}
              className={`flex items-center space-x-1.5 sm:space-x-2 transition-all ${
                step === 1
                  ? 'text-cyan-300 font-bold'
                  : step > 1
                  ? 'text-emerald-400 font-semibold cursor-pointer'
                  : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-lg text-[10px] font-black flex items-center justify-center transition-all ${
                step === 1
                  ? 'bg-gradient-to-r from-cyan-400 to-[#00F2FE] text-slate-950 shadow-[0_0_10px_rgba(0,242,254,0.5)]'
                  : step > 1
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-white/5 border border-white/10 text-slate-400'
              }`}>
                {step > 1 ? '✓' : '1'}
              </span>
              <span className="hidden xs:inline">{t.step1}</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />

            {/* Step 2 Pill */}
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className={`flex items-center space-x-1.5 sm:space-x-2 transition-all ${
                step === 2
                  ? 'text-cyan-300 font-bold'
                  : step > 2
                  ? 'text-emerald-400 font-semibold cursor-pointer'
                  : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-lg text-[10px] font-black flex items-center justify-center transition-all ${
                step === 2
                  ? 'bg-gradient-to-r from-cyan-400 to-[#00F2FE] text-slate-950 shadow-[0_0_10px_rgba(0,242,254,0.5)]'
                  : step > 2
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-white/5 border border-white/10 text-slate-400'
              }`}>
                {step > 2 ? '✓' : '2'}
              </span>
              <span className="hidden xs:inline">{t.step2}</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />

            {/* Step 3 Pill */}
            <div
              className={`flex items-center space-x-1.5 sm:space-x-2 transition-all ${
                step === 3 ? 'text-cyan-300 font-bold' : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-lg text-[10px] font-black flex items-center justify-center transition-all ${
                step === 3
                  ? 'bg-gradient-to-r from-cyan-400 to-[#00F2FE] text-slate-950 shadow-[0_0_10px_rgba(0,242,254,0.5)]'
                  : 'bg-white/5 border border-white/10 text-slate-400'
              }`}>
                3
              </span>
              <span className="hidden xs:inline">{t.step3}</span>
            </div>

          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            /* =========================================================
               GRAND CONFIRMED CELEBRATION STATE
               ========================================================= */
            <div className="text-center py-3 sm:py-5 space-y-5 animate-fade-in">
              
              {/* Floating Animated Cyber Badge */}
              <div className="relative inline-block">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 blur-lg opacity-75 animate-pulse" />
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-tr from-[#00F2FE] via-sky-400 to-[#6366F1] border-2 border-white/30 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto text-slate-950 shadow-2xl">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5] text-slate-950" />
                </div>
              </div>

              {/* Congratulatory Headline */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase">
                  <PartyPopper className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inquiry Successfully Registered</span>
                </div>
                
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  You're in the Priority Queue!
                </h4>
                
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>! Your inquiry for <strong className="text-[#00F2FE]">{formData.service}</strong> has been logged into our senior architect queue.
                </p>
              </div>

              {/* Official Ticket & Receipt Card */}
              <div className="bg-[#0B0F19] text-white rounded-2xl p-4 sm:p-5 border border-cyan-500/30 shadow-xl text-left max-w-lg mx-auto space-y-3.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#00F2FE] font-bold block">
                      Inquiry Reference Ticket
                    </span>
                    <span className="font-mono text-lg sm:text-xl font-black text-white tracking-widest">
                      {refId}
                    </span>
                  </div>
                  <button
                    onClick={copyRefId}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-cyan-500/30 rounded-xl text-xs font-mono font-bold text-cyan-300 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Client / Org</span>
                    <span className="font-bold text-slate-100 truncate block">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">WhatsApp Phone</span>
                    <span className="font-bold text-slate-100">+91 {formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Service & Scope</span>
                    <span className="font-bold text-cyan-300 truncate block">{formData.service} ({formData.category})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Estimated Budget</span>
                    <span className="font-bold text-emerald-400 truncate block">{formData.budget}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Response SLA: Within 2 Hours</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Assigned</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
                <a
                  href={buildEmailUrl()}
                  className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-cyan-400 via-sky-400 to-[#6366F1] hover:opacity-95 text-slate-950 rounded-xl font-bold text-xs sm:text-sm font-mono shadow-[0_0_20px_rgba(0,242,254,0.35)] flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>Send Direct Email Copy</span>
                </a>
                
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-xl font-bold text-xs sm:text-sm font-mono transition-all cursor-pointer"
                >
                  {t.closeModal}
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Bot Honeypot Field (Hidden) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {/* STEP 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-[#00F2FE]" />
                        <span>{t.fullName} <span className="text-[#00F2FE]">*</span></span>
                      </span>
                      {errors.name && <span className="text-[11px] text-rose-400 font-mono">{errors.name}</span>}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karthik Sundaram"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#0D1424] border text-xs sm:text-sm text-white placeholder-slate-500 transition-all font-mono ${
                        errors.name
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-white/10 focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE]/50'
                      }`}
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#00F2FE]" />
                        <span>WhatsApp Phone (10 Digits) <span className="text-[#00F2FE]">*</span></span>
                      </span>
                      {errors.phone && <span className="text-[11px] text-rose-400 font-mono">{errors.phone}</span>}
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-mono font-extrabold text-[#00F2FE]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full pl-12 pr-12 py-2.5 sm:py-3 rounded-xl bg-[#0D1424] border text-xs sm:text-sm text-white placeholder-slate-500 transition-all font-mono tracking-wider ${
                          errors.phone
                            ? 'border-rose-500/80 focus:border-rose-500'
                            : 'border-white/10 focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE]/50'
                        }`}
                      />
                      <span className="absolute right-3.5 text-[10px] font-mono text-slate-400">
                        {formData.phone.length}/10
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                      Direct quote & technical execution blueprint delivered instantly via WhatsApp.
                    </p>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#00F2FE]" />
                        <span>Corporate / Business Email <span className="text-[#00F2FE]">*</span></span>
                      </span>
                      {errors.email && <span className="text-[11px] text-rose-400 font-mono">{errors.email}</span>}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@organization.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#0D1424] border text-xs sm:text-sm text-white placeholder-slate-500 transition-all font-mono ${
                        errors.email
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-white/10 focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE]/50'
                      }`}
                    />
                  </div>

                  {/* Step 1 Action */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep1()) setStep(2);
                      }}
                      className="flex items-center space-x-2 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-400 via-sky-400 to-[#6366F1] text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-[0_0_20px_rgba(0,242,254,0.35)] cursor-pointer hover:opacity-95 transition-all font-mono"
                    >
                      <span>Proceed to Scope Selection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 2: Service & Scope Selection */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Service Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 block">
                      Primary Service Focus <span className="text-[#00F2FE]">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#0D1424] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE] font-mono"
                    >
                      <option value="Website Development">Website Development (From ₹4,999*)</option>
                      <option value="Mobile Applications">Mobile Applications (From ₹7,999*)</option>
                      <option value="AI Internship">AI Internship (100% Online & MSME Verified)</option>
                      <option value="Academic Projects">Academic & IEEE Major Projects</option>
                    </select>
                  </div>

                  {/* Category Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 block">
                      Specialized Domain / Track <span className="text-[#00F2FE]">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#0D1424] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE] font-mono"
                    >
                      {getCategoryOptions().map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget & Timeline Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300 block">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0D1424] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00F2FE] font-mono"
                      >
                        <option value="₹4,999 - ₹10,000 (Standard)">₹4,999 - ₹10,000 (Standard)</option>
                        <option value="₹10,000 - ₹25,000 (Professional)">₹10,000 - ₹25,000 (Professional)</option>
                        <option value="₹25,000 - ₹50,000 (Enterprise)">₹25,000 - ₹50,000 (Enterprise)</option>
                        <option value="₹50,000+ (Custom SaaS / ERP)">₹50,000+ (Custom SaaS / ERP)</option>
                        <option value="Student Internship Package">Student Internship Package</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300 block">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0D1424] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00F2FE] font-mono"
                      >
                        <option value="Standard (1 - 2 Weeks)">Standard (1 - 2 Weeks)</option>
                        <option value="Express Priority (3 - 5 Days)">Express Priority (3 - 5 Days)</option>
                        <option value="Urgent Delivery (48 Hours)">Urgent Delivery (48 Hours)</option>
                        <option value="Flexible Schedule">Flexible Schedule</option>
                      </select>
                    </div>

                  </div>

                  {/* Step 2 Actions */}
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-mono font-bold text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 rounded-xl cursor-pointer transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-[#6366F1] text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-[0_0_20px_rgba(0,242,254,0.35)] cursor-pointer hover:opacity-95 transition-all font-mono"
                    >
                      <span>Proceed to Step 3</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 3: Requirements, File Upload & Security Captcha */}
              {step === 3 && (
                <div className="space-y-3.5 animate-fade-in">
                  
                  {/* Requirement Details */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        {t.reqDescription}
                      </label>
                      <span className="text-[10px] text-cyan-400 font-mono">Tap chips to add scope</span>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Describe key features, reference links, technical goals or deadlines..."
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1424] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] resize-none font-mono"
                    />

                    {/* Quick Requirement Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {[
                        'Payment Gateway Integration',
                        '60fps Mobile Ready',
                        'Admin Dashboard',
                        'SEO & Fast Loading',
                        'Gemini AI Assistant'
                      ].map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => appendRequirementTag(chip)}
                          className="px-2 py-0.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/25 rounded-md text-[10px] font-mono transition-colors cursor-pointer"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Drag and Drop File Upload Area */}
                  <div>
                    <label className="text-xs font-mono font-bold text-slate-300 block mb-1">
                      {t.uploadDoc}
                    </label>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-3 text-center transition-all relative ${
                        isDragging
                          ? 'border-cyan-400 bg-cyan-500/15'
                          : 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-400'
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.zip"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      
                      {uploadedFile ? (
                        <div className="flex items-center justify-between bg-[#0D1424] p-2 rounded-lg border border-cyan-500/30 text-xs font-mono">
                          <div className="flex items-center space-x-2 text-left truncate">
                            <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                            <div className="truncate max-w-[220px]">
                              <p className="font-bold text-white truncate">{uploadedFile.name}</p>
                              <p className="text-[9px] text-slate-400">{uploadedFile.size}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedFile(null);
                              setFormData({ ...formData, documentName: '' });
                            }}
                            className="p-1 rounded-md text-rose-400 hover:bg-rose-500/10 z-20 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-4 h-4 text-[#00F2FE] mx-auto mb-1" />
                          <p className="text-xs font-mono font-bold text-slate-200">
                            Drag & Drop reference file or <span className="text-[#00F2FE] underline">browse</span>
                          </p>
                          <p className="text-[9px] font-mono text-slate-500 mt-0.5">PDF, DOCX, ZIP, PNG, JPG (Max 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Anti-Spam Security Captcha */}
                  <div className="bg-[#0D1424] p-2.5 sm:p-3 rounded-xl border border-cyan-500/25 flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-200">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Security Verification: What is <strong className="text-[#00F2FE] text-sm font-bold">{captchaNum1} + {captchaNum2}</strong>?</span>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Answer"
                      value={userCaptcha}
                      onChange={(e) => {
                        setUserCaptcha(e.target.value);
                        if (errors.captcha) setErrors({ ...errors, captcha: undefined });
                      }}
                      className="w-20 px-2.5 py-1 rounded-lg bg-[#07090E] border border-cyan-500/40 text-center font-bold text-white text-xs font-mono focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                  {errors.captcha && <p className="text-xs text-rose-400 font-mono flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.captcha}</p>}

                  {/* Summary Confirmation Pill */}
                  <div className="bg-[#0B0F19] text-white p-3 rounded-xl text-xs font-mono space-y-1 border border-white/10">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1 text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                      <span>Pre-Dispatch Telemetry</span>
                      <span className="text-emerald-400">Ready</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] sm:text-[11px] text-slate-300">
                      <p><span className="text-slate-500">Client:</span> {formData.name}</p>
                      <p><span className="text-slate-500">Phone:</span> +91 {formData.phone}</p>
                      <p><span className="text-slate-500">Service:</span> {formData.service}</p>
                      <p><span className="text-slate-500">Timeline:</span> {formData.timeline}</p>
                    </div>
                  </div>

                  {/* Step 3 Actions */}
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-mono font-bold text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 rounded-xl cursor-pointer transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center space-x-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-400 via-sky-400 to-[#6366F1] text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-[0_0_25px_rgba(0,242,254,0.4)] cursor-pointer hover:opacity-95 transition-all font-mono disabled:opacity-50"
                    >
                      {submitting ? (
                        <span className="flex items-center space-x-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generating Official Ticket...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>Submit Official Inquiry &lt; 2h SLA</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

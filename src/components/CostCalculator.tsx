import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Send, ShieldCheck, Zap, Clock, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface CostCalculatorProps {
  lang?: Language;
  onOpenInquiryWithEstimate?: (service: string, details: string) => void;
}

type ServiceCategoryKey = 'web' | 'mobile' | 'internship' | 'project';
type ScaleTierKey = 'starter' | 'pro' | 'enterprise';

interface FeatureItem {
  id: string;
  name: string;
  price: number;
}

interface CategoryConfig {
  name: string;
  starter: { price: number; label: string };
  pro: { price: number; label: string };
  enterprise: { price: number; label: string };
  features: FeatureItem[];
}

const CATEGORY_CONFIGS: Record<ServiceCategoryKey, CategoryConfig> = {
  web: {
    name: 'Website Development',
    starter: { price: 4999, label: 'Starter Business Page' },
    pro: { price: 11999, label: 'Professional Corporate Portal' },
    enterprise: { price: 24999, label: 'Enterprise Custom SaaS Platform' },
    features: [
      { id: 'ecommerce', name: 'E-Commerce & Payment Gateway', price: 3500 },
      { id: 'ai', name: 'AI Chatbot & Smart Agent', price: 4000 },
      { id: 'admin', name: 'Custom Admin Dashboard (CMS)', price: 2500 },
      { id: 'multilang', name: 'Multi-Language Support (EN/TA)', price: 1500 },
      { id: 'seo', name: 'Google SEO & 100/100 Lighthouse', price: 1500 },
      { id: 'express', name: 'Priority 48-Hour Sprint Delivery', price: 3000 },
    ],
  },
  mobile: {
    name: 'Mobile Applications',
    starter: { price: 7999, label: 'Hybrid Mobile App' },
    pro: { price: 17999, label: 'Full Native iOS & Android App' },
    enterprise: { price: 34999, label: 'Enterprise Mobile Suite & Cloud APIs' },
    features: [
      { id: 'push', name: 'Real-Time Push Notification Engine', price: 2500 },
      { id: 'offline', name: 'Offline Data Sync & Encrypted Cache', price: 2000 },
      { id: 'maps', name: 'Google Maps & Live GPS Telemetry', price: 3500 },
      { id: 'store', name: 'Google Play & App Store Publishing', price: 3000 },
      { id: 'biometric', name: 'Biometric Security & Fingerprint Auth', price: 2000 },
      { id: 'analytics', name: 'In-App Telemetry & Usage Analytics', price: 1800 },
    ],
  },
  internship: {
    name: 'AI Internship',
    starter: { price: 1499, label: '1-Month Fast-Track AI Mentorship' },
    pro: { price: 2999, label: '2-Month Full-Stack AI & ML Program' },
    enterprise: { price: 4999, label: '3-Month Master Program + LOR & Verifiable Cert' },
    features: [
      { id: 'cert', name: 'Govt. MSME Verified Certificate', price: 500 },
      { id: 'lor', name: 'Official Recommendation Letter (LOR)', price: 600 },
      { id: 'mentor', name: '1-on-1 Direct Senior Lead Mentorship', price: 1000 },
      { id: 'paper', name: 'IEEE Research Paper Writing Guidance', price: 1200 },
      { id: 'resume', name: 'Tech Resume & GitHub Portfolio Review', price: 700 },
      { id: 'hosting', name: 'Live Cloud Project Deployment Support', price: 800 },
    ],
  },
  project: {
    name: 'IEEE & Academic Projects',
    starter: { price: 2999, label: 'Mini Project Code + Abstract + PPT' },
    pro: { price: 5999, label: 'Major IEEE Project + Full Code & Report' },
    enterprise: { price: 12999, label: 'Custom Research Project + Paper Publishing' },
    features: [
      { id: 'synopsis', name: 'Complete Project Synopsis & Viva PPT', price: 1000 },
      { id: 'execution', name: 'Live Code Execution & Explanation', price: 1500 },
      { id: 'paper_pub', name: 'Journal & IEEE Paper Writing Support', price: 2500 },
      { id: 'hardware', name: 'IoT / Hardware Sensor Integration', price: 3000 },
      { id: 'express_proj', name: 'Urgent 24-48h Sprint Delivery', price: 2000 },
      { id: 'plagiarism', name: 'Zero-Plagiarism Verified Report', price: 1200 },
    ],
  },
};

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  lang = 'en',
  onOpenInquiryWithEstimate,
}) => {
  const [serviceType, setServiceType] = useState<ServiceCategoryKey>('web');
  const [scale, setScale] = useState<ScaleTierKey>('pro');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['admin', 'seo']);

  const currentConfig = CATEGORY_CONFIGS[serviceType];

  const handleCategoryChange = (newType: ServiceCategoryKey) => {
    setServiceType(newType);
    setSelectedFeatures(CATEGORY_CONFIGS[newType].features.slice(0, 2).map((f) => f.id));
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const base = currentConfig[scale].price;
    const featuresCost = selectedFeatures.reduce((acc, featId) => {
      const feat = currentConfig.features.find((f) => f.id === featId);
      return acc + (feat ? feat.price : 0);
    }, 0);
    return base + featuresCost;
  };

  const totalEstimate = calculateTotal();

  const handleRequestQuote = () => {
    const featNames = selectedFeatures
      .map((fId) => currentConfig.features.find((item) => item.id === fId)?.name)
      .filter(Boolean)
      .join(', ');

    const tierObj = currentConfig[scale];
    const details = `Estimated Budget: ~ ₹${totalEstimate.toLocaleString('en-IN')} | Tier: ${scale.toUpperCase()} (${tierObj.label}) | Add-ons: ${featNames || 'None'}`;

    if (onOpenInquiryWithEstimate) {
      onOpenInquiryWithEstimate(currentConfig.name, details);
    }
  };

  return (
    <section id="pricing-calculator" className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#07090E] text-[#F8FAFC] py-8 sm:py-12 lg:py-16 snap-section">
      {/* Ambient Cyber Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293714_1px,transparent_1px),linear-gradient(to_bottom,#1f293714_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-[#00F2FE]/5 to-[#6366F1]/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-2 sm:py-3 lg:py-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-3 lg:mb-4 space-y-1 sm:space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/25 text-[#00F2FE] text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(0,242,254,0.12)]">
            <Calculator className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>INTERACTIVE ESTIMATION ENGINE</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Project Cost Calculator
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto line-clamp-1">
            Configure your technical scope, package tier, and add-ons for an instant, transparent architecture estimate.
          </p>

          <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent mx-auto rounded-full mt-1" />
        </div>

        {/* Calculator Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
          
          {/* Options Column (8 cols) */}
          <div className="lg:col-span-8 space-y-2 sm:space-y-3 p-3 sm:p-4 lg:p-4.5 rounded-xl lg:rounded-2xl bg-[#111827]/70 backdrop-blur-md border border-white/[0.08] shadow-[0_10px_35px_-15px_rgba(0,0,0,0.8)]">
            
            {/* Step 1: Service Category Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold text-[#00F2FE] uppercase tracking-wider flex items-center justify-between">
                <span>01. Select Category</span>
                <span className="text-[10px] text-slate-400 font-normal">Customized configurations</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {[
                  { id: 'web', name: 'Web Dev' },
                  { id: 'mobile', name: 'Mobile App' },
                  { id: 'internship', name: 'AI Internship' },
                  { id: 'project', name: 'IEEE Project' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCategoryChange(item.id as ServiceCategoryKey)}
                    className={`px-2.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer text-center ${
                      serviceType === item.id
                        ? 'bg-[#00F2FE]/15 text-[#00F2FE] border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                        : 'bg-[#07090E]/60 text-slate-400 border-white/[0.08] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Package Scale / Tier */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold text-[#00F2FE] uppercase tracking-wider flex items-center justify-between">
                <span>02. Select Package Scale</span>
                <span className="text-[10px] text-emerald-400 font-mono">Live Price Updates</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'starter', title: 'Starter', cfg: currentConfig.starter },
                  { id: 'pro', title: 'Pro (Popular)', cfg: currentConfig.pro },
                  { id: 'enterprise', title: 'Enterprise', cfg: currentConfig.enterprise },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setScale(tier.id as ScaleTierKey)}
                    className={`p-2.5 sm:p-3 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                      scale === tier.id
                        ? 'bg-[#00F2FE]/10 border-[#00F2FE] ring-1 ring-[#00F2FE]/40 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                        : 'bg-[#07090E]/60 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs sm:text-sm font-bold text-white">{tier.title}</span>
                        {scale === tier.id && <Check className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-400 font-light leading-tight line-clamp-1">{tier.cfg.label}</p>
                    </div>

                    <div className="mt-1.5 pt-1 border-t border-white/[0.06] text-[#00F2FE] text-[11px] sm:text-xs font-mono font-bold flex flex-wrap items-baseline justify-between gap-1">
                      <span>~ ₹{tier.cfg.price.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] text-slate-500 font-normal">(Approx)</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Features Toggles */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold text-[#00F2FE] uppercase tracking-wider flex items-center justify-between">
                <span>03. Architecture Add-ons</span>
                <span className="text-[10px] text-slate-400 font-normal">Click to toggle</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {currentConfig.features.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isChecked
                          ? 'bg-[#6366F1]/15 border-[#6366F1]/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                          : 'bg-[#07090E]/50 border-white/[0.06] text-slate-400 hover:border-white/20 hover:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 min-w-0 pr-1">
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-[#00F2FE] text-[#07090E]' : 'border border-slate-600'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span className="text-[11px] sm:text-xs font-medium truncate">{feat.name}</span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#00F2FE] shrink-0">
                        +₹{feat.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Estimate Summary Panel (4 cols) */}
          <div className="lg:col-span-4">
            <div className="p-3.5 sm:p-4 lg:p-5 rounded-xl lg:rounded-2xl bg-[#111827]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] space-y-2.5 sm:space-y-3.5">
              
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#00F2FE] bg-[#00F2FE]/10 px-2.5 py-0.5 rounded-full border border-[#00F2FE]/20 font-semibold">
                  DYNAMIC ESTIMATE
                </span>
                <p className="text-[11px] text-slate-400 mt-1.5 font-light">
                  Estimated budget based on your selected stack:
                </p>
                <div className="mt-1 flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
                    ₹{totalEstimate.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">*Approx</span>
                </div>
              </div>

              {/* Scope Breakdown */}
              <div className="p-2.5 rounded-xl bg-[#07090E]/70 border border-white/[0.06] space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-300 pb-1 border-b border-white/[0.06]">
                  <span className="truncate pr-2">{currentConfig.name} ({scale.toUpperCase()})</span>
                  <span className="text-[#00F2FE] shrink-0">₹{currentConfig[scale].price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400 pt-0.5">
                  <span>Add-ons ({selectedFeatures.length})</span>
                  <span className="text-[#00F2FE]">
                    +₹{selectedFeatures
                      .reduce((acc, fId) => acc + (currentConfig.features.find((f) => f.id === fId)?.price || 0), 0)
                      .toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* SLA & Security Trust Notes */}
              <div className="space-y-1 text-[10px] font-mono text-slate-400">
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-3 h-3 shrink-0" />
                  <span>256-Bit SSL Encrypted & NDA Protected</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#00F2FE]">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>Official Quote Delivered &lt; 2 Hours</span>
                </div>
              </div>

              {/* CTA Action Button */}
              <button
                onClick={handleRequestQuote}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00F2FE] via-sky-400 to-[#6366F1] hover:opacity-95 text-slate-950 font-bold text-xs transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Request Official Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );

};

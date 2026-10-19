import React from 'react';
import { Smartphone, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { MOBILE_CATEGORIES } from '../../data/content';

interface MobileAppsPageProps {
  lang: Language;
  onOpenInquiryWithCategory: (category: string) => void;
  onSelectCategoryDetail: (catTitle: string, serviceType: 'mobile') => void;
}

export const MobileAppsPage: React.FC<MobileAppsPageProps> = ({
  lang,
  onOpenInquiryWithCategory,
  onSelectCategoryDetail,
}) => {
  const t = translations[lang];

  const features = [
    "Android & iOS Dual Publishing", "Flutter & React Native Frameworks",
    "Real-time Push Notifications", "Integrated Payment Gateways",
    "Secure REST / GraphQL APIs", "Admin Control Web Dashboard",
    "Google Maps & GPS Location", "Offline Data Sync Capability",
    "Play Store & App Store Setup", "1 Month Post-Launch Maintenance"
  ];

  return (
    <div className="py-12 bg-[#07090E] text-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center max-w-5xl mx-auto space-y-6 border border-cyan-500/30 shadow-2xl bg-[#0B0F19]">
          <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=85" 
              alt="Mobile Application Hero Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=85";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/85 to-transparent"></div>
          
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md">
              <Smartphone className="w-4 h-4 text-[#00F2FE]" />
              <span>Mobile Engineering Suite</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Mobile Application Development
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              High-performance cross-platform mobile apps for Android and iOS designed with smooth 60fps micro-animations and secure cloud backends.
            </p>

            <div className="pt-2">
              <span className="inline-block font-mono text-xl sm:text-2xl font-extrabold text-[#00F2FE] px-6 py-2 bg-slate-900/90 border border-cyan-500/40 rounded-2xl shadow-xl shadow-cyan-500/20">
                {t.mobileAppPrice}
              </span>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">*Pricing depends upon requirements, platform target (Android/iOS) and API complexity.</p>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 text-center tracking-tight">
            Included Features Across Mobile Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs font-medium text-slate-300 bg-[#07090E]/80 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 22 Mobile Categories */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore Mobile App Categories
            </h2>
            <p className="text-xs text-slate-400 mt-1">Select a category for custom architecture specifications or a direct inquiry.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {MOBILE_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111827]/70 backdrop-blur-xl border border-white/10 hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#00F2FE] bg-[#00F2FE]/10 px-2.5 py-0.5 rounded-full uppercase border border-[#00F2FE]/20">
                      App #{idx + 1}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#00F2FE] opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#00F2FE] transition-colors mb-2">
                    {cat}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Designed for iOS & Android with high responsiveness, offline capabilities, and cloud database sync.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectCategoryDetail(cat, 'mobile')}
                    className="text-[11px] font-mono font-bold text-slate-400 hover:text-[#00F2FE] transition-colors cursor-pointer"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onOpenInquiryWithCategory(cat)}
                    className="px-3 py-1.5 bg-[#00F2FE]/15 hover:bg-[#00F2FE] text-[#00F2FE] hover:text-slate-950 font-bold rounded-lg text-xs border border-[#00F2FE]/40 transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MobileAppsPage;

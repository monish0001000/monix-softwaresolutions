import React from 'react';
import { Award, Zap, CheckCircle2, Globe, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface TrustMetricsGridProps {
  lang?: Language;
}

interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  badge?: string;
  icon: React.ElementType;
}

export const TrustMetricsGrid: React.FC<TrustMetricsGridProps> = ({ lang = 'en' }) => {
  const isTamil = lang === 'ta';

  const metrics: MetricItem[] = [
    {
      id: 'msme',
      value: 'MSME',
      label: isTamil ? 'அரசு அங்கீகாரம்' : 'Govt. MSME Certified',
      sublabel: isTamil ? 'இந்திய அரசு பதிவு பெற்ற நிறுவனம்' : 'Official Govt. of India Registered Enterprise',
      badge: 'UDYAM-TN-27',
      icon: Award,
    },
    {
      id: 'stack',
      value: '100/100',
      label: isTamil ? 'மின்னல் வேகம்' : 'Lighthouse Velocity',
      sublabel: isTamil ? 'நவீன Next.js 15 & React 19 கட்டமைப்பு' : 'Next.js 15 & React 19 Sub-Second Load',
      badge: 'Core Web Vitals',
      icon: Zap,
    },
    {
      id: 'pricing',
      value: '₹4,999*',
      label: isTamil ? 'தொடக்கக் கட்டணம்' : 'Starter Entry Point',
      sublabel: isTamil ? 'மலிவான மற்றும் வெளிப்படையான விலை' : 'Real-Time Affordable Industry Pricing',
      badge: 'Zero Hidden Fees',
      icon: CheckCircle2,
    },
    {
      id: 'delivery',
      value: 'Pan-India',
      label: isTamil ? 'நாடு முழுவதும்' : 'Pan-India & Global',
      sublabel: isTamil ? '28+ மாநிலங்கள் மற்றும் வெளிநாட்டு வாடிக்கையாளர்கள்' : 'Digital Deployment Across All States & Global',
      badge: 'Remote Turnkey',
      icon: Globe,
    },
    {
      id: 'sla',
      value: '< 2 Hours',
      label: isTamil ? 'உடனடி SLA தீர்வு' : 'Architect SLA Triage',
      sublabel: isTamil ? 'மூத்த தொழில்நுட்ப வல்லுநரின் உடனடி ஆலோசனை' : 'Direct Senior Architect Scope Clearance',
      badge: 'Guaranteed SLA',
      icon: Clock,
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#07090E] relative overflow-hidden border-y border-white/[0.08]">
      {/* Background Cyber Mesh & Subtle Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293714_1px,transparent_1px),linear-gradient(to_bottom,#1f293714_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[180px] bg-gradient-to-r from-[#00F2FE]/10 via-[#6366F1]/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Strip */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {metrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative p-3.5 sm:p-4 lg:p-5 rounded-xl lg:rounded-2xl bg-[#111827]/70 backdrop-blur-md border border-white/[0.08] hover:border-[#00F2FE]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)] flex flex-col justify-between"
              >
                {/* Top Row: Icon & Badge */}
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/25 flex items-center justify-center text-[#00F2FE] group-hover:scale-105 group-hover:bg-[#00F2FE]/20 transition-all duration-300">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-medium text-slate-400 bg-white/[0.04] px-1.5 sm:px-2 py-0.5 rounded-md border border-white/[0.06]">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Metric Value */}
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F8FAFC] tracking-tight group-hover:text-[#00F2FE] transition-colors duration-300 font-mono">
                    {item.value}
                  </p>
                  <p className="text-xs font-bold text-slate-200 mt-0.5 sm:mt-1 line-clamp-1">
                    {item.label}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-light mt-0.5 sm:mt-1 leading-snug">
                    {item.sublabel}
                  </p>
                </div>

                {/* Subtle Neon Underline on hover */}
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#00F2FE]/0 to-transparent group-hover:via-[#00F2FE]/80 transition-all duration-300 mt-2.5 sm:mt-3 rounded-full" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

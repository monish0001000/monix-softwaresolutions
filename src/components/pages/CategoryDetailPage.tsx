import React from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, Layers, Clock, ShieldCheck, Cpu, Send } from 'lucide-react';
import { Language, CategoryDetail } from '../../types';
import { CATEGORY_DETAILS_MAP } from '../../data/content';

interface CategoryDetailPageProps {
  categoryTitle: string;
  serviceType: 'web' | 'mobile' | 'internship' | 'projects';
  lang: Language;
  onBack: () => void;
  onOpenInquiry: (categoryTitle: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  categoryTitle,
  serviceType,
  lang,
  onBack,
  onOpenInquiry,
}) => {
  // Retrieve detailed category data or construct a fallback structure
  const detail: CategoryDetail = CATEGORY_DETAILS_MAP[categoryTitle] || {
    id: categoryTitle.toLowerCase().replace(/\s+/g, '-'),
    title: `${categoryTitle} Solutions`,
    parentService: serviceType,
    subtitle: `Custom, enterprise-grade ${categoryTitle} built by MONIX Software Solutions.`,
    overview: `Our ${categoryTitle} solution is engineered with cutting-edge technologies, security protocols, and mobile responsiveness. Tailored specifically to your operational requirements.`,
    priceTag: serviceType === 'web' ? 'Starting from ₹4,999*' : serviceType === 'mobile' ? 'Starting from ₹7,999*' : 'Custom Affordable Pricing',
    features: [
      'Custom UI/UX Design & Architecture',
      '100% Mobile & Tablet Responsive',
      'High Speed Optimization & SEO Ready',
      'Secure Data Encryption & API Layer',
      '1 Month Post-Launch Technical Support'
    ],
    benefits: [
      'Enhance brand credibility with modern digital presence',
      'Automate workflow and client interaction',
      'Scalable architecture ready for future growth'
    ],
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Node.js', 'Google Cloud / Vercel'],
    process: ['Requirement Analysis', 'Architecture & UI Design', 'Development & Testing', 'Deployment & Handover']
  };

  return (
    <div className="py-12 bg-[#07090E] text-[#F8FAFC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300 hover:text-white bg-[#00F2FE]/10 border border-[#00F2FE]/30 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.15)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Category List</span>
        </button>

        {/* Hero Card */}
        <div className="rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden bg-[#0B0F19] text-white">
          <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85" 
              alt={detail.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/85 to-transparent"></div>
          
          <div className="relative z-10 p-8 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#00F2FE] bg-[#00F2FE]/10 px-3 py-1 rounded-full border border-[#00F2FE]/30 backdrop-blur-md">
                {serviceType.toUpperCase()} CATEGORY
              </span>

              {detail.priceTag && (
                <span className="font-mono text-lg font-bold text-[#00F2FE] px-4 py-1.5 bg-slate-900 border border-cyan-500/40 rounded-xl shadow-lg shadow-cyan-500/20">
                  {detail.priceTag}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {detail.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {detail.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 bg-[#07090E]/90 p-5 rounded-2xl border border-white/10 leading-relaxed font-sans">
              {detail.overview}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenInquiry(categoryTitle)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#00F2FE] via-sky-400 to-[#6366F1] text-slate-950 font-bold rounded-xl text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Request Quote for {categoryTitle}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features & Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Key Features */}
          <div className="p-6 rounded-3xl bg-[#111827]/75 backdrop-blur-xl border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center tracking-tight">
              <Sparkles className="w-5 h-5 text-[#00F2FE] mr-2" />
              Key Features
            </h3>
            <div className="space-y-2.5">
              {detail.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Benefits */}
          <div className="p-6 rounded-3xl bg-[#111827]/75 backdrop-blur-xl border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center tracking-tight">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" />
              Business & Technical Benefits
            </h3>
            <div className="space-y-2.5">
              {detail.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Tech Stack & Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Tech Stack */}
          <div className="p-6 rounded-3xl bg-[#111827]/75 backdrop-blur-xl border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center tracking-tight">
              <Cpu className="w-5 h-5 text-[#00F2FE] mr-2" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {detail.technologies.map((tech, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-[#00F2FE]/10 text-cyan-300 border border-[#00F2FE]/30 rounded-xl text-xs font-mono font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Development Process */}
          <div className="p-6 rounded-3xl bg-[#111827]/75 backdrop-blur-xl border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center tracking-tight">
              <Clock className="w-5 h-5 text-cyan-400 mr-2" />
              Execution Steps
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300 font-mono">
              {detail.process.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CategoryDetailPage;

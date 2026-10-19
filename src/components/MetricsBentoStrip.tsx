import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, ShieldCheck, Zap, Award, Cpu, ArrowUpRight } from 'lucide-react';

interface MetricItem {
  metric: string;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  gradient: string;
}

const metrics: MetricItem[] = [
  {
    metric: "50+",
    label: "Projects Shipped",
    sub: "99.8% On-Time Delivery",
    icon: Rocket,
    tag: "DELIVERY",
    gradient: "from-[#00F2FE] via-[#38BDF8] to-white"
  },
  {
    metric: "MSME",
    label: "Govt. of India Registered",
    sub: "Officially Recognized Tech Enterprise",
    icon: ShieldCheck,
    tag: "ACCREDITED",
    gradient: "from-[#10B981] via-[#34D399] to-white"
  },
  {
    metric: "< 2 Hrs",
    label: "Rapid Response SLA",
    sub: "Direct Technical WhatsApp & Email Support",
    icon: Zap,
    tag: "SUPPORT",
    gradient: "from-[#F59E0B] via-[#FBBF24] to-white"
  },
  {
    metric: "100%",
    label: "Client Satisfaction",
    sub: "Verified Enterprise & Academic Reviews",
    icon: Award,
    tag: "VERIFIED",
    gradient: "from-[#00F2FE] via-[#6366F1] to-white"
  },
  {
    metric: "120 FPS",
    label: "Native Mobile Engine",
    sub: "Hardware Accelerated Zero-Jank UX",
    icon: Cpu,
    tag: "PERFORMANCE",
    gradient: "from-[#818CF8] via-[#C084FC] to-white"
  }
];

interface BentoCardProps {
  item: MetricItem;
  index: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ item, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const IconComponent = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index + 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-xl lg:rounded-2xl p-3.5 sm:p-4 lg:p-5 bg-[#0B0F19]/75 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1"
    >
      {/* Dynamic Border Highlight Tracking Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 254, 0.35), rgba(99, 102, 241, 0.2), transparent 70%)`
            : 'none'
        }}
      />

      {/* Subtle Inner Glass Refraction Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 254, 0.08), transparent 70%)`
            : 'none'
        }}
      />

      {/* Card Header: Icon & Micro Tag */}
      <div className="relative z-10 flex items-center justify-between mb-2.5 sm:mb-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F2FE] group-hover:text-white group-hover:bg-[#00F2FE]/20 group-hover:border-[#00F2FE]/40 transition-all duration-300 shadow-sm">
          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex items-center space-x-1 font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5 group-hover:text-slate-200 group-hover:border-[#00F2FE]/20 transition-colors">
          <span>{item.tag}</span>
          <ArrowUpRight className="w-2.5 h-2.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Metric Number Display */}
      <div className="relative z-10 my-0.5 sm:my-1">
        <div className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight font-sans bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left`}>
          {item.metric}
        </div>
      </div>

      {/* Label and High-Tech Subtitle */}
      <div className="relative z-10 mt-1">
        <div className="text-white text-xs sm:text-sm font-bold tracking-tight">
          {item.label}
        </div>
        <div className="text-slate-400 text-[10px] sm:text-[11px] font-normal leading-snug mt-0.5 sm:mt-1 group-hover:text-slate-300 transition-colors">
          {item.sub}
        </div>
      </div>

      {/* Ambient bottom cyber accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F2FE]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export const MetricsBentoStrip: React.FC = () => {
  return (
    <div className="w-full mt-3 sm:mt-6 lg:mt-10">
      {/* Strip Subtitle Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-1">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-[#00F2FE] shadow-[0_0_8px_#00F2FE]"></span>
          <span className="text-slate-200 font-semibold tracking-wider uppercase">ENTERPRISE PERFORMANCE METRICS</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-400">HARDWARE ACCELERATED BENCHMARKS</span>
        </div>
        <div className="text-[11px] font-mono text-[#00F2FE]/90 tracking-widest hidden sm:block">
          AUDIT STATUS: VERIFIED
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {metrics.map((item, idx) => (
          <BentoCard key={item.label} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
};

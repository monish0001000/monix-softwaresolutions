import React from 'react';
import { Layers, Code2, ShieldCheck, Rocket } from 'lucide-react';

interface WorkflowPhase {
  phase: string;
  title: string;
  deliverable: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PHASES: WorkflowPhase[] = [
  {
    phase: '01',
    title: 'Blueprints',
    deliverable: 'SRS Architecture & Schema Specifications',
    icon: Layers,
  },
  {
    phase: '02',
    title: 'Core Build',
    deliverable: 'Modular Clean Code & Tested APIs',
    icon: Code2,
  },
  {
    phase: '03',
    title: 'Security',
    deliverable: 'Zero-Defect Audit & Hardened SSL',
    icon: ShieldCheck,
  },
  {
    phase: '04',
    title: 'Launch',
    deliverable: 'Global Edge CDN & Instant Deployment',
    icon: Rocket,
  },
];

export const EngineeringPipeline: React.FC = () => {
  return (
    <section className="w-full py-12 bg-[#07090E] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono text-[#00F2FE] tracking-widest uppercase mb-1">
              PROCESS BLUEPRINT
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Engineering Pipeline
            </h3>
          </div>
          <p className="text-sm text-slate-400 max-w-sm">
            Four disciplined phases from specification to global production.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHASES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.phase}
                className="group relative rounded-2xl p-5 bg-[#0B0F19]/70 border border-white/10 hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col justify-between shadow-sm hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#00F2FE]">
                      {item.phase}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
                    DELIVERABLE
                  </span>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {item.deliverable}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EngineeringPipeline;

import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="py-16 bg-[#07090E] text-slate-100 min-h-[80vh] flex flex-col justify-center animate-pulse">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        
        {/* Skeleton Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-6 w-36 bg-cyan-500/20 border border-cyan-500/30 rounded-full mx-auto"></div>
          <div className="h-8 sm:h-10 w-3/4 bg-slate-800/80 rounded-xl mx-auto"></div>
          <div className="h-4 w-1/2 bg-slate-800/50 rounded-lg mx-auto"></div>
        </div>

        {/* Skeleton Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-[#111827]/70 rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="w-10 h-10 bg-cyan-500/15 border border-cyan-500/30 rounded-xl"></div>
              <div className="h-5 w-3/4 bg-slate-800 rounded-md"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-800/60 rounded"></div>
                <div className="h-3 w-4/5 bg-slate-800/60 rounded"></div>
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                <div className="h-4 w-20 bg-slate-800 rounded"></div>
                <div className="h-7 w-24 bg-cyan-500/20 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PageSkeleton;

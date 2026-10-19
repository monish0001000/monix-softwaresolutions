'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectDomainsDeepDive } from '../../src/components/ProjectDomainsDeepDive';
import { ArrowLeft, Terminal, ShieldCheck, Mail } from 'lucide-react';

export default function ProjectDomainsPage() {
  return (
    <main className="min-h-screen bg-[#07090E] text-[#F8FAFC]">
      {/* Top Navigation Bar */}
      <header className="border-b border-white/[0.08] bg-[#07090E]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-mono text-slate-300 hover:text-[#00F2FE] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to MONIX Home</span>
          </Link>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="hidden sm:flex items-center text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Govt. MSME Verified
            </span>
            <a
              href="mailto:contact@monixsoftware.com"
              className="px-3.5 py-1.5 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] hover:bg-[#00F2FE]/20 transition-all font-semibold"
            >
              contact@monixsoftware.com
            </a>
          </div>
        </div>
      </header>

      {/* Embedded DeepDive Component */}
      <ProjectDomainsDeepDive />
    </main>
  );
}

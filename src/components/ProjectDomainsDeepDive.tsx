import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Landmark,
  ShieldAlert,
  Bot,
  Cloud,
  ShoppingCart,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Terminal,
  Cpu,
  FileCode2,
  X,
  Copy,
  Zap,
  Server,
  Database,
  Award
} from 'lucide-react';
import { Language } from '../types';

export interface ProjectDomainsProps {
  lang?: Language;
  onOpenInquiryWithDomain?: (domainTitle: string) => void;
  onSelectCategoryDetail?: (catTitle: string, serviceType: 'projects') => void;
}

export type DomainCategoryFilter = 'all' | 'genai' | 'fintech' | 'healthcare' | 'cybersecurity' | 'cloud';

export interface DomainSpec {
  id: string;
  category: DomainCategoryFilter;
  title: string;
  badge: string;
  badgeColor: 'emerald' | 'cyan' | 'indigo' | 'amber' | 'sky';
  subtitle: string;
  architectureTags: [string, string, string];
  metricBadge: string;
  coreStack: [string, string, string];
  icon: React.ElementType;
  specs: {
    systemOverview: string;
    complianceStandard: string;
    performanceTarget: string;
    keyModules: string[];
    deliverables: string[];
    techStack: {
      frontend: string;
      backend: string;
      database: string;
      security: string;
    };
  };
}

export const DOMAIN_DATA: DomainSpec[] = [
  {
    id: 'healthcare-ehr',
    category: 'healthcare',
    title: 'Clinical EHR & Diagnostic AI',
    badge: 'HIPAA Compliant',
    badgeColor: 'emerald',
    subtitle: 'Patient Telemetry & Records',
    architectureTags: ['FHIR HL7', 'Encrypted Telemetry', 'Zero-Leakage ML'],
    metricBadge: '< 35ms Diagnostic Query',
    coreStack: ['Next.js 15', 'FastAPI', 'pgvector'],
    icon: Activity,
    specs: {
      systemOverview: 'End-to-end encrypted clinical diagnostics and medical health record orchestration platform with FHIR HL7 schema validation.',
      complianceStandard: 'HIPAA Security Rule (45 CFR § 164.312) & HITECH Act',
      performanceTarget: '99.99% Uptime with sub-35ms p95 record retrieval',
      keyModules: [
        'Decentralized FHIR v4 Resource Parsing',
        'DICOM Image Deep-Learning Anomaly Detection',
        'Role-Based Granular Clinician Permission Matrix',
        'Cryptographic Audit Logging of All PHI Access'
      ],
      deliverables: [
        'Complete Source Code (Full-Stack Next.js + Python)',
        'IEEE Format 50+ Page Academic/Corporate Technical SRS',
        'Complete UML Architecture, ERD & Flow Blueprints',
        'Automated Mock Patient Dataset & Test Seeders'
      ],
      techStack: {
        frontend: 'Next.js 15, Tailwind CSS, Web Workers',
        backend: 'FastAPI, Python 3.12, Celery Task Workers',
        database: 'PostgreSQL 16 with pgvector & Redis Cache',
        security: 'AES-256 at Rest, TLS 1.3 in Transit, OAuth2/JWT'
      }
    }
  },
  {
    id: 'fintech-core',
    category: 'fintech',
    title: 'FinTech Ledger & Payment Core',
    badge: 'PCI-DSS Ready',
    badgeColor: 'amber',
    subtitle: 'High-Concurrency Ledger',
    architectureTags: ['Double-Entry Ledger', 'Event Sourcing', 'Idempotent Webhooks'],
    metricBadge: '99.999% Zero-Loss Fault Tolerance',
    coreStack: ['Go / Node.js', 'Apache Kafka', 'TimescaleDB'],
    icon: Landmark,
    specs: {
      systemOverview: 'Immutable, double-entry financial transaction core built with event-driven architecture and real-time fraud scoring.',
      complianceStandard: 'PCI-DSS v4.0 Level 1 Architecture Guidelines',
      performanceTarget: '10,000+ Transactions Per Second (TPS) with 0 drift',
      keyModules: [
        'ACID-Compliant Double-Entry Journal Engine',
        'Real-Time Ingestion Queue via Apache Kafka',
        'Dynamic Risk Assessment & Fraud Detection Rules',
        'Automated Multi-Currency Reconciliation Worker'
      ],
      deliverables: [
        'Production-Ready Microservices Architecture Code',
        'IEEE-Standard Architecture Specification Document',
        'Live Sandbox Simulator for Stripe/Razorpay Webhooks',
        'Performance Stress-Test Reports with Artillery & k6'
      ],
      techStack: {
        frontend: 'React 19, TypeScript, Cyber-Enterprise UI',
        backend: 'Go 1.22 / Node.js Microservices, Kafka',
        database: 'PostgreSQL, TimescaleDB, Redis Cluster',
        security: 'HMAC-SHA256 Signatures, PCI-DSS Level 1 Isolation'
      }
    }
  },
  {
    id: 'zero-trust-soc',
    category: 'cybersecurity',
    title: 'Zero-Trust Perimeter & SOC',
    badge: 'Zero-Trust',
    badgeColor: 'indigo',
    subtitle: 'Microsegmentation & SIEM',
    architectureTags: ['Mutual TLS', 'Least-Privilege RBAC', 'eBPF Telemetry'],
    metricBadge: 'Real-Time Threat Telemetry',
    coreStack: ['Rust / Python', 'eBPF Kernel', 'Elastic SIEM'],
    icon: ShieldAlert,
    specs: {
      systemOverview: 'Defense-in-depth zero-trust gateway featuring real-time packet inspection, dynamic token claims, and continuous device health verification.',
      complianceStandard: 'NIST SP 800-207 Zero Trust Architecture & SOC2 Type II',
      performanceTarget: 'Sub-millisecond packet evaluation with zero packet drop',
      keyModules: [
        'eBPF-Powered Kernel-Level Network Monitoring',
        'Dynamic Mutual TLS (mTLS) Mesh Enforcement',
        'Automated Intrusion Detection & IP Blacklisting',
        'SIEM Dashboard with Real-Time MITRE ATT&CK Matrix'
      ],
      deliverables: [
        'Full Source Code for Perimeter Proxy & Dashboard',
        'Formal Cybersecurity Threat Model & SRS Document',
        'OWASP Top 10 Penetration Audit Benchmark Suite',
        'Pre-configured Docker-Compose Multi-Container Sandbox'
      ],
      techStack: {
        frontend: 'Next.js 15, Recharts Cyber Dashboards',
        backend: 'Rust Proxy Gateway, Python Telemetry Core',
        database: 'Elasticsearch / OpenSearch, Redis KeyDB',
        security: 'SPIFFE/SPIRE Identity, mTLS, Ed25519 Keys'
      }
    }
  },
  {
    id: 'genai-agents',
    category: 'genai',
    title: 'Enterprise Multi-Agent RAG Engine',
    badge: 'Autonomous Agents',
    badgeColor: 'cyan',
    subtitle: 'Knowledge Graph & Vector RAG',
    architectureTags: ['Vector Embeddings', 'Agentic Workflows', 'Knowledge Synthesis'],
    metricBadge: 'Sub-Second Semantic Search',
    coreStack: ['LangGraph', 'OpenAI / Gemini', 'Qdrant'],
    icon: Bot,
    specs: {
      systemOverview: 'Multi-agent orchestration platform leveraging vector retrieval, reranking, and self-correcting RAG loops to answer complex domain queries.',
      complianceStandard: 'Enterprise IP NDA & SOC2 PII-Redaction Pipeline',
      performanceTarget: '< 800ms Time-to-First-Token on 10M+ Vector Corpus',
      keyModules: [
        'Document Ingestion Pipeline (PDF, DOCX, Code, Audio)',
        'Hybrid Dense + BM25 Sparse Vector Search',
        'Autonomous Multi-Agent Debate & Self-Verification',
        'Deterministic Hallucination Guardrails & Cite-Back'
      ],
      deliverables: [
        'Complete Autonomous Agent Repository Code',
        'Comprehensive Research Paper Draft & SRS Document',
        'Evaluation Benchmark Dataset with RAGAS Metrics',
        'Streamlit & Next.js Production UI Interfaces'
      ],
      techStack: {
        frontend: 'Next.js 15, Streaming Text UI, Tailwind',
        backend: 'Python 3.12, LangGraph, FastAPI',
        database: 'Qdrant Vector DB, SQLite Metadata Store',
        security: 'Presidio PII Anonymization, Rate-Limiting'
      }
    }
  },
  {
    id: 'cloud-mesh',
    category: 'cloud',
    title: 'Edge Microservices & Cloud-Mesh',
    badge: 'Edge CDN Mesh',
    badgeColor: 'sky',
    subtitle: 'Distributed High-Availability',
    architectureTags: ['Multi-Region Mesh', 'GitOps CI/CD', 'Self-Healing Pods'],
    metricBadge: 'Zero-Downtime Rolling Deploys',
    coreStack: ['Kubernetes', 'Docker', 'Terraform'],
    icon: Cloud,
    specs: {
      systemOverview: 'Cloud-native infrastructure blueprint engineered for multi-cloud resiliency, automatic traffic failover, and automated container scaling.',
      complianceStandard: 'CIS Kubernetes Benchmark & ISO 27001 Standards',
      performanceTarget: '99.999% Infrastructure Reliability under peak load',
      keyModules: [
        'Declarative GitOps Pipelines via ArgoCD',
        'Envoy Service Mesh with Canary Traffic Splitting',
        'Prometheus & Grafana Enterprise Telemetry Stack',
        'Automated Cluster Backup & Geo-Replication'
      ],
      deliverables: [
        '100% Infrastructure-as-Code Terraform Blueprints',
        'Helm Charts & Kubernetes Manifest Configurations',
        'Architecture Whitepaper with Disaster Recovery Runbooks',
        'Local Minikube / K3s Quickstart Sandbox'
      ],
      techStack: {
        frontend: 'Grafana Cloud Observability Dashboard',
        backend: 'Go Microservices, Envoy Proxy Gateway',
        database: 'CockroachDB Distributed SQL, Redis',
        security: 'HashiCorp Vault Secrets, Cilium Network Policies'
      }
    }
  },
  {
    id: 'ecommerce-engine',
    category: 'fintech',
    title: 'Headless Commerce & Inventory AI',
    badge: 'High-Velocity Cart',
    badgeColor: 'emerald',
    subtitle: 'Omnichannel Edge Storefront',
    architectureTags: ['Instant Checkout', 'Predictive Restock', 'Omnichannel Sync'],
    metricBadge: '100/100 Lighthouse Speed',
    coreStack: ['Next.js 15', 'Stripe / Razorpay', 'Redis Cache'],
    icon: ShoppingCart,
    specs: {
      systemOverview: 'Sub-second headless e-commerce ecosystem integrating multi-vendor inventory sync, localized payments, and machine learning cart recovery.',
      complianceStandard: 'PCI-DSS SAQ-A & GDPR Consent Guidelines',
      performanceTarget: 'Sub-300ms Time to First Byte (TTFB) globally',
      keyModules: [
        'Edge-Cached GraphQL Product Catalog Engine',
        'Multi-Gateway Payment Dispatch (Stripe, UPI, Card)',
        'Predictive Stock Depletion & Demand Forecasting',
        'Real-time Order Webhook Notification Queue'
      ],
      deliverables: [
        'Complete Headless Storefront & Admin Portal Code',
        'Enterprise E-Commerce Architecture Specification (SRS)',
        'Seeded Demo Database with 100+ Products & SKUs',
        'Live Payment Gateway Test Webhook Simulator'
      ],
      techStack: {
        frontend: 'Next.js 15 App Router, Tailwind CSS, Framer',
        backend: 'Node.js, GraphQL Yoga, Redis PubSub',
        database: 'PostgreSQL with Prisma ORM, Redis',
        security: 'Tokenized Checkout, CSRF Protection, HTTPS Only'
      }
    }
  }
];

export const ProjectDomainsDeepDive: React.FC<ProjectDomainsProps> = ({
  onOpenInquiryWithDomain,
  onSelectCategoryDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<DomainCategoryFilter>('all');
  const [selectedSpec, setSelectedSpec] = useState<DomainSpec | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const filterTabs: { id: DomainCategoryFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All Domains', count: DOMAIN_DATA.length },
    { id: 'genai', label: 'Generative AI', count: DOMAIN_DATA.filter((d) => d.category === 'genai').length },
    { id: 'fintech', label: 'FinTech', count: DOMAIN_DATA.filter((d) => d.category === 'fintech').length },
    { id: 'healthcare', label: 'Healthcare AI', count: DOMAIN_DATA.filter((d) => d.category === 'healthcare').length },
    { id: 'cybersecurity', label: 'Cybersecurity', count: DOMAIN_DATA.filter((d) => d.category === 'cybersecurity').length },
    { id: 'cloud', label: 'Cloud & Edge', count: DOMAIN_DATA.filter((d) => d.category === 'cloud').length },
  ];

  const filteredDomains = activeCategory === 'all'
    ? DOMAIN_DATA
    : DOMAIN_DATA.filter((d) => d.category === activeCategory);

  const getBadgeColors = (color: DomainSpec['badgeColor']) => {
    switch (color) {
      case 'emerald':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]';
      case 'amber':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]';
      case 'indigo':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.15)]';
      case 'sky':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30 shadow-[0_0_12px_rgba(56,189,248,0.15)]';
      case 'cyan':
      default:
        return 'text-[#00F2FE] bg-[#00F2FE]/10 border-[#00F2FE]/30 shadow-[0_0_12px_rgba(0,242,254,0.15)]';
    }
  };

  const handleCopySRSReference = () => {
    if (selectedSpec) {
      const text = `MONIX System Specs: ${selectedSpec.title} [${selectedSpec.badge}]\nCompliance: ${selectedSpec.specs.complianceStandard}\nBenchmark: ${selectedSpec.specs.performanceTarget}\nStack: ${selectedSpec.coreStack.join(', ')}`;
      navigator.clipboard.writeText(text);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleTriggerInquiry = (domainTitle: string) => {
    if (onSelectCategoryDetail) {
      onSelectCategoryDetail(domainTitle, 'projects');
    } else if (onOpenInquiryWithDomain) {
      onOpenInquiryWithDomain(domainTitle);
    } else {
      // Smooth scroll to homepage contact terminal
      const contactEl = document.getElementById('contact') || document.getElementById('executive-contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '#contact';
      }
    }
    setSelectedSpec(null);
  };

  return (
    <section id="project-domains" className="py-10 sm:py-14 lg:py-24 bg-[#07090E] text-[#F8FAFC] relative overflow-hidden">
      {/* Ambient Cyber Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293714_1px,transparent_1px),linear-gradient(to_bottom,#1f293714_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-gradient-to-r from-[#00F2FE]/10 via-[#6366F1]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-16">
          <div className="max-w-2xl space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 sm:px-3.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/25 text-[#00F2FE] text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(0,242,254,0.12)]">
              <Terminal className="w-3.5 h-3.5" />
              <span>MISSION-CRITICAL SYSTEMS & IEEE BLUEPRINTS</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              Enterprise Project Domains
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-400 font-light leading-relaxed">
              Engineered for regulated industries, high-concurrency cloud pipelines, and final-year academic IEEE excellence. Highly scannable, audit-ready, and production-tested.
            </p>
          </div>

          {/* SLA & IP Guarantees Micro-Pill */}
          <div className="shrink-0 flex items-center space-x-2.5 sm:space-x-3 text-[11px] sm:text-xs font-mono text-slate-400 bg-[#111827]/70 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/[0.08] backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Turnkey Code + IEEE SRS Included</span>
          </div>
        </div>

        {/* Category Filtering Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 lg:mb-10 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-1.5 sm:space-x-2 border ${
                  isActive
                    ? 'bg-[#00F2FE]/15 border-[#00F2FE] text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                    : 'bg-[#111827]/50 border-white/[0.07] text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-[#00F2FE]/30 text-white' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={domain.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-xl sm:rounded-2xl lg:rounded-3xl p-3.5 sm:p-5 lg:p-7 bg-[#111827]/75 backdrop-blur-xl border border-white/[0.08] hover:border-[#00F2FE]/50 transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(0,242,254,0.18)] hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Subtle Top-Right Ambient Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FE]/5 rounded-tr-3xl blur-2xl group-hover:bg-[#00F2FE]/10 transition-colors pointer-events-none" />

                  <div>
                    {/* Top Row: Icon Container & Glowing Industry Badge */}
                    <div className="flex items-center justify-between mb-3.5 sm:mb-5">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#00F2FE] group-hover:scale-105 group-hover:border-[#00F2FE]/40 group-hover:bg-[#00F2FE]/10 transition-all shadow-inner">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>

                      <span
                        className={`font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border ${getBadgeColors(
                          domain.badgeColor
                        )}`}
                      >
                        {domain.badge}
                      </span>
                    </div>

                    {/* Domain Title & Subtitle */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#F8FAFC] tracking-tight group-hover:text-[#00F2FE] transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5 sm:mt-1">
                      {domain.subtitle}
                    </p>

                    {/* 2-Word Architecture Tags */}
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
                      {domain.architectureTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-[#07090E]/80 text-slate-300 border border-white/[0.06] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Performance / SLA Metric Chip */}
                    <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 text-[10px] sm:text-[11px]">Benchmark:</span>
                      <span className="text-[#00F2FE] font-bold text-[10px] sm:text-[11px]">
                        {domain.metricBadge}
                      </span>
                    </div>

                    {/* Core Tech Stack Chips */}
                    <div className="mt-2.5 sm:mt-3 flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400">
                      <Cpu className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span className="truncate">{domain.coreStack.join(' • ')}</span>
                    </div>
                  </div>

                  {/* Card Bottom: Inspect Specs Button Trigger */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2.5 sm:gap-3">
                    <button
                      onClick={() => setSelectedSpec(domain)}
                      className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-white/[0.05] hover:bg-[#00F2FE]/15 hover:text-[#00F2FE] border border-white/[0.08] hover:border-[#00F2FE]/40 text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                    >
                      <FileCode2 className="w-3.5 h-3.5" />
                      <span>Inspect Specs</span>
                    </button>

                    <button
                      onClick={() => handleTriggerInquiry(domain.title)}
                      title="Request Project Scope"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#00F2FE]/10 hover:bg-[#00F2FE] text-[#00F2FE] hover:text-slate-950 border border-[#00F2FE]/30 transition-all flex items-center justify-center cursor-pointer shrink-0"
                    >
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* =========================================================================
          HIGH-TECH ARCHITECTURAL "INSPECT SPECS" MODAL
          ========================================================================= */}
      <AnimatePresence>
        {selectedSpec && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpec(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#0B0F19] border border-[#00F2FE]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(0,242,254,0.18)] overflow-hidden z-10 my-8"
            >
              {/* Terminal Window Header Bar */}
              <div className="px-6 py-4 bg-[#07090E] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400 font-semibold truncate">
                    specs://monix-systems/{selectedSpec.id}.srs
                  </span>
                </div>

                <button
                  onClick={() => setSelectedSpec(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close Specs"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
                
                {/* Title & Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#F8FAFC]">
                      {selectedSpec.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      {selectedSpec.subtitle}
                    </p>
                  </div>

                  <span
                    className={`font-mono text-[11px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full border self-start sm:self-auto ${getBadgeColors(
                      selectedSpec.badgeColor
                    )}`}
                  >
                    {selectedSpec.badge}
                  </span>
                </div>

                {/* System Overview */}
                <div className="p-4 rounded-2xl bg-[#07090E]/80 border border-white/[0.08] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#00F2FE] tracking-wider font-semibold">
                    System Architecture Overview
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {selectedSpec.specs.systemOverview}
                  </p>
                </div>

                {/* Compliance & Performance Benchmarks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">Compliance Standard</span>
                    <p className="text-emerald-400 font-bold">{selectedSpec.specs.complianceStandard}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">Performance Benchmark</span>
                    <p className="text-[#00F2FE] font-bold">{selectedSpec.specs.performanceTarget}</p>
                  </div>
                </div>

                {/* Key Subsystem Modules */}
                <div className="space-y-2.5">
                  <span className="text-xs font-mono uppercase font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#00F2FE]" />
                    <span>Core Architectural Modules</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {selectedSpec.specs.keyModules.map((mod, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-[#07090E]/60 border border-white/[0.05] flex items-center space-x-2 text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-[11px] leading-tight">{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Matrix */}
                <div className="p-4 rounded-2xl bg-[#07090E]/90 border border-white/[0.08] space-y-2 text-xs font-mono">
                  <span className="text-[10px] uppercase text-indigo-400 tracking-wider font-semibold">
                    Technical Stack Matrix
                  </span>
                  <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Frontend / UI:</span>
                      <span className="text-slate-200">{selectedSpec.specs.techStack.frontend}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Backend / APIs:</span>
                      <span className="text-slate-200">{selectedSpec.specs.techStack.backend}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Database / Persistence:</span>
                      <span className="text-slate-200">{selectedSpec.specs.techStack.database}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Security & Auth:</span>
                      <span className="text-slate-200">{selectedSpec.specs.techStack.security}</span>
                    </div>
                  </div>
                </div>

                {/* Deliverables Included */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Included Package Deliverables</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
                    {selectedSpec.specs.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons in Modal */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handleCopySRSReference}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-colors flex items-center justify-center space-x-2 cursor-pointer border border-white/10"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode ? 'Specs Copied!' : 'Copy System Specs'}</span>
                  </button>

                  <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => handleTriggerInquiry(selectedSpec.title)}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F2FE] via-sky-400 to-[#6366F1] hover:opacity-95 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                    >
                      <span>Request Implementation Scope</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ProjectDomainsDeepDive;

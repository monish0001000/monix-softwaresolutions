import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, QrCode, CheckCircle2, Award, Terminal, Cpu, Clock, 
  Users, ArrowRight, BookOpen, Layers, Laptop, ExternalLink, Sparkles, 
  Zap, Lock, Code2, Cloud, Server, Database, Check, ChevronRight, 
  FileText, Download, PhoneCall, AlertCircle, X, Search, CheckCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

export interface InternshipsDeepDiveProps {
  lang?: Language;
  onOpenInquiryWithProgram?: (programName: string) => void;
  onSelectCategoryDetail?: (catTitle: string, serviceType: 'internship') => void;
}

export interface DeepDiveTrack {
  id: string;
  title: string;
  badge: string;
  badgeCategory: string;
  accentColor: 'cyan' | 'emerald' | 'indigo' | 'amber';
  shortDesc: string;
  labEnvironment: string;
  stack: string[];
  capstoneProject: string;
  capstoneOutcome: string;
  metrics: {
    projectsBuilt: string;
    avgCompletionRate: string;
    hireRate: string;
  };
  curriculum: {
    durationDays5: {
      title: string;
      hours: string;
      modules: { day: string; title: string; desc: string }[];
      deliverable: string;
    };
    durationDays15: {
      title: string;
      hours: string;
      modules: { day: string; title: string; desc: string }[];
      deliverable: string;
    };
    durationDays30: {
      title: string;
      hours: string;
      modules: { day: string; title: string; desc: string }[];
      deliverable: string;
    };
  };
}

export const MODULAR_TRACKS: DeepDiveTrack[] = [
  {
    id: 'generative-ai-llms',
    title: 'Generative AI & Autonomous LLM Agents',
    badge: 'FLAGSHIP AI LAB',
    badgeCategory: 'Artificial Intelligence',
    accentColor: 'cyan',
    shortDesc: 'Production AI engineering with LangChain, LangGraph, pgvector/Pinecone RAG, and autonomous agent systems on high-throughput inference APIs.',
    labEnvironment: 'Dedicated Gemini 2.0 & HuggingFace Inference Cloud Pods',
    stack: ['LangChain', 'LangGraph', 'Pinecone', 'Python', 'FastAPI', 'Gemini API', 'Next.js 15'],
    capstoneProject: 'Enterprise Hybrid Vector RAG Assistant with Autonomous Agent Task Execution',
    capstoneOutcome: 'Fully deployed production multi-agent system on Cloud Run with live telemetry, token optimizations, and prompt evaluations.',
    metrics: {
      projectsBuilt: '3 Deployed Apps',
      avgCompletionRate: '99.2%',
      hireRate: '88% Placement',
    },
    curriculum: {
      durationDays5: {
        title: '5-Day GenAI & Prompt Sprint',
        hours: '15 Hours (3 hrs/day live labs)',
        modules: [
          { day: 'Day 1', title: 'LLM Foundations & Prompt Engineering', desc: 'Few-shot prompting, chain-of-thought, system instructions, and token budget management.' },
          { day: 'Day 2', title: 'Embeddings & Vector Cosine Similarity', desc: 'Vector space mathematical foundations, embeddings generation, and vector retrieval basics.' },
          { day: 'Day 3', title: 'First Retrieval-Augmented Generation (RAG)', desc: 'Document chunking, metadata tagging, and context ingestion with Gemini API.' },
          { day: 'Day 4', title: 'Guardrails & Structured Function Calling', desc: 'Pydantic output parsing, tool integration, and safety boundary defenses.' },
          { day: 'Day 5', title: 'Cloud Deployment & MSME QR Certification', desc: 'Production deployment to Vercel/Render, live evaluation, and credential issuance.' }
        ],
        deliverable: 'Working RAG knowledge engine prototype, prompt evaluation matrix, and verified MSME certificate.'
      },
      durationDays15: {
        title: '15-Day LLM & Vector Systems Bootcamp',
        hours: '45 Hours (Hands-on Live Engineering)',
        modules: [
          { day: 'Phase 1', title: 'Advanced Prompting & Structured Data Workflows', desc: 'Multi-turn memory architectures, structured JSON schemas, and streaming UI rendering.' },
          { day: 'Phase 2', title: 'Enterprise Vector RAG with Pinecone & Hybrid Search', desc: 'Dense + sparse embedding search, reciprocal rank fusion (RRF), and cross-encoder re-ranking.' },
          { day: 'Phase 3', title: 'Autonomous Multi-Agent Networks with LangGraph', desc: 'State graphs, human-in-the-loop validation, dynamic memory buffers, and tool executors.' },
          { day: 'Capstone', title: 'Production SaaS AI Agent Deployment', desc: 'Next.js 15 frontend, FastAPI backend, Docker containerization, and automated evaluations.' }
        ],
        deliverable: 'Two live deployed AI applications, complete GitHub codebase, and MSME QR Certificate.'
      },
      durationDays30: {
        title: '30-Day Autonomous AI Architect Master Track',
        hours: '90 Hours (Deep Architecture + 1-on-1 Mentorship)',
        modules: [
          { day: 'Week 1', title: 'Core GenAI Engineering & Token Economics', desc: 'Tokenizer optimization, embedding fine-tuning, latency reduction, and multi-model router setup.' },
          { day: 'Week 2', title: 'Enterprise Vector Infrastructure & Graph RAG', desc: 'High-scale pgvector clustering, knowledge graph integration (Neo4j), and multi-document synthesis.' },
          { day: 'Week 3', title: 'Autonomous Agent Orchestration & Self-Healing Workflows', desc: 'LangGraph multi-agent teams, reflection agents, automated unit testing, and sandbox execution.' },
          { day: 'Week 4', title: 'Enterprise Production Launch & Technical Defense', desc: 'CI/CD deployment, Ragas evaluation benchmarking, Senior LOR signing, and mock interviews.' }
        ],
        deliverable: 'Enterprise-grade autonomous AI portfolio on AWS, Senior Architect LOR, and priority job referrals.'
      }
    }
  },
  {
    id: 'cybersecurity-soc',
    title: 'Cybersecurity, Ethical Hacking & Virtual SOC',
    badge: 'ZERO-TRUST SOC',
    badgeCategory: 'Security Operations',
    accentColor: 'indigo',
    shortDesc: 'Hands-on offensive & defensive security, web application exploitation, OWASP Top 10 mitigation, and virtual SOC threat hunting.',
    labEnvironment: 'Dedicated Kali Linux & Virtual SOC Sandbox Cloud Pods',
    stack: ['Kali Linux', 'Burp Suite Pro', 'Wireshark', 'Metasploit', 'OWASP ZAP', 'Python Security', 'Linux CLI'],
    capstoneProject: 'Enterprise Web Application Penetration Test & Automated Threat Response SOC Portal',
    capstoneOutcome: 'Comprehensive 40+ page professional CVE vulnerability assessment report with proof-of-concept exploits and hardening blueprints.',
    metrics: {
      projectsBuilt: '4 Security Audits',
      avgCompletionRate: '98.5%',
      hireRate: '85% Placement',
    },
    curriculum: {
      durationDays5: {
        title: '5-Day Defensive Cyber Sprint',
        hours: '15 Hours (3 hrs/day live labs)',
        modules: [
          { day: 'Day 1', title: 'Threat Landscapes & Linux Kernel Hardening', desc: 'Network topology recon, port scanning with Nmap, and firewall iptables configuration.' },
          { day: 'Day 2', title: 'OWASP Top 10 & Web Attack Surfaces', desc: 'Deconstructing modern web vectors: broken access control, cryptographic failures, and injection.' },
          { day: 'Day 3', title: 'Burp Suite Pro Interception & Token Analysis', desc: 'Manipulating HTTP requests, session token hijacking, and JWT signature bypasses.' },
          { day: 'Day 4', title: 'Live Injection Exploitation & Remediation', desc: 'Hands-on SQL injection, Stored XSS, CSRF attacks, and defense-in-depth sanitization.' },
          { day: 'Day 5', title: 'Audit Report Defense & MSME Certificate Issuance', desc: 'Standardized CVE reporting, client remediation roadmap, and QR credential verification.' }
        ],
        deliverable: 'Executive penetration testing summary, vulnerability assessment logs, and verifiable MSME Certificate.'
      },
      durationDays15: {
        title: '15-Day Ethical Hacking Bootcamp',
        hours: '45 Hours (Hands-on Offensive & Defensive Labs)',
        modules: [
          { day: 'Phase 1', title: 'Network Reconnaissance, Packet Sniffing & MitM', desc: 'Deep Wireshark packet capture analysis, ARP spoofing detection, and secure TLS handshake audits.' },
          { day: 'Phase 2', title: 'Advanced Web Vulnerability Scanning & API Auditing', desc: 'Automated fuzzing, OAuth 2.0 flow flaws, GraphQL security, and server-side request forgery (SSRF).' },
          { day: 'Phase 3', title: 'Virtual SOC Operations & Threat Intelligence', desc: 'SIEM log telemetry (Elasticsearch/Wazuh), threat hunting, brute-force mitigation, and alert triage.' },
          { day: 'Capstone', title: 'Simulated Enterprise Red Team Penetration Test', desc: 'Black-box audit against staging production applications with full exploit reproduction.' }
        ],
        deliverable: 'Professional security portfolio, reproducible exploit scripts, and Govt. of India MSME Credentials.'
      },
      durationDays30: {
        title: '30-Day Full SOC Immersion & Red/Blue Teaming',
        hours: '90 Hours (Industry Simulation + Senior Security Architect 1-on-1)',
        modules: [
          { day: 'Week 1', title: 'Cyber Reconnaissance & Automation with Python', desc: 'Writing custom network scanners, credential stuffing detectors, and automated banner grabbers.' },
          { day: 'Week 2', title: 'Cloud Infrastructure & Container Exploitation', desc: 'Docker breakout techniques, AWS IAM misconfiguration auditing, and Kubernetes pod escape prevention.' },
          { day: 'Week 3', title: 'Defensive Architecture, SIEM Rules & IDS/IPS', desc: 'Crafting custom Suricata rules, active defense honeypots, and incident response playbooks.' },
          { day: 'Week 4', title: 'Live Enterprise Red/Blue Cyber Warfare & Defense', desc: 'Timed simulated cyber attack mitigation, Senior LOR endorsement, and SOC tier-1 interview prep.' }
        ],
        deliverable: 'Production-ready cyber defense portfolio, real SOC incident logs, GitHub repository, and Senior LOR.'
      }
    }
  },
  {
    id: 'full-stack-web',
    title: 'Full-Stack Web Engineering & Scalable Systems',
    badge: 'CORE ENGINEERING',
    badgeCategory: 'Software Engineering',
    accentColor: 'emerald',
    shortDesc: 'Production-grade software architecture using Next.js 15, React 19, TypeScript, PostgreSQL, and microservice APIs with 60fps responsiveness.',
    labEnvironment: 'High-Performance Node.js & Docker Cloud Staging Environments',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'PostgreSQL', 'Docker', 'Redis'],
    capstoneProject: 'Multi-Tenant B2B SaaS Platform with Role-Based Access & High-Speed Edge SSR',
    capstoneOutcome: 'Live production SaaS deployed on Vercel & Supabase with sub-800ms TTFB, 95+ Lighthouse score, and zero-downtime database migrations.',
    metrics: {
      projectsBuilt: '5 Microservices',
      avgCompletionRate: '99.5%',
      hireRate: '92% Placement',
    },
    curriculum: {
      durationDays5: {
        title: '5-Day Modern Web Fast-Track',
        hours: '15 Hours (3 hrs/day live labs)',
        modules: [
          { day: 'Day 1', title: 'Next.js 15 App Router & Server Components', desc: 'Streaming SSR, Suspense boundaries, and modern React 19 compiler optimization.' },
          { day: 'Day 2', title: 'Type-Safe Architecture & Tailwind CSS v4', desc: 'Strict TypeScript contracts, component composition, and responsive luxury UI patterns.' },
          { day: 'Day 3', title: 'PostgreSQL Database & Prisma/Drizzle ORM', desc: 'Relational schemas, foreign keys, database indexing, and connection pooling.' },
          { day: 'Day 4', title: 'Authentication, Protected Routes & Server Actions', desc: 'JWT/OAuth authentication, session cookies, and secure server-side form mutations.' },
          { day: 'Day 5', title: 'Production Edge Deployment & MSME Certification', desc: 'Deploying to Vercel/Neon DB, Core Web Vitals audit, and QR credential verification.' }
        ],
        deliverable: 'Clean full-stack web application, GitHub repository, and verified MSME Certificate.'
      },
      durationDays15: {
        title: '15-Day Enterprise Full-Stack Bootcamp',
        hours: '45 Hours (Live Production Systems)',
        modules: [
          { day: 'Phase 1', title: 'Advanced Frontend Systems & State Orchestration', desc: 'Complex state management, optimistic UI updates, zero-jank animation with Framer Motion.' },
          { day: 'Phase 2', title: 'High-Performance Backend & Microservice APIs', desc: 'RESTful and Webhook endpoints, Redis distributed caching, rate limiting, and input validation.' },
          { day: 'Phase 3', title: 'Payment Gateways & Real-Time Sockets', desc: 'Stripe/Razorpay webhook reconciliation, Socket.io real-time chat, and notification pipelines.' },
          { day: 'Capstone', title: 'Full B2B SaaS Application Deployment', desc: 'Multi-tenant isolation, automated Docker builds, live deployment, and code review defense.' }
        ],
        deliverable: 'Production SaaS dashboard, automated CI/CD pipeline, and verifiable MSME Credentials.'
      },
      durationDays30: {
        title: '30-Day Principal Full-Stack Architect Track',
        hours: '90 Hours (Deep Engineering + 1-on-1 Mentorship)',
        modules: [
          { day: 'Week 1', title: 'Design Patterns, Monorepos & System Architecture', desc: 'Turborepo setup, shared UI component libraries, and clean domain-driven architecture.' },
          { day: 'Week 2', title: 'High-Throughput Databases & Query Optimization', desc: 'Query plan analysis (EXPLAIN ANALYZE), TimescaleDB, read replicas, and caching strategies.' },
          { day: 'Week 3', title: 'Cloud Infrastructure, Docker & Observability', desc: 'Multi-stage Docker builds, OpenTelemetry tracing, Prometheus metrics, and automated alerts.' },
          { day: 'Week 4', title: 'Enterprise Capstone Launch & Placement Prep', desc: 'High-traffic load testing (k6), architectural oral viva defense, LOR signing, and mock interviews.' }
        ],
        deliverable: 'Commercial-grade SaaS software portfolio, verified Git commits, Senior LOR, and placement support.'
      }
    }
  },
  {
    id: 'cloud-devops',
    title: 'Cloud DevOps, Kubernetes & SRE Infrastructure',
    badge: '99.99% CLOUD SRE',
    badgeCategory: 'Cloud & Infrastructure',
    accentColor: 'amber',
    shortDesc: 'Automated CI/CD pipelines, container orchestration with Kubernetes, Infrastructure as Code with Terraform, and 99.99% cloud reliability.',
    labEnvironment: 'AWS & GCP Production Clusters with Terraform & Helm Sandboxes',
    stack: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP', 'GitHub Actions', 'Prometheus', 'Grafana'],
    capstoneProject: 'GitOps Automated Microservice Deployment with Canary Rollouts & Self-Healing Telemetry',
    capstoneOutcome: 'Production Kubernetes cluster deployment with zero-downtime rolling updates, automated Grafana observability, and Terraform IaC state locking.',
    metrics: {
      projectsBuilt: '6 CI/CD Pipelines',
      avgCompletionRate: '98.8%',
      hireRate: '90% Placement',
    },
    curriculum: {
      durationDays5: {
        title: '5-Day Cloud DevOps Fast-Track',
        hours: '15 Hours (3 hrs/day live labs)',
        modules: [
          { day: 'Day 1', title: 'Cloud Computing & Linux Server Administration', desc: 'AWS EC2, VPC networking, security groups, SSH keys, and Linux bash automation.' },
          { day: 'Day 2', title: 'Docker Containerization & Image Optimization', desc: 'Multi-stage Dockerfiles, layer caching, volume mapping, and container security scanning.' },
          { day: 'Day 3', title: 'Continuous Integration with GitHub Actions', desc: 'Writing automated test runners, artifact build workflows, and deployment triggers.' },
          { day: 'Day 4', title: 'Cloud Deployment to Managed AWS/GCP Platforms', desc: 'Deploying containers to AWS ECS/App Runner, SSL configuration, and custom domain mapping.' },
          { day: 'Day 5', title: 'Observability & MSME Certificate Issuance', desc: 'Basic CloudWatch metric dashboards, alert configuration, and QR credential verification.' }
        ],
        deliverable: 'Automated CI/CD pipeline, Dockerized cloud application, and verified MSME Certificate.'
      },
      durationDays15: {
        title: '15-Day Cloud & SRE Bootcamp',
        hours: '45 Hours (Live Production Infrastructure)',
        modules: [
          { day: 'Phase 1', title: 'Infrastructure as Code (IaC) with Terraform', desc: 'Provisioning VPCs, subnets, database clusters, and S3 buckets with declarative Terraform.' },
          { day: 'Phase 2', title: 'Kubernetes (K8s) Cluster Architecture & Deployments', desc: 'Pods, Services, Ingress controllers, ConfigMaps, Secrets, and Persistent Volumes.' },
          { day: 'Phase 3', title: 'Helm Charts, GitOps & Canary Deployments', desc: 'Packaging microservices with Helm, ArgoCD GitOps sync, and progressive traffic splitting.' },
          { day: 'Capstone', title: 'Multi-Stage Cloud Microservice Rollout', desc: 'Automated build, test, scan, and deploy pipeline with zero downtime.' }
        ],
        deliverable: 'Production Terraform repository, Kubernetes Helm charts, and Govt. MSME Credentials.'
      },
      durationDays30: {
        title: '30-Day Master SRE & Cloud Architect Track',
        hours: '90 Hours (Deep DevOps + 1-on-1 Mentorship)',
        modules: [
          { day: 'Week 1', title: 'Advanced Linux Internals & Enterprise Networking', desc: 'Kernel namespaces, cgroups, eBPF telemetry, DNS routing, and BGP cloud gateways.' },
          { day: 'Week 2', title: 'Production Kubernetes Cluster Hardening & Istio Mesh', desc: 'Mutual TLS (mTLS) service mesh, NetworkPolicies, RBAC, and cluster autoscaling (HPA/KEDA).' },
          { day: 'Week 3', title: 'Full Observability Stack: Prometheus, Grafana & Jaeger', desc: 'Distributed tracing, SLI/SLA alert rules, automated runbooks, and chaos engineering experiments.' },
          { day: 'Week 4', title: 'Disaster Recovery, Defense Review & LOR Signing', desc: 'Multi-region failover testing, architecture defense presentation, Senior LOR, and SRE mock interviews.' }
        ],
        deliverable: 'Production SRE portfolio, verified infrastructure blueprints on AWS, Senior LOR, and hiring network access.'
      }
    }
  }
];

export const InternshipsDeepDive: React.FC<InternshipsDeepDiveProps> = ({
  lang = 'en',
  onOpenInquiryWithProgram,
  onSelectCategoryDetail,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<DeepDiveTrack | null>(null);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [isMSMEModalOpen, setIsMSMEModalOpen] = useState(false);
  const [selectedDurationTab, setSelectedDurationTab] = useState<5 | 15 | 30>(15);

  // Fast Apply State
  const [isFastApplyOpen, setIsFastApplyOpen] = useState(false);
  const [applyTrack, setApplyTrack] = useState<DeepDiveTrack>(MODULAR_TRACKS[0]);
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    collegeOrOrg: '',
    duration: '15 Days Track',
  });
  const [applyStatus, setApplyStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [applyTicket, setApplyTicket] = useState('');
  const [copiedTicket, setCopiedTicket] = useState(false);

  const handleOpenSyllabus = (track: DeepDiveTrack) => {
    setSelectedTrack(track);
    setSelectedDurationTab(15);
    setIsSyllabusOpen(true);
  };

  const handleOpenFastApply = (track: DeepDiveTrack) => {
    setApplyTrack(track);
    setApplyForm((prev) => ({ ...prev, duration: '15 Days Track' }));
    setApplyStatus('idle');
    setIsFastApplyOpen(true);
  };

  const handleFastApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name.trim() || !applyForm.email.trim() || !applyForm.phone.trim()) return;

    setApplyStatus('submitting');
    const newTicket = `MNX-INT-${Math.floor(100000 + Math.random() * 900000)}`;
    setApplyTicket(newTicket);

    const sheetPayload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name: applyForm.name,
      email: applyForm.email,
      phone: applyForm.phone,
      programType: "AI Internship Track",
      program: `${applyTrack.title} (${applyForm.duration})`,
      dynamicVal: newTicket,
      message: `Organization/College: ${applyForm.collegeOrOrg || 'N/A'}. Fast application via AI Internships Deep-Dive Portal.`,
      source: "AI Internships Deep-Dive",
      url: typeof window !== 'undefined' ? window.location.href : 'https://monixsoftware.com'
    };

    try {
      const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzB_OxIcpvXWgqw2hkoDc9u8mrROqsvgRURUhd1l-G5MMQ4n30fxt-ch7C_njXYrXgU1A/exec";
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(sheetPayload)], { type: 'text/plain' });
        navigator.sendBeacon(GOOGLE_SHEET_WEBAPP_URL, blob);
      } else {
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload)
        }).catch(() => {});
      }

      // Telegram Bot Alert
      const TELEGRAM_BOT_TOKEN = "8251796240:AAGPRIAZH50aUl6Vlmtu1ZKOFmANOiH2lYc";
      const TELEGRAM_CHAT_ID = "-1003676902980";
      const telegramMsg = `🎓 *NEW INTERNSHIP APPLICATION*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🎫 *Ticket:* \`${newTicket}\`\n` +
        `🔬 *Track:* ${applyTrack.title}\n` +
        `⏱️ *Duration:* ${applyForm.duration}\n` +
        `👤 *Candidate:* ${applyForm.name}\n` +
        `📧 *Email:* ${applyForm.email}\n` +
        `📱 *Phone:* ${applyForm.phone}\n` +
        `🏫 *College/Org:* ${applyForm.collegeOrOrg || 'Not specified'}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🛡️ Govt. of India MSME Verified Track • Live Production Labs`;

      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramMsg, parse_mode: 'Markdown' })
      }).catch(() => {});

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F2FE', '#10B981', '#6366F1', '#F8FAFC']
        });
      } catch (err) {}

      setApplyStatus('success');
    } catch (err) {
      setApplyStatus('success');
    }
  };

  const getAccentBorderClass = (color: DeepDiveTrack['accentColor']) => {
    switch (color) {
      case 'emerald':
        return 'hover:border-emerald-400/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]';
      case 'indigo':
        return 'hover:border-indigo-400/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]';
      case 'amber':
        return 'hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]';
      case 'cyan':
      default:
        return 'hover:border-[#00F2FE]/60 hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]';
    }
  };

  const getBadgeStyle = (color: DeepDiveTrack['accentColor']) => {
    switch (color) {
      case 'emerald':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'indigo':
        return 'text-indigo-300 bg-indigo-500/15 border-indigo-500/30';
      case 'amber':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'cyan':
      default:
        return 'text-[#00F2FE] bg-[#00F2FE]/10 border-[#00F2FE]/30';
    }
  };

  return (
    <section className="bg-[#07090E] text-[#F8FAFC] relative overflow-hidden py-10 sm:py-14 lg:py-24 selection:bg-[#00F2FE]/30 selection:text-white">
      {/* Background Cyber Grid & Lighting Orbs */}
      <div className="absolute inset-0 cyber-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-emerald-500/10 via-[#00F2FE]/15 to-[#6366F1]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            TRUST SIGNALS: MSME VERIFIED & PRODUCTION METRICS BAR
           ======================================================== */}
        <div className="mb-8 sm:mb-12 lg:mb-20 space-y-4 sm:space-y-6">
          
          {/* Headline Kicker with Emerald Verified Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Prominent Govt. of India MSME Verified Badge */}
              <div 
                onClick={() => setIsMSMEModalOpen(true)}
                className="group cursor-pointer inline-flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-mono font-bold backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:border-emerald-400 transition-all hover:scale-105"
              >
                <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
                </div>
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="tracking-wide uppercase">Govt. of India MSME Verified</span>
                <span className="text-emerald-500/70 text-[9px] sm:text-[10px]">| Reg: UDYAM-TN-02-0198421</span>
              </div>

              {/* QR Verification Badge */}
              <div 
                onClick={() => setIsMSMEModalOpen(true)}
                className="cursor-pointer inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#111827]/80 border border-white/10 hover:border-[#00F2FE]/40 text-slate-300 hover:text-white text-[10px] sm:text-xs font-mono transition-all"
              >
                <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F2FE]" />
                <span>Tamper-Proof QR</span>
              </div>
            </div>

            {/* University & Corporate Credibility Tag */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-mono text-slate-400">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>ISO 9001:2015 Quality Management Certified</span>
            </div>
          </div>

          {/* Section Main Title */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-4">
            <h2 className="font-cinzel text-xl sm:text-2xl lg:text-4xl font-black text-white tracking-tight">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-sky-300 to-emerald-400">Tech Labs</span> & AI Internships
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto">
              Master hands-on cloud architectures, autonomous AI agents, and cyber defense under senior principal engineers. Built on zero-compromise production sandboxes with verifiable Government of India MSME credentials.
            </p>
          </div>

          {/* Live Production Deployment Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-2 sm:pt-4">
            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111827]/70 backdrop-blur-xl border border-white/10 hover:border-[#00F2FE]/40 transition-all text-center space-y-0.5 sm:space-y-1 shadow-inner">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-[#00F2FE]">1,420+</span>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">Engineers Certified</p>
              <div className="pt-1 flex items-center justify-center space-x-1 text-[9px] sm:text-[10px] text-emerald-400 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                <span>Govt. MSME Seal</span>
              </div>
            </div>

            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111827]/70 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition-all text-center space-y-0.5 sm:space-y-1 shadow-inner">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-emerald-400">98.7%</span>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">University Approval</p>
              <div className="pt-1 flex items-center justify-center space-x-1 text-[9px] sm:text-[10px] text-slate-400 font-mono">
                <span>Academic Credits</span>
              </div>
            </div>

            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111827]/70 backdrop-blur-xl border border-white/10 hover:border-indigo-400/40 transition-all text-center space-y-0.5 sm:space-y-1 shadow-inner">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-indigo-300">100%</span>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">Live Production Code</p>
              <div className="pt-1 flex items-center justify-center space-x-1 text-[9px] sm:text-[10px] text-cyan-300 font-mono">
                <Terminal className="w-3 h-3" />
                <span>Zero Slides</span>
              </div>
            </div>

            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111827]/70 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all text-center space-y-0.5 sm:space-y-1 shadow-inner">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-amber-400">&lt; 48h</span>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">Certificate Dispatch</p>
              <div className="pt-1 flex items-center justify-center space-x-1 text-[9px] sm:text-[10px] text-amber-300 font-mono">
                <Clock className="w-3 h-3" />
                <span>Cryptographic QR</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            MODULAR SYLLABUS TRACK CARDS (4 CORE TRACKS)
           ======================================================== */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#00F2FE] bg-[#00F2FE]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#00F2FE]/20 font-semibold">
                Available Cohort Tracks
              </span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-1.5 sm:mt-2">
                Production-Ready Engineering Curriculum
              </h3>
            </div>

            <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F2FE]" />
              <span>Available in: <strong>5 Days</strong> • <strong>15 Days</strong> • <strong>30 Days</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {MODULAR_TRACKS.map((track) => {
              return (
                <div
                  key={track.id}
                  className={`group relative rounded-xl sm:rounded-2xl lg:rounded-3xl p-3.5 sm:p-6 lg:p-8 bg-[#111827]/70 backdrop-blur-2xl border border-white/10 transition-all duration-300 flex flex-col justify-between ${getAccentBorderClass(
                    track.accentColor
                  )}`}
                >
                  {/* Ambient Hover Aura */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[#00F2FE]/5 via-transparent to-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="space-y-3.5 sm:space-y-5">
                    {/* Top Row: Track Badge, Duration & MSME Seal */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${getBadgeStyle(
                            track.accentColor
                          )} flex items-center space-x-1.5`}
                        >
                          <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{track.badge}</span>
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                          5 - 30 Days
                        </span>
                      </div>

                      <div className="inline-flex items-center space-x-1 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] sm:text-[10px] font-mono font-semibold">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>MSME Verified</span>
                      </div>
                    </div>

                    {/* Track Title */}
                    <div>
                      <h4 className="text-base sm:text-xl lg:text-2xl font-black text-white group-hover:text-[#00F2FE] transition-colors leading-snug">
                        {track.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1.5 sm:mt-2 leading-relaxed">
                        {track.shortDesc}
                      </p>
                    </div>

                    {/* Lab Environment & Hardware Sandbox */}
                    <div className="p-3 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#07090E]/80 border border-white/10 space-y-1 font-mono text-xs">
                      <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-400 text-[10px] sm:text-[11px]">
                        <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00F2FE]" />
                        <span className="uppercase tracking-wider font-semibold">Sandbox Environment:</span>
                      </div>
                      <p className="text-[#F8FAFC] font-medium pl-4 sm:pl-5 text-xs">
                        {track.labEnvironment}
                      </p>
                    </div>

                    {/* Production Tech Stack Chips */}
                    <div className="space-y-1 sm:space-y-1.5">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Production Stack & Tooling:
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {track.stack.map((item) => (
                          <span
                            key={item}
                            className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Real Capstone Project Banner */}
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/90 to-[#07090E] border border-white/10 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Industry Capstone Project</span>
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400">
                          {track.metrics.hireRate}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {track.capstoneProject}
                      </h5>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed">
                        {track.capstoneOutcome}
                      </p>
                    </div>

                  </div>

                  {/* ========================================================
                      CONVERSION CTA: DUAL ACTION BUTTONS
                      ('View Syllabus' & 'Fast Apply →')
                     ======================================================== */}
                  <div className="mt-4 sm:mt-8 pt-3.5 sm:pt-6 border-t border-white/10 grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                    
                    {/* 1. View Syllabus Button with Sleek Dark Glass Border */}
                    <button
                      onClick={() => handleOpenSyllabus(track)}
                      className="group/btn w-full inline-flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#00F2FE]/50 text-slate-200 hover:text-white font-mono text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,242,254,0.15)] active:scale-95"
                    >
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover/btn:text-[#00F2FE] transition-colors" />
                      <span>View Syllabus</span>
                    </button>

                    {/* 2. Fast Apply Button with Electric Cyan Hover Glow */}
                    <button
                      onClick={() => handleOpenFastApply(track)}
                      className="w-full inline-flex items-center justify-center space-x-1.5 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#00F2FE] via-sky-400 to-[#6366F1] text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <span>Fast Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            BOTTOM ENTERPRISE CREDENTIALS & FAQ BANNER
           ======================================================== */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#111827]/90 via-[#07090E] to-[#111827]/90 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% University Acceptance Guarantee</span>
            </div>
            <h4 className="text-xl font-bold text-white">
              Need Corporate Enterprise Training or College Group Batches?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We offer turnkey curriculum alignment for university credit transfers, customized enterprise bootcamps, and institutional licensing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsMSMEModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-mono font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <QrCode className="w-4 h-4 text-[#00F2FE]" />
              <span>Inspect Sample Certificate</span>
            </button>

            <a
              href="https://wa.me/919025087129?text=Hello%20MONIX%20Team,%20I%20would%20like%20to%20discuss%20the%20AI%20Internship%20Programs."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold text-xs font-mono transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Talk to Admissions Lead</span>
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================
          SYLLABUS DETAILED MODAL
         ======================================================== */}
      {isSyllabusOpen && selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div 
            onClick={() => setIsSyllabusOpen(false)}
            className="fixed inset-0 bg-[#07090E]/90 backdrop-blur-md"
          />

          <div className="relative w-full max-w-3xl bg-[#0B0F19] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100 flex flex-col max-h-[90vh]">
            {/* Top Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#00F2FE] via-[#6366F1] to-emerald-400" />

            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 relative">
              <button
                onClick={() => setIsSyllabusOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE]">
                  {selectedTrack.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Govt. MSME Accredited</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {selectedTrack.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {selectedTrack.shortDesc}
              </p>
            </div>

            {/* Duration Selector & Roadmap Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              
              {/* Duration Switcher */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Select Track Duration:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 15, 30].map((days) => (
                    <button
                      key={days}
                      onClick={() => setSelectedDurationTab(days as 5 | 15 | 30)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDurationTab === days
                          ? 'bg-[#00F2FE]/15 border-[#00F2FE] text-[#00F2FE] font-bold shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="block text-sm font-bold">{days} Days</span>
                      <span className="block text-[10px] font-mono opacity-80">
                        {days === 5 ? 'Sprint' : days === 15 ? 'Bootcamp' : 'Master Track'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Curriculum Breakdown */}
              {(() => {
                const cur = 
                  selectedDurationTab === 5 ? selectedTrack.curriculum.durationDays5 :
                  selectedDurationTab === 15 ? selectedTrack.curriculum.durationDays15 :
                  selectedTrack.curriculum.durationDays30;

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div>
                        <h4 className="text-base font-bold text-white">{cur.title}</h4>
                        <span className="text-xs font-mono text-[#00F2FE]">{cur.hours}</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        Live Guided Coding
                      </span>
                    </div>

                    <div className="space-y-3">
                      {cur.modules.map((mod, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#00F2FE]/20 text-[#00F2FE]">
                              {mod.day}
                            </span>
                            <span className="text-sm font-bold text-white">{mod.title}</span>
                          </div>
                          <p className="text-xs text-slate-300 pl-1">{mod.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Capstone Deliverable Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-mono font-bold uppercase">
                        <CheckCheck className="w-4 h-4" />
                        <span>Verified Deliverable & Outcomes</span>
                      </div>
                      <p className="text-xs text-slate-300">{cur.deliverable}</p>
                    </div>
                  </div>
                );
              })()}

            </div>

            {/* Modal Bottom CTA */}
            <div className="p-5 bg-slate-950 border-t border-white/10 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Limited cohort size: 25 seats / batch
              </span>
              <button
                onClick={() => {
                  setIsSyllabusOpen(false);
                  handleOpenFastApply(selectedTrack);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#6366F1] text-slate-950 font-bold text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              >
                <span>Enroll in {selectedTrack.title} →</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          FAST APPLY INTERACTIVE MODAL
         ======================================================== */}
      {isFastApplyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div 
            onClick={() => setIsFastApplyOpen(false)}
            className="fixed inset-0 bg-[#07090E]/90 backdrop-blur-md"
          />

          <div className="relative w-full max-w-xl bg-[#0B0F19] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100 flex flex-col">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#00F2FE] to-[#6366F1]" />

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Govt. MSME Priority Enrollment</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Fast Apply: {applyTrack.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct admission desk • Letter of Recommendation • Verifiable QR Certificate
                  </p>
                </div>

                <button
                  onClick={() => setIsFastApplyOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {applyStatus === 'success' ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Application Dispatched</h4>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto">
                      Your fast application has been registered with the admissions engineering desk.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/10 text-left font-mono text-xs space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Tracking Ticket:</span>
                      <span className="text-[#00F2FE] font-bold">{applyTicket}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Selected Program:</span>
                      <span className="text-white">{applyTrack.title}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Track Duration:</span>
                      <span className="text-emerald-400">{applyForm.duration}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <a
                      href={`https://wa.me/919025087129?text=Hello%20MONIX%20Admissions,%20I%20have%20submitted%20my%20application%20for%20${encodeURIComponent(applyTrack.title)}%20with%20Ticket%20${applyTicket}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono flex items-center space-x-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Instant WhatsApp Clearance</span>
                    </a>

                    <button
                      onClick={() => setIsFastApplyOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white text-xs font-mono"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFastApplySubmit} className="space-y-4">
                  {/* Track Duration Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">
                      Cohort Track Duration:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['5 Days Sprint', '15 Days Track', '30 Days Master'].map((dur) => (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setApplyForm({ ...applyForm, duration: dur })}
                          className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                            applyForm.duration === dur
                              ? 'bg-[#00F2FE]/15 border-[#00F2FE] text-[#00F2FE] font-bold'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {dur}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-slate-300">
                      Full Name <span className="text-[#00F2FE]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      placeholder="e.g. Arun Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-slate-300">
                        Email Address <span className="text-[#00F2FE]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={applyForm.email}
                        onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                        placeholder="arun@university.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-slate-300">
                        Phone / WhatsApp <span className="text-[#00F2FE]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={applyForm.phone}
                        onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                        placeholder="+91 90000 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                      />
                    </div>
                  </div>

                  {/* College / Organization */}
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-slate-300">
                      College / University or Organization
                    </label>
                    <input
                      type="text"
                      value={applyForm.collegeOrOrg}
                      onChange={(e) => setApplyForm({ ...applyForm, collegeOrOrg: e.target.value })}
                      placeholder="e.g. Anna University / B.E CSE"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={applyStatus === 'submitting'}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00F2FE] via-sky-400 to-[#6366F1] text-slate-950 font-bold text-xs font-mono uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {applyStatus === 'submitting' ? (
                      <span>Dispatching Admission Scope...</span>
                    ) : (
                      <>
                        <span>Submit Fast Application</span>
                        <ArrowRight className="w-4 h-4 text-slate-950" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Govt. of India MSME Registered Entity • Official LOR</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          GOVT MSME VERIFICATION MODAL SIMULATOR
         ======================================================== */}
      {isMSMEModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div 
            onClick={() => setIsMSMEModalOpen(false)}
            className="fixed inset-0 bg-[#07090E]/90 backdrop-blur-md"
          />

          <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100 flex flex-col">
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                      GOVERNMENT OF INDIA VERIFIED ENTITY
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      MSME & ISO Verified Credentials
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsMSMEModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-400 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Registration Record */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Enterprise Name:</span>
                  <span className="text-white font-bold">MONIX Software Solutions</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">MSME Udyam Registration:</span>
                  <span className="text-emerald-400 font-bold">UDYAM-TN-02-0198421</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Accreditation Body:</span>
                  <span className="text-slate-200">Ministry of Micro, Small and Medium Enterprises, Govt. of India</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">ISO Standard:</span>
                  <span className="text-cyan-400 font-bold">ISO 9001:2015 Quality Management Certified</span>
                </div>
              </div>

              {/* QR Verification Visual Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-900/50 to-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-5">
                <div className="p-3 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center shrink-0">
                  <div className="w-24 h-24 flex items-center justify-center bg-slate-950 text-white rounded-lg p-2">
                    <QrCode className="w-20 h-20 text-emerald-400" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-800 mt-1 uppercase">
                    Tamper-Proof QR
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-white text-sm">
                    How Cryptographic QR Verification Works:
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Every certificate contains an immutable cryptographic hash tied to the candidate's GitHub capstone repo.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Universities and corporate HR portals scan the QR code for instant 1-click authenticity verification.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Backed by Govt. of India statutory compliance and ISO 9001:2015 quality standards.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setIsMSMEModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono"
                >
                  Close Verification Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default InternshipsDeepDive;

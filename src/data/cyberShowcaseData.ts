export interface CyberDomain {
  id: string;
  title: string;
  badge: string;
  badgeVariant: 'cyan' | 'indigo' | 'emerald' | 'amber';
  desc: string;
  tags: string[];
  category: 'security' | 'ai' | 'fintech' | 'cloud' | 'healthcare';
  architecture: {
    protocol: string;
    encryption: string;
    latency: string;
    compliance: string;
  };
  deliverables: string[];
  techStack: string[];
  sampleTopics: string[];
}

export interface InternshipTrack {
  id: string;
  title: string;
  badge: string;
  isSpecialized?: boolean;
  category: 'specialized' | 'core-ai' | 'engineering' | 'web-mobile';
  shortDesc: string;
  labEnvironment: string;
  tags: string[];
  tools: string[];
  capstoneProject: string;
  curriculum: {
    durationDays5: {
      title: string;
      hours: string;
      modules: string[];
      outcome: string;
    };
    durationDays15: {
      title: string;
      hours: string;
      modules: string[];
      outcome: string;
    };
    durationDays30: {
      title: string;
      hours: string;
      modules: string[];
      outcome: string;
    };
  };
}

export const CYBER_PROJECT_DOMAINS: CyberDomain[] = [
  {
    id: 'healthcare-medical-portals',
    title: 'Healthcare & Medical Portals',
    badge: 'HIPAA COMPLIANT',
    badgeVariant: 'emerald',
    desc: 'AI disease prediction, EHR portals, telemedicine.',
    tags: ['HEALTHCARE AI', 'EHR PORTALS', 'TELEHEALTH'],
    category: 'healthcare',
    architecture: {
      protocol: 'FHIR HL7 / WebRTC',
      encryption: 'AES-256 at Rest / TLS 1.3',
      latency: '< 45ms Telemetry Stream',
      compliance: 'HIPAA BAA & ISO 27799 Ready',
    },
    deliverables: [
      '100% Tested React / Next.js Telehealth Portal',
      'AI Diagnostic & Symptom Classifier Model',
      'EHR Patient Records Database Schema (PostgreSQL)',
      '50+ Page IEEE Standard Project Report & Viva Deck',
      'Live Remote AnyDesk Sandbox Deployment'
    ],
    techStack: ['Next.js 15', 'Python FastAPI', 'TensorFlow', 'PostgreSQL', 'WebRTC', 'Tailwind CSS'],
    sampleTopics: [
      'AI Early Diabetic Retinopathy Detection & EHR Portal',
      'End-to-End Encrypted Teleconsultation & Prescription Ledger',
      'Hospital Bed & Oxygen Telemetry Real-time Dashboard'
    ]
  },
  {
    id: 'ecommerce-retail-marketplaces',
    title: 'E-Commerce & Retail Marketplaces',
    badge: 'STRIPE • RAZORPAY',
    badgeVariant: 'amber',
    desc: 'Multi-vendor marketplaces, AI recommendations, dynamic search.',
    tags: ['WEB MARKETPLACES', 'STRIPE / UPI', 'STOREFRONT APPS'],
    category: 'fintech',
    architecture: {
      protocol: 'GraphQL & REST Webhooks',
      encryption: 'HMAC-SHA256 Webhook Verification',
      latency: '< 18ms Edge Cache CDN',
      compliance: 'PCI-DSS SAQ-A Certified Flow',
    },
    deliverables: [
      'Multi-Vendor Vendor Management Dashboard',
      'Vector-Powered AI Semantic Product Search',
      'Automated Razorpay / Stripe / UPI Webhook Pipeline',
      'Complete Order Management & Inventory Lifecycle',
      'University Synopsis, IEEE Paper & Oral Viva Voce Prep'
    ],
    techStack: ['React 19', 'Next.js 15', 'Stripe / Razorpay API', 'Supabase', 'Redis Queue', 'Tailwind CSS'],
    sampleTopics: [
      'Multi-Tenant Artisan Marketplace with AI Pricing Engine',
      'High-Throughput Flash Sale Queue with Redis Distributed Lock',
      'Visual Search & Recommendation Engine for Fast Fashion Retail'
    ]
  },
  {
    id: 'generative-ai-autonomous-agents',
    title: 'Generative AI & Autonomous Agents',
    badge: 'LLM • VECTOR RAG',
    badgeVariant: 'cyan',
    desc: 'Web-based LLMs, vector database search, automated workflows.',
    tags: ['AUTONOMOUS AGENTS', 'LLM / RAG', 'LANGCHAIN'],
    category: 'ai',
    architecture: {
      protocol: 'gRPC / SSE Streaming',
      encryption: 'Zero Data Retention API Gateway',
      latency: '< 120ms First Token TTFT',
      compliance: 'Responsible AI & OWASP Top 10 for LLMs',
    },
    deliverables: [
      'LangChain / LangGraph Autonomous Multi-Agent Loop',
      'Pinecone / pgvector Hybrid Vector Search Engine',
      'Modern Cyber-Glass Chat & Canvas User Interface',
      'Full Python / Node.js Microservices Source Code',
      'Comprehensive Research Documentation & IEEE Blueprint'
    ],
    techStack: ['Google Gemini API', 'LangChain', 'Pinecone / Qdrant', 'Next.js 15', 'FastAPI', 'Docker'],
    sampleTopics: [
      'Autonomous Code Review & Vulnerability Mitigation Agent',
      'Enterprise Document Knowledge Base with Hybrid RAG & Re-ranking',
      'Multi-Agent Market Intelligence & Synthetic Research Analyst'
    ]
  },
  {
    id: 'security-pentesting-defense',
    title: 'Security & Pentesting Defense',
    badge: 'ZERO-TRUST DEFENSE',
    badgeVariant: 'cyan',
    desc: 'Automated penetration testing, zero-trust access, SOC monitoring.',
    tags: ['WEB PENTESTING', 'OAUTH & JWT', 'API PROTECTION'],
    category: 'security',
    architecture: {
      protocol: 'mTLS & WireGuard Tunneling',
      encryption: 'Ed25519 & Argon2id Hashing',
      latency: '< 5ms Firewall Intercept Rate',
      compliance: 'NIST CSF & MITRE ATT&CK Mapped',
    },
    deliverables: [
      'Automated Web Penetration & Vulnerability Scanner CLI/GUI',
      'Zero-Trust Identity Provider with JWT / WebAuthn FIDO2',
      'Simulated SOC Telemetry & Real-Time Incident Dashboard',
      'Complete Exploit Analysis & Remediation Documentation',
      'Ready-to-Present PPT with Live Lab Demonstration'
    ],
    techStack: ['Python Scapy', 'Go', 'Next.js 15', 'Docker', 'OWASP ZAP Core', 'Tailwind CSS'],
    sampleTopics: [
      'AI-Powered Automated Penetration Testing & Report Engine',
      'Zero-Trust Microsegmentation & Adaptive MFA Access Portal',
      'SIEM Threat Intelligence & Web Attack Honeypot Platform'
    ]
  },
  {
    id: 'fintech-high-frequency-portals',
    title: 'FinTech & High-Frequency Portals',
    badge: 'PCI-DSS READY',
    badgeVariant: 'indigo',
    desc: 'Banking web portals, payment gateways, cryptographically secure ledgers.',
    tags: ['PAYMENT GATEWAYS', 'BANKING APPS', 'FINTECH PORTALS'],
    category: 'fintech',
    architecture: {
      protocol: 'WebSocket / ISO 8583 Messaging',
      encryption: 'RSA-4096 / End-to-End Signed Payloads',
      latency: '< 15ms Settlement Ledger Time',
      compliance: 'PCI-DSS v4.0 & RBI Cyber Guidelines',
    },
    deliverables: [
      'Double-Entry Cryptographic Accounting Engine',
      'Real-Time Fraud Detection & Anomaly Classifier',
      'Interactive Banking & Loan Underwriting Dashboard',
      'Full SQL Ledger Schema with Audit Trails & Triggers',
      'IEEE Publication Draft, Comprehensive Viva Voce Guide'
    ],
    techStack: ['Node.js', 'React 19', 'PostgreSQL TimescaleDB', 'Redis Streams', 'Next.js 15'],
    sampleTopics: [
      'Distributed High-Frequency Peer-to-Peer Settlement Ledger',
      'AI Anti-Money Laundering (AML) & Suspicious Activity Watchdog',
      'Algorithmic Portfolio Rebalancing & Risk Advisory Portal'
    ]
  },
  {
    id: 'cloud-devops-saas-platforms',
    title: 'Cloud DevOps & SaaS Web Platforms',
    badge: '99.99% CLOUD SLA',
    badgeVariant: 'indigo',
    desc: 'Multi-tenant SaaS, cloud observability, Docker/K8s clusters.',
    tags: ['SAAS APPS', 'CLOUD DASHBOARDS', 'DOCKER CI/CD'],
    category: 'cloud',
    architecture: {
      protocol: 'OpenTelemetry / Prometheus Scrape',
      encryption: 'mTLS Istio Service Mesh',
      latency: '99.99% Uptime Guarantee SLA',
      compliance: 'SOC 2 Type II Architecture Pattern',
    },
    deliverables: [
      'Multi-Tenant Tenant Isolation Database Architecture',
      'Self-Healing Docker & Kubernetes Helm Deployment Charts',
      'Real-Time Cloud Observability & CPU/Memory Telemetry Dashboard',
      'Automated GitHub Actions CI/CD with Security Linting',
      'Complete Academic / Startup Production Handoff Package'
    ],
    techStack: ['Kubernetes', 'Docker', 'Next.js 15', 'Prometheus / Grafana', 'Terraform', 'PostgreSQL'],
    sampleTopics: [
      'Multi-Tenant B2B SaaS Boilerplate with Tenant-Isolated Subdomains',
      'Automated GitOps Continuous Deployment with Canary Rollouts',
      'Cloud Resource Cost Optimization & Carbon Footprint Monitor'
    ]
  }
];

export const INTERNSHIP_TRACKS: InternshipTrack[] = [
  // 2 Specialized Flagship Tracks
  {
    id: 'cybersecurity-ethical-hacking',
    title: 'Next-Gen Cybersecurity & Ethical Hacking (Hands-on SOC Lab)',
    badge: 'FLAGSHIP SOC LAB',
    isSpecialized: true,
    category: 'specialized',
    shortDesc: 'Hands-on offensive & defensive security, real-world web exploitation, vulnerability audits, and virtual SOC lab operations.',
    labEnvironment: 'Dedicated Kali Linux & Virtual SOC Sandbox Cloud Pods',
    tags: ['PENETRATION TESTING', 'VIRTUAL SOC LAB', 'OWASP TOP 10', 'ZERO-TRUST'],
    tools: ['Kali Linux', 'BurpSuite Pro', 'Wireshark', 'Metasploit', 'Nmap', 'OWASP ZAP', 'Python Security'],
    capstoneProject: 'Enterprise Web Application Penetration Test & Automated Threat Response SOC Portal',
    curriculum: {
      durationDays5: {
        title: '5-Day Defensive Cyber Sprint',
        hours: '15 Hours (3 hrs/day live labs)',
        modules: [
          'Day 1: Modern Threat Landscape, Linux Kernel Hardening & Network Recon',
          'Day 2: Web Application Security Fundamentals & OWASP Top 10 Breakdown',
          'Day 3: Burp Suite Mastery & Intercepting Authentication Tokens',
          'Day 4: Injection Vulnerabilities (SQLi, XSS, CSRF) & Zero-Trust Defense',
          'Day 5: Capstone Audit Report Writing & MSME QR Credential Verification'
        ],
        outcome: 'Practical defensive testing knowledge, vulnerability assessment report, and verified MSME Certificate.'
      },
      durationDays15: {
        title: '15-Day Ethical Hacking Bootcamp',
        hours: '45 Hours (Hands-on Labs + Guided Mentorship)',
        modules: [
          'Week 1: Network Exploitation, Port Scanning, Packet Sniffing (Wireshark) & Firewalls',
          'Week 2: Advanced Web Vulnerability Scanning, API Security (OAuth2/JWT flaws) & Broken Access',
          'Week 3: Virtual SOC Operations, SIEM Log Analysis, Incident Handling & Defense-in-Depth',
          'Capstone: Live simulated enterprise penetration test with full CVE documentation'
        ],
        outcome: 'End-to-end hands-on hacking capability, comprehensive portfolio audit report, and GitHub repository.'
      },
      durationDays30: {
        title: '30-Day Full SOC Immersion & Red/Blue Teaming',
        hours: '90 Hours (Industry Simulation + Senior Security Architect 1-on-1)',
        modules: [
          'Week 1: Cyber Fundamentals, Reconnaissance & Advanced Python for Penetration Testers',
          'Week 2: Web & Cloud Infrastructure Exploitation (AWS/Docker container breakout)',
          'Week 3: Defensive Engineering, SIEM Rules (Elastic/Wazuh), Intrusion Detection & Mitigation',
          'Week 4: Real-world Capstone Deployment, LOR Issuance, Mock Technical Interviews & Resume Review'
        ],
        outcome: 'Production-ready cybersecurity profile, real SOC incident logs, GitHub portfolio, and senior LOR.'
      }
    }
  },
  {
    id: 'prompt-engineering-llms-rag',
    title: 'Next-Gen Prompt Engineering & LLMs (LangChain & Vector RAG)',
    badge: 'GENAI VECTOR LAB',
    isSpecialized: true,
    category: 'specialized',
    shortDesc: 'Production AI engineering with LangChain, LangGraph, pgvector/Pinecone RAG, and autonomous agent systems.',
    labEnvironment: 'High-Speed Gemini & HuggingFace Inference API Sandboxes',
    tags: ['LANGCHAIN', 'VECTOR RAG', 'AUTONOMOUS AGENTS', 'PROMPT LAB'],
    tools: ['Google Gemini API', 'LangChain', 'Pinecone', 'LangGraph', 'Python', 'FastAPI', 'Next.js 15'],
    capstoneProject: 'Enterprise Hybrid Vector RAG Assistant with Autonomous Agent Task Execution',
    curriculum: {
      durationDays5: {
        title: '5-Day GenAI & Prompt Sprint',
        hours: '15 Hours (3 hrs/day live labs)',
        modules: [
          'Day 1: LLM Architecture, Few-Shot Prompting, Chain-of-Thought & System Instructions',
          'Day 2: Embeddings, Cosine Similarity & Vector Database Fundamentals',
          'Day 3: Building your first Retrieval-Augmented Generation (RAG) Pipeline',
          'Day 4: Guardrails, Output Parsing & Function Calling with Gemini API',
          'Day 5: Production Deployment & Verifiable MSME QR Credential Issuance'
        ],
        outcome: 'Working RAG knowledge base prototype, prompt evaluation framework, and MSME certification.'
      },
      durationDays15: {
        title: '15-Day LLM & Vector Systems Bootcamp',
        hours: '45 Hours (Live Labs + Architecture Workshops)',
        modules: [
          'Week 1: Advanced Prompt Engineering, Structured Outputs (Pydantic) & Token Economics',
          'Week 2: Enterprise RAG: Chunking Strategies, Metadata Filtering, Pinecone / Qdrant Integration',
          'Week 3: Autonomous Agents with LangGraph, Tool Use, Dynamic Memory & Web Browsing',
          'Capstone: Full-stack AI agent dashboard deployed to Vercel and Cloud Run'
        ],
        outcome: 'Two deployed AI applications, portfolio-ready GitHub repository, and verifiable QR certificate.'
      },
      durationDays30: {
        title: '30-Day Full Autonomous AI Architect Track',
        hours: '90 Hours (Deep Engineering + Enterprise Project)',
        modules: [
          'Week 1: Core GenAI Foundations, Tokenizers, Advanced Embedding Fine-Tuning & Benchmarking',
          'Week 2: High-Performance Vector Databases, Hybrid Search (Dense + Sparse), Re-ranking Models',
          'Week 3: Multi-Agent Architectures, Human-in-the-Loop Feedback Loops, Evaluators (Ragas)',
          'Week 4: Enterprise Capstone Launch, Scalability Testing, LOR, Technical Interview Mentorship'
        ],
        outcome: 'Enterprise-grade autonomous AI portfolio, industry recommendation letter, and job-ready skills.'
      }
    }
  },

  // 6 Core Engineering & AI Tracks
  {
    id: 'computer-science-engineering-cse',
    title: 'Computer Science & Engineering (CSE)',
    badge: 'CORE ENGINEERING',
    category: 'engineering',
    shortDesc: 'Systems architecture, data structures, cloud microservices, and modern high-performance engineering practices.',
    labEnvironment: 'Linux Cloud Workstations with Docker & VS Code Remote',
    tags: ['SYSTEMS ARCHITECTURE', 'ALGORITHMS', 'CLOUD SERVICES', 'DATABASE ENGINE'],
    tools: ['C++', 'Python', 'Docker', 'PostgreSQL', 'Git', 'Linux CLI'],
    capstoneProject: 'Distributed Task Queue System with Real-Time Worker Pool & Failover Monitoring',
    curriculum: {
      durationDays5: {
        title: '5-Day Systems Fast-Track',
        hours: '15 Hours',
        modules: [
          'Day 1: Clean Code, Git Workflow & Architecture Patterns',
          'Day 2: Advanced Relational Database Design & Index Optimization',
          'Day 3: REST & gRPC Microservices Foundations',
          'Day 4: Containerization with Docker & Multi-Stage Builds',
          'Day 5: Capstone Review, Benchmarking & MSME Certificate'
        ],
        outcome: 'Clean architecture mastery and verifiable MSME credentials.'
      },
      durationDays15: {
        title: '15-Day CSE Systems Bootcamp',
        hours: '45 Hours',
        modules: [
          'Week 1: Data Structures, Concurrency & High-Throughput I/O',
          'Week 2: Microservices, Distributed Caching (Redis), Message Queues',
          'Week 3: Cloud Deployment, Automated CI/CD Pipelines & Testing',
          'Capstone: Production-grade scalable web service'
        ],
        outcome: 'Full systems engineering project and GitHub portfolio.'
      },
      durationDays30: {
        title: '30-Day Full-Stack Enterprise CSE Track',
        hours: '90 Hours',
        modules: [
          'Week 1: Advanced Algorithms & Memory Optimization',
          'Week 2: Distributed Systems Design & Event-Driven Architecture',
          'Week 3: Database Sharding, Kubernetes Orchestration & Observability',
          'Week 4: Capstone Release, LOR, and Mock Engineering Interviews'
        ],
        outcome: 'Senior-level engineering project, LOR, and MSME verified badge.'
      }
    }
  },
  {
    id: 'ai-data-science',
    title: 'AI & Data Science',
    badge: 'DATA INTELLIGENCE',
    category: 'core-ai',
    shortDesc: 'Statistical data modeling, automated ETL pipelines, predictive analytics, and interactive dashboard engineering.',
    labEnvironment: 'JupyterLab Cloud GPUs with Pandas & Scikit-Learn',
    tags: ['PREDICTIVE ANALYTICS', 'ETL PIPELINES', 'PANDAS / NUMPY', 'BIG DATA'],
    tools: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Streamlit', 'PostgreSQL', 'Tableau'],
    capstoneProject: 'End-to-End Predictive Analytics Engine with Live Automated Data Cleansing Pipeline',
    curriculum: {
      durationDays5: {
        title: '5-Day Data Analytics Sprint',
        hours: '15 Hours',
        modules: [
          'Day 1: Exploratory Data Analysis & Advanced Pandas Techniques',
          'Day 2: Feature Engineering, Imputation & Outlier Detection',
          'Day 3: Supervised Regression & Classification Modeling',
          'Day 4: Interactive Web Dashboards with Streamlit',
          'Day 5: Business Insights Presentation & MSME Verification'
        ],
        outcome: 'Complete EDA notebook and interactive web dashboard.'
      },
      durationDays15: {
        title: '15-Day Data Science Bootcamp',
        hours: '45 Hours',
        modules: [
          'Week 1: In-depth Statistics, Hypothesis Testing & Machine Learning Fundamentals',
          'Week 2: Advanced Feature Selection, Ensemble Methods (XGBoost/LightGBM)',
          'Week 3: Model Deployment as REST APIs & Real-Time Visualization',
          'Capstone: Live automated business intelligence prediction pipeline'
        ],
        outcome: 'Two machine learning projects and verified credentials.'
      },
      durationDays30: {
        title: '30-Day Production Data Scientist Track',
        hours: '90 Hours',
        modules: [
          'Week 1: Big Data Processing, Advanced Feature Pipelines & SQL Mastery',
          'Week 2: Deep Learning Foundations, Time-Series Forecasting & Anomaly Detection',
          'Week 3: MLOps: Model Versioning, Drift Detection & Automated Retraining',
          'Week 4: Enterprise Capstone Presentation, LOR, and Placement Assistance'
        ],
        outcome: 'Enterprise MLOps portfolio, recommendation letter, and job readiness.'
      }
    }
  },
  {
    id: 'ai-machine-learning-aiml',
    title: 'AI & Machine Learning (AI & ML)',
    badge: 'DEEP LEARNING',
    category: 'core-ai',
    shortDesc: 'Deep neural networks, computer vision, natural language processing, and model quantization for edge deployment.',
    labEnvironment: 'High-VRAM GPU Cloud Instances (PyTorch & CUDA)',
    tags: ['NEURAL NETWORKS', 'COMPUTER VISION', 'PYTORCH', 'NLP'],
    tools: ['PyTorch', 'TensorFlow', 'OpenCV', 'Hugging Face', 'FastAPI', 'ONNX'],
    capstoneProject: 'Real-Time Edge Computer Vision & NLP Multi-Modal Classification Engine',
    curriculum: {
      durationDays5: {
        title: '5-Day Machine Learning Sprint',
        hours: '15 Hours',
        modules: [
          'Day 1: ML Pipeline Fundamentals & Supervised Learning Algorithms',
          'Day 2: Neural Networks & Backpropagation with PyTorch',
          'Day 3: Image Classification with Convolutional Networks (CNNs)',
          'Day 4: Exporting Models with ONNX & FastAPI Serving',
          'Day 5: Capstone Demo & MSME QR Credential Verification'
        ],
        outcome: 'Live deployed neural network model and MSME certificate.'
      },
      durationDays15: {
        title: '15-Day Deep Learning Bootcamp',
        hours: '45 Hours',
        modules: [
          'Week 1: Advanced PyTorch, Custom Datasets & Data Augmentation',
          'Week 2: Computer Vision (Object Detection with YOLO) & Transfer Learning',
          'Week 3: NLP with Transformers (BERT/HuggingFace) & Fine-Tuning',
          'Capstone: Multi-Modal AI application with web frontend'
        ],
        outcome: 'Two deep learning projects and production API code.'
      },
      durationDays30: {
        title: '30-Day Production AI & ML Engineer Track',
        hours: '90 Hours',
        modules: [
          'Week 1: Mathematics of Deep Learning, Optimization & Loss Formulations',
          'Week 2: Advanced Generative Models (Diffusion / VAEs) & LLM Fine-Tuning (LoRA)',
          'Week 3: Model Quantization (4-bit/8-bit), TensorRT & Edge Optimization',
          'Week 4: Real-world Capstone Defense, LOR, and IEEE Paper Framing'
        ],
        outcome: 'Published IEEE paper draft, production AI portfolio, and LOR.'
      }
    }
  },
  {
    id: 'ai-powered-full-stack-web-dev',
    title: 'AI-Powered Full-Stack Web Development',
    badge: 'NEXT.JS 15 • REACT 19',
    category: 'web-mobile',
    shortDesc: 'Architect modern enterprise web platforms using Next.js 15, React 19, TypeScript, Tailwind v4, and AI API integrations.',
    labEnvironment: 'Vercel Preview Cloud & Supabase PostgreSQL Workspaces',
    tags: ['NEXT.JS 15', 'REACT 19', 'SUPABASE', 'AI INTEGRATION'],
    tools: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Node.js', 'Vercel'],
    capstoneProject: 'AI-Powered Collaborative SaaS Workspace with Real-Time Multi-User Sync',
    curriculum: {
      durationDays5: {
        title: '5-Day Modern Web Sprint',
        hours: '15 Hours',
        modules: [
          'Day 1: Modern React 19, Server Components & TypeScript Best Practices',
          'Day 2: Next.js 15 App Router, Server Actions & Dynamic Routing',
          'Day 3: Database Modeling with Supabase PostgreSQL & Auth',
          'Day 4: Integrating AI Endpoints (Streaming Chat, Summaries)',
          'Day 5: Production Deployment on Vercel & MSME Verification'
        ],
        outcome: 'Full-stack deployed web application and verifiable certificate.'
      },
      durationDays15: {
        title: '15-Day Full-Stack Web Bootcamp',
        hours: '45 Hours',
        modules: [
          'Week 1: Advanced UI Design with Tailwind CSS v4, Framer Motion & Responsive Layouts',
          'Week 2: Backend Architecture, Server Actions, Row-Level Security & Payment Gateway',
          'Week 3: Real-Time WebSockets, AI Copilot Features & Performance Optimization',
          'Capstone: Production B2B SaaS web portal with admin dashboard'
        ],
        outcome: 'Enterprise SaaS web application, clean GitHub code, and certificate.'
      },
      durationDays30: {
        title: '30-Day Elite Full-Stack Architect Track',
        hours: '90 Hours',
        modules: [
          'Week 1: Design Systems, Accessibility (a11y), Micro-Frontends & State Management',
          'Week 2: High-Performance Database Architecture, Redis Caching & Edge Functions',
          'Week 3: Advanced AI Workflows, Webhooks, Stripe/Razorpay Billing & Multi-Tenancy',
          'Week 4: Capstone Launch, Security Audits, Senior Engineer LOR, and Mock Interviews'
        ],
        outcome: 'Commercial-grade SaaS product, Senior LOR, and job placement support.'
      }
    }
  },
  {
    id: 'ai-assisted-mobile-app-architecture',
    title: 'AI-Assisted Mobile App Architecture',
    badge: 'CROSS-PLATFORM',
    category: 'web-mobile',
    shortDesc: 'Cross-platform native iOS & Android applications using Flutter and React Native with on-device AI and push notification services.',
    labEnvironment: 'Cloud Android Emulators & Firebase Backend Cloud',
    tags: ['FLUTTER', 'REACT NATIVE', 'ON-DEVICE AI', 'FIREBASE'],
    tools: ['Flutter', 'Dart', 'React Native', 'Firebase', 'SQLite', 'REST APIs'],
    capstoneProject: 'AI-Driven Smart Health & Task Companion Mobile App with Offline Synchronization',
    curriculum: {
      durationDays5: {
        title: '5-Day Mobile App Sprint',
        hours: '15 Hours',
        modules: [
          'Day 1: Mobile UI Paradigms, Flutter / React Native Setup & State Management',
          'Day 2: Screen Navigation, Forms & Responsive Device Layouts',
          'Day 3: REST API Consumption & Local Cache Storage',
          'Day 4: AI Feature Integration (Voice / Smart Classifier)',
          'Day 5: APK Generation, TestFlight Prep & MSME Credential'
        ],
        outcome: 'Working Android APK / iOS build and MSME certificate.'
      },
      durationDays15: {
        title: '15-Day Mobile Development Bootcamp',
        hours: '45 Hours',
        modules: [
          'Week 1: Cross-Platform Architecture, Custom Animations & Hardware Sensors (GPS/Camera)',
          'Week 2: Firebase Backend Integration (Auth, Firestore, Cloud Messaging)',
          'Week 3: In-App Purchases, Payment Gateways & Offline-First Sync Architecture',
          'Capstone: Commercial utility mobile app ready for Play Store'
        ],
        outcome: 'Complete mobile app repo, compiled APK, and verified certificate.'
      },
      durationDays30: {
        title: '30-Day Master Mobile Architect Track',
        hours: '90 Hours',
        modules: [
          'Week 1: Clean Architecture (BLoC / Riverpod / Redux), Dependency Injection',
          'Week 2: On-Device Machine Learning (TensorFlow Lite), Native Platform Channels',
          'Week 3: Performance Profiling, Memory Leak Elimination & App Store Guidelines',
          'Week 4: Production Play Store Submission, Senior LOR & Resume Review'
        ],
        outcome: 'Play Store publishable app, verified QR credentials, and LOR.'
      }
    }
  },
  {
    id: 'generative-ui-ux-product-design',
    title: 'Generative UI/UX & Product Design',
    badge: 'DESIGN SYSTEMS',
    category: 'web-mobile',
    shortDesc: 'Modern Dark Cyber-Enterprise design systems, Figma component architectures, AI prototyping tools, and user interaction design.',
    labEnvironment: 'Figma Enterprise Organization & Prototyping Sandboxes',
    tags: ['FIGMA SYSTEMS', 'CYBER-ENTERPRISE', 'MICRO-INTERACTIONS', 'AI PROTOTYPING'],
    tools: ['Figma', 'FigJam', 'Spline 3D', 'Tailwind CSS', 'Framer', 'Midjourney / Recraft'],
    capstoneProject: 'High-Fidelity Cyber-Enterprise Design System with 40+ Interactive UI Components',
    curriculum: {
      durationDays5: {
        title: '5-Day UI/UX Sprint',
        hours: '15 Hours',
        modules: [
          'Day 1: Design Principles, Visual Hierarchy & Cyber Dark Theme Color Theory',
          'Day 2: Figma Auto Layout, Component Sets & Design Tokens',
          'Day 3: Wireframing & Rapid AI Prototyping Workflows',
          'Day 4: Micro-Interactions, Smooth Transitions & User Testing',
          'Day 5: Portfolio Case Study Assembly & MSME Verification'
        ],
        outcome: 'Professional Figma case study and MSME certificate.'
      },
      durationDays15: {
        title: '15-Day Product Design Bootcamp',
        hours: '45 Hours',
        modules: [
          'Week 1: User Research, Empathy Maps, Information Architecture & Wireframing',
          'Week 2: Scalable Design Systems: Variants, Tokens, Typography & Dark Mode Standards',
          'Week 3: Interactive Prototyping, Usability Audits & Handoff to React Developers',
          'Capstone: Full B2B Enterprise SaaS design system and interactive prototype'
        ],
        outcome: 'Behance/Dribbble portfolio project, Figma system, and certificate.'
      },
      durationDays30: {
        title: '30-Day Principal Product Designer Track',
        hours: '90 Hours',
        modules: [
          'Week 1: Advanced Interaction Design, Accessibility (WCAG AAA) & Typography Science',
          'Week 2: 3D Micro-interactions with Spline, Generative AI for Asset Pipelines',
          'Week 3: Product Strategy, Metrics (A/B Testing, Conversion Rate Optimization), Enterprise Audits',
          'Week 4: Comprehensive Design Case Study Defense, Senior LOR & Portfolio Polish'
        ],
        outcome: 'Elite design system case study, senior LOR, and job-ready portfolio.'
      }
    }
  }
];

export const MSME_VERIFICATION_DATA = {
  regNumber: 'UDYAM-TN-02-0198421',
  regBody: 'Ministry of Micro, Small and Medium Enterprises, Govt. of India',
  isoStandard: 'ISO 9001:2015 Quality Management Certified',
  qrVerificationUrl: 'https://monixsolutions.com/verify-credential',
  features: [
    'Tamper-Proof Cryptographic QR Hash on every Certificate',
    'Instant Employer Verification Portal with 1-Click Verification',
    'Recognized by Top Indian & Global Universities for Academic Credit',
    'Official Govt. of India MSME Udyam Registration Seal'
  ]
};

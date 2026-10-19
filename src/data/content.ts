import { CategoryDetail } from '../types';

export const WHY_CHOOSE_US = [
  {
    icon: "Sparkles",
    title: "Apple-Grade Design",
    desc: "Minimalist dark glassmorphism, pixel-perfect typography, and responsive micro-interactions.",
    tag: "AESTHETICS"
  },
  {
    icon: "Zap",
    title: "Sub-Second Speed",
    desc: "100/100 Lighthouse performance, sub-200ms TTFB, and global edge CDN caching.",
    tag: "PERFORMANCE"
  },
  {
    icon: "Cpu",
    title: "AI-Driven Code",
    desc: "Autonomous multi-agent workflows, vector RAG pipelines, and automated test coverage.",
    tag: "INTELLIGENCE"
  },
  {
    icon: "Clock",
    title: "On-Time Delivery",
    desc: "Strict agile sprint milestones, live preview deployments, and zero launch delays.",
    tag: "EXECUTION"
  },
  {
    icon: "ShieldCheck",
    title: "Enterprise Security",
    desc: "Zero-trust architecture, OWASP Top 10 compliance, and end-to-end 256-bit SSL encryption.",
    tag: "SECURITY"
  },
  {
    icon: "Headphones",
    title: "Direct Support",
    desc: "Dedicated senior engineering channel with under 2-hour SLA response and 30-day warranty.",
    tag: "RELIABILITY"
  },
];

export const WEB_CATEGORIES = [
  "Corporate Website", "Business Website", "Portfolio", "Landing Page",
  "College Website", "School Website", "Hospital Website", "Restaurant Website",
  "Hotel Website", "Travel Website", "NGO Website", "Real Estate Website",
  "Event Website", "Blog Website", "News Portal", "Admin Dashboard",
  "Admin Panel", "CRM System", "ERP System", "Booking System",
  "Educational Portal", "Membership Website", "AI Powered Website", "E-Commerce Website",
  "Marketplace Website", "Custom Web Applications"
];

export const MOBILE_CATEGORIES = [
  "Android Apps", "iOS Apps", "Flutter Apps", "React Native Apps",
  "Business Apps", "Food Delivery Apps", "Hospital & Telemedicine Apps", "Education & eLearning Apps",
  "Booking & Ticketing Apps", "Finance & Fintech Apps", "Travel & Tourism Apps", "Inventory Management Apps",
  "CRM Mobile Apps", "ERP Mobile Apps", "AI Applications", "Chat & Messaging Apps",
  "Productivity & Task Apps", "E-Commerce Shopping Apps", "Portfolio Apps", "Social Networking Apps",
  "Healthcare & Fitness Apps", "Custom Mobile Applications"
];

export const INTERNSHIP_PROGRAMS = [
  "AI Full Stack Development", "Cyber Security & Ethical Hacking", "AI & Machine Learning",
  "AI Data Science", "Prompt Engineering & GenAI", "Python Development",
  "React & Next.js Frontend", "Flutter Mobile Apps", "Cloud Computing (AWS/GCP)",
  "DevOps Engineering", "Java Full Stack", "C++ System Programming",
  "Blockchain Technologies", "IoT & Embedded Systems", "UI/UX Product Design",
  "Digital Marketing & SEO"
];

export const PROJECT_CATEGORIES = [
  "College Final Year Major Projects",
  "Mini Projects for CS / IT / ECE",
  "IEEE Standard AI & Cloud Projects",
  "Artificial Intelligence & Machine Learning Projects"
];

export const PROCESS_TIMELINE = [
  { step: "01", title: "Discovery", desc: "Understanding client goals, scope, target audience, and business requirements." },
  { step: "02", title: "Planning", desc: "Architecture design, tech stack selection, wireframing, and project roadmap." },
  { step: "03", title: "Design", desc: "Luxury UI/UX prototyping with responsive white-and-gold visual components." },
  { step: "04", title: "Development", desc: "Writing clean, scalable, type-safe Next.js & React code with AI acceleration." },
  { step: "05", title: "Testing", desc: "Rigorous quality assurance, cross-browser testing, security audits & speed tuning." },
  { step: "06", title: "Launch", desc: "Domain setup, SSL configuration, cloud deployment, and live going." },
  { step: "07", title: "Support", desc: "1 Month free post-launch support, updates, and maintenance guidance." },
];

export const FAQS = [
  {
    q: "What is the starting price for a website development project?",
    a: "Our website packages start from ₹4,999*. The exact price depends upon specific project features, pages, e-commerce integration, and custom functionality required."
  },
  {
    q: "How long does it take to develop a custom website or mobile application?",
    a: "A standard business website usually takes 5 to 10 working days. Custom mobile applications and complex AI web portals typically take 2 to 4 weeks based on milestone scope."
  },
  {
    q: "Is MONIX Software Solutions a Govt of India registered company?",
    a: "Yes! MONIX Software Solutions is officially registered under the Government of India MSME (Micro, Small and Medium Enterprises) framework, guaranteeing authentic and legal operations."
  },
  {
    q: "Are the AI Internship programs suitable for college students?",
    a: "Absolutely! Our AI Internship programs are 100% online, mentorship-driven, and designed specifically for B.E, B.Tech, B.Sc, BCA, MCA, and Diploma students looking to work on real industry projects."
  },
  {
    q: "Do you provide certificates and source code for academic projects?",
    a: "Yes, for all academic projects (College Final Year, Mini, IEEE, AI), we provide complete source code, installation support, project documentation, presentation ppt, and verifiable completion certificates."
  },
  {
    q: "What post-launch support do you offer for web and mobile apps?",
    a: "Every project includes 1 month of free post-launch technical support, minor content updates, hosting guidance, and bug fixes."
  }
];

// Rich detailed category templates generator for deep category detail view
export const CATEGORY_DETAILS_MAP: Record<string, CategoryDetail> = {
  "E-Commerce Website": {
    id: "e-commerce-website",
    title: "E-Commerce Website Development",
    parentService: "web",
    subtitle: "High-converting online store with payment gateway, inventory management, and AI product recommendations.",
    overview: "Build a modern, high-performance online store tailored to turn visitors into repeat buyers. Includes multi-currency support, order tracking, razor-sharp checkout, and mobile optimization.",
    priceTag: "Starting from ₹9,999*",
    features: [
      "Custom Shopping Cart & Fast One-Page Checkout",
      "Integrated Payment Gateways (Razorpay, PhonePe, UPI, Stripe)",
      "Admin Dashboard for Products, Orders & Customers",
      "Coupon Codes, Discounts & Automated Invoices",
      "SEO Friendly Product Pages & Schema Markup",
      "100% Mobile & Tablet Responsive Layout"
    ],
    benefits: [
      "Sell 24/7 nationwide without geographical boundaries",
      "Automated order notifications via WhatsApp/Email",
      "High loading speed under 1.2 seconds for low bounce rates"
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Stripe/Razorpay API", "Supabase/PostgreSQL"],
    process: ["Requirement & Product Cataloging", "Store UX Design", "Payment & Courier Integration", "Load Testing", "Launch & Training"],
    deliverables: ["Full Source Code", "Admin Control Credentials", "User Manual & Training", "1 Year SSL & Hosting Guidance"]
  },
  "AI Powered Website": {
    id: "ai-powered-website",
    title: "AI-Powered Website Development",
    parentService: "web",
    subtitle: "Next-gen web applications with integrated Gemini AI, smart chatbots, and automated workflows.",
    overview: "Elevate your digital footprint with artificial intelligence. We build custom web apps featuring AI content generation, automated customer support bots, predictive search, and personalized user feeds.",
    priceTag: "Starting from ₹12,999*",
    features: [
      "Gemini / OpenAI API Integration",
      "Automated AI Customer Support Chatbot",
      "Automated AI Content & Recommendation Engine",
      "Voice Search & Multilingual AI Translation",
      "Real-time Data Analytics Dashboard"
    ],
    benefits: [
      "Automate 80% of repetitive customer support queries",
      "Differentiate your brand with cutting-edge tech leadership",
      "Personalized customer experiences increasing sales conversion"
    ],
    technologies: ["Next.js", "TypeScript", "Google Gemini API", "Tailwind v4", "Node.js Server Actions"],
    process: ["AI Model Selection & Architecture", "UI Design & Prompt Engineering", "API Proxy Security Setup", "Testing & Fine-Tuning", "Deployment"],
    deliverables: ["Secured Server API Proxy", "Custom Prompt Workflows", "Documentation & Maintenance Guide"]
  },
  "AI Full Stack Development": {
    id: "ai-full-stack",
    title: "AI Full Stack Development Internship",
    parentService: "internship",
    subtitle: "100% Online • Mentorship Driven • Govt MSME Certified • Real Industry Capstone Projects.",
    overview: "Master full-stack web development integrated with modern Generative AI. Build production-grade applications using React, Next.js, Node.js, and Gemini API under the guidance of senior software architects.",
    duration: "4 Weeks / 8 Weeks Options",
    features: [
      "Live Hands-on Coding Sessions",
      "Real-world Portfolio Capstone Project",
      "Verifiable MSME Govt Registered Internship Certificate",
      "Resume Building & Mock Interview Mentorship",
      "Source Code Access & Github Portfolio Review"
    ],
    benefits: [
      "Gain real industry experience using AI tools",
      "Stand out in job placements with a live deployed project",
      "1-on-1 mentorship from lead software engineers"
    ],
    technologies: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS v4", "Node.js", "Gemini API", "Git & Github"],
    process: ["Fundamentals & Modern Tooling", "Frontend Design", "Backend & AI API Integration", "Capstone Project Building", "Certification & Career Guidance"],
    deliverables: ["Verifiable Internship Certificate", "LOR (Letter of Recommendation)", "Live Deployed Project Link", "GitHub Code Repository"]
  },
  "College Final Year Major Projects": {
    id: "college-final-year-major-projects",
    title: "College Final Year Major Academic Projects",
    parentService: "projects",
    subtitle: "Turnkey Final Year Major Projects for CSE, IT, ECE, AI/DS Students with Full Documentation & Viva Prep.",
    overview: "Get high-scoring, industry-relevant major projects tailored to university requirements. Includes working source code, database, PPT slides, base IEEE research paper, project report, and video tutorial.",
    priceTag: "Custom Budget Friendly Pricing",
    features: [
      "100% Working Tested Source Code",
      "Comprehensive Project Report (PDF/Word format)",
      "Viva Voce Question & Answer Guide",
      "Free Remote Installation Support via AnyDesk / TeamViewer",
      "Custom Feature Additions & Enhancements Available"
    ],
    benefits: [
      "Score top grades with unique, non-plagiarized project architecture",
      "Complete confidence during final university oral viva exams",
      "Step-by-step guidance on how the code works"
    ],
    technologies: ["Python", "Machine Learning", "React", "Node.js", "Flutter", "Android", "Cloud"],
    process: ["Topic Selection & Synopsis Submission", "System Architecture & Coding", "Report & PPT Generation", "Code Explanation & Viva Demo", "Final Submission Support"],
    deliverables: ["Full Source Code ZIP", "Complete Documentation Report", "Presentation PPT", "Synopsis Document", "Installation Manual"]
  },
  "Healthcare & Medical Portals": {
    id: "healthcare-medical-portals",
    title: "Healthcare & Medical Portals (HIPAA Compliant)",
    parentService: "projects",
    subtitle: "AI disease prediction, EHR portals, and secure telehealth communication systems.",
    overview: "Built to comply with strict HIPAA BAA and ISO 27799 healthcare data security standards. Features sub-45ms real-time telemetry streaming, EHR FHIR standards, and deep neural diagnostic classifiers.",
    priceTag: "IEEE & University Certified",
    features: [
      "HIPAA Compliant Data Layer with AES-256 at Rest",
      "FHIR HL7 Diagnostic Protocol Integration",
      "AI Predictive Diagnostics for Clinical Decision Support",
      "Live Encrypted Doctor-Patient Video Consultations (WebRTC)",
      "50+ Page Academic Project Report & Complete Viva Preparation Deck"
    ],
    benefits: [
      "Meets highest clinical compliance benchmark standards",
      "Ready for university viva, conference publications, or startup launch",
      "Complete hands-on AnyDesk remote installation support included"
    ],
    technologies: ["Next.js 15", "Python FastAPI", "TensorFlow", "PostgreSQL", "WebRTC", "Docker"],
    process: ["Clinical Architecture Design", "FHIR Data Modeling", "AI Diagnostic Model Training", "EHR Portal Integration", "Verification & Viva Handover"],
    deliverables: ["Full Source Code ZIP", "IEEE Base Paper & Report Document", "Viva Voce Prep Deck", "Installation Manual"]
  },
  "Security & Pentesting Defense": {
    id: "security-pentesting-defense",
    title: "Security & Pentesting Defense (Zero-Trust)",
    parentService: "projects",
    subtitle: "Automated penetration testing, zero-trust access, and live SOC telemetry monitoring.",
    overview: "An enterprise-grade cybersecurity engineering suite designed to audit and defend against OWASP Top 10 web vulnerabilities. Features automated scanning agents, mTLS, JWT token rotation, and simulated SIEM attack analysis.",
    priceTag: "Cybersecurity Research Grade",
    features: [
      "Automated Vulnerability Scanner CLI & Visual Dashboard",
      "Zero-Trust Microsegmentation with FIDO2 / JWT Rotation",
      "Simulated SOC Telemetry & Real-Time Threat Attack Matrix",
      "MITRE ATT&CK Mapped Exploit Catalog and Remediation Guides",
      "Comprehensive Exploitation Walkthrough & Viva Voce Q&A Sheet"
    ],
    benefits: [
      "Exceptional showcase for cybersecurity internships and campus placements",
      "Fully compliant with IEEE Security & Privacy standards",
      "Demonstrable live attack-defense demonstration for university examiners"
    ],
    technologies: ["Python Scapy", "Go", "Docker", "Next.js 15", "OWASP ZAP Core", "WireGuard"],
    process: ["Threat Modeling", "Scanner Agent Development", "Zero-Trust Identity Implementation", "Penetration Benchmark Testing", "Final Report Minting"],
    deliverables: ["Full Source Code Repository", "50+ Page Vulnerability Audit Report", "Interactive Defense PPT", "Live Demo Guide"]
  },
  "Generative AI & Autonomous Agents": {
    id: "generative-ai-autonomous-agents",
    title: "Generative AI & Autonomous Agents (LLM • RAG)",
    parentService: "projects",
    subtitle: "Web-based LLMs, vector database search, and autonomous multi-agent task execution.",
    overview: "Cutting-edge autonomous agent architecture combining Google Gemini models with LangChain, LangGraph, and hybrid vector RAG (Pinecone / pgvector). Features sub-120ms first token latency and responsible AI guardrails.",
    priceTag: "GenAI & Agentic System",
    features: [
      "Multi-Agent Workflow Loop with Dynamic Memory & Tool Execution",
      "Dense + Sparse Hybrid Vector Search with Cross-Encoder Re-Ranking",
      "Modern Dark Cyber-Glass UI with Streaming SSE Responses",
      "Automated Document Ingestion & Chunking Pipeline",
      "IEEE 2025/2026 Research Paper Implementation & Viva Voce Deck"
    ],
    benefits: [
      "High-impact capstone proving production-level AI engineering capabilities",
      "Modular microservices architecture ready for cloud deployment",
      "Zero vendor lock-in with swappable LLM endpoints"
    ],
    technologies: ["Google Gemini API", "LangChain", "Pinecone", "Next.js 15", "FastAPI", "Python"],
    process: ["Prompt Architecture & Agent Design", "Vector DB Indexing", "Streaming API Proxy Setup", "Agentic Loop Tuning", "Viva Defense Preparation"],
    deliverables: ["Complete Agent Source Code", "RAG Pipeline Configuration", "Research Report & Presentation", "Docker Compose Sandbox"]
  },
  "Next-Gen Cybersecurity & Ethical Hacking (Hands-on SOC Lab)": {
    id: "cybersecurity-soc-lab-internship",
    title: "Cybersecurity & Ethical Hacking (Virtual SOC Lab)",
    parentService: "internship",
    subtitle: "5 to 30 Days Online Tracks with Official Govt. of India MSME Certificate & ISO Verified QR.",
    overview: "Immerse yourself in real-world cybersecurity engineering. Gain practical offensive and defensive skills on dedicated Kali Linux and Virtual SOC cloud sandboxes under the direct 1-on-1 mentorship of senior security engineers.",
    duration: "5 Days Sprint / 15 Days Bootcamp / 30 Days Full Immersion",
    features: [
      "Dedicated Kali Linux & Virtual SOC Sandbox Cloud Pods",
      "Hands-on OWASP Top 10 Web Exploitation & Remediation Labs",
      "BurpSuite Pro, Wireshark, Metasploit, and Nmap Practical Tooling",
      "Real-World Penetration Test Audit Report & GitHub Capstone Project",
      "Verifiable Govt. of India MSME Certificate with Tamper-Proof QR Code"
    ],
    benefits: [
      "Build a portfolio that stands out in top cybersecurity and SOC analyst hiring",
      "Earn verifiable academic credits recognized by AICTE & major Indian universities",
      "Official Letter of Recommendation (LOR) for top performers"
    ],
    technologies: ["Kali Linux", "BurpSuite", "Wireshark", "Metasploit", "Python", "OWASP ZAP", "Docker"],
    process: ["Reconnaissance & Threat Modeling", "Vulnerability Exploitation Labs", "Defensive SOC & SIEM Logging", "Capstone Audit Delivery", "Certification & Career Mentorship"],
    deliverables: ["Govt. MSME QR Certificate", "Official LOR", "Penetration Testing Audit Report", "GitHub Lab Portfolio"]
  },
  "Next-Gen Prompt Engineering & LLMs (LangChain & Vector RAG)": {
    id: "prompt-engineering-llm-internship",
    title: "Prompt Engineering & LLMs (LangChain & Vector RAG)",
    parentService: "internship",
    subtitle: "5 to 30 Days Online Tracks with Official Govt. of India MSME Certificate & ISO Verified QR.",
    overview: "Master production GenAI engineering. Architect autonomous agents, evaluate RAG pipelines, and build production web apps integrated with Gemini and vector databases under lead AI architects.",
    duration: "5 Days Sprint / 15 Days Bootcamp / 30 Days Full Immersion",
    features: [
      "High-Speed Gemini & HuggingFace Inference API Sandboxes",
      "Advanced Prompt Engineering, Few-Shot & Chain-of-Thought Workflows",
      "Enterprise Hybrid RAG Architecture with Pinecone & LangChain",
      "Autonomous Multi-Agent Systems with LangGraph & Tool Calling",
      "Verifiable Govt. of India MSME Certificate with Tamper-Proof QR Code"
    ],
    benefits: [
      "Deploy two live AI applications to your personal portfolio",
      "Master the most in-demand skills in the modern software industry",
      "Direct 1-on-1 resume reviews and mock technical interview sessions"
    ],
    technologies: ["Google Gemini API", "LangChain", "Pinecone", "Next.js 15", "React 19", "Python", "FastAPI"],
    process: ["Core Prompting Mastery", "Vector Embeddings & RAG", "Autonomous Agent Orchestration", "Capstone Launch on Vercel", "MSME Certification & Career Mentorship"],
    deliverables: ["Govt. MSME QR Certificate", "Official LOR", "Live Deployed Project URL", "GitHub Source Code Repository"]
  }
};

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, X, Send, User, ShieldCheck, RefreshCw, 
  MessageSquare, PhoneCall, Mail, Terminal, Cpu, Zap, ArrowRight 
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

interface FloatingAURAButtonProps {
  lang?: Language;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  isOutofScope?: boolean;
}

const MONIX_COMPANY_INFO = `
MONIX Enterprise & AI Software Solutions is an official Govt. Registered MSME Software & AI Enterprise in India.
Key Offerings & Details:
1. Academic & Enterprise Project Domains:
   - Healthcare & Medical Portals (HIPAA Compliant, EHR, Telemedicine, FHIR HL7)
   - E-Commerce & Retail Marketplaces (Stripe, Razorpay, Multi-Vendor, AI Search)
   - Generative AI & Autonomous Agents (LLM, Vector RAG, LangChain, LangGraph)
   - Security & Pentesting Defense (Zero-Trust, OWASP Top 10, Virtual SOC Monitoring)
   - FinTech & High-Frequency Portals (PCI-DSS Ready, Cryptographic Ledgers)
   - Cloud DevOps & SaaS Web Platforms (99.99% Cloud SLA, Kubernetes, Docker CI/CD)
   Turnkey deliverables include 100% tested source code, 50+ page IEEE report, presentation PPT, viva voce guidance, and remote installation.

2. Next-Gen AI-Driven Internships:
   - 5 to 30 Days Tracks with official Govt. of India MSME Certificate and ISO-verified QR credentials.
   - Core Tracks: CSE, AI & Data Science, AI & Machine Learning, Full-Stack Web Dev (Next.js 15 / React 19), Mobile App Architecture, Generative UI/UX.
   - Specialized Flagship Tracks: Next-Gen Cybersecurity & Ethical Hacking (Hands-on Virtual SOC Lab) and Next-Gen Prompt Engineering & LLMs (LangChain & Vector RAG).

3. Commercial Engineering:
   - Custom Web Development starting ~₹4,999*.
   - Native & Cross-Platform Mobile Apps starting ~₹7,999*.

4. Official Contact Details:
   - Official Email: contact@monixsoftware.com
   - Instagram: monix.srm
   - LinkedIn: monix-softwaresolutions
`;

const INITIAL_SUGGESTIONS = [
  "Explain the 6 Project Domains",
  "Compare 5 to 30 Days AI Internships",
  "Verify Govt. MSME & ISO Accreditation",
  "Request Project Architecture Quote"
];

export const FloatingAURAButton: React.FC<FloatingAURAButtonProps> = ({ lang = 'en' }) => {
  const isTa = lang === 'ta';
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: isTa 
        ? "வணக்கம்! நான் AURA AI 🤖 — MONIX Enterprise & AI சொல்யூஷன்ஸின் நுண்ணறிவு உதவியாளர். ப்ராஜெக்ட் டொமைன்கள், இன்டர்ன்ஷிப் பாடத்திட்டம், மற்றும் டெக்னாலஜி தொடர்பான சந்தேகங்களுக்கு உதவ தயாராக உள்ளேன். நான் எவ்வாறு உதவட்டும்?"
        : "Greetings! I am AURA AI 🤖, the autonomous cyber-enterprise AI assistant for MONIX Enterprise & AI Software Solutions. I can provide architecture blueprints, project domains, AI internship tracks, and instant technical estimates. How can I assist you today?",
      time: getCurrentTime()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const checkIsCompanyRelated = (query: string): boolean => {
    const q = query.toLowerCase();
    const companyKeywords = [
      'monix', 'aura', 'service', 'website', 'web', 'app', 'mobile', 'android', 'ios',
      'internship', 'project', 'ieee', 'price', 'pricing', 'cost', 'quote',
      'contact', 'phone', 'whatsapp', 'email', 'certificate', 'lor', 'react',
      'python', 'ai', 'developer', 'software', 'technology', 'msme', 'founder',
      'deliver', 'domain', 'hosting', 'discount', 'offer', 'address', 'duration',
      'security', 'soc', 'rag', 'langchain', 'fintech', 'hipaa', 'pentest', 'cloud',
      'hi', 'hello', 'hey', 'வணக்கம்', 'ஹலோ'
    ];
    return companyKeywords.some(kw => q.includes(kw));
  };

  const getFallbackCompanyResponse = (query: string): { text: string; isOutofScope: boolean } => {
    const q = query.toLowerCase();

    if (!checkIsCompanyRelated(q)) {
      return {
        isOutofScope: true,
        text: isTa
          ? "மன்னிக்கவும்! நான் AURA AI — MONIX நிறுவனத்தின் மென்பொருள் தீர்வுகள், ப்ராஜெக்ட் டொமைன்கள் மற்றும் இன்டர்ன்ஷிப் பற்றிய தகவல்களை மட்டுமே வழங்க வடிவமைக்கப்பட்டுள்ளேன்.\n\nநேரடி விவாதத்திற்கு எங்களை தொடர்பு கொள்ளவும்:\n📧 மின்னஞ்சல்: contact@monixsoftware.com"
          : "I am AURA AI, dedicated exclusively to providing intelligence on MONIX Enterprise & AI Software Solutions, project domains, AI internships, and engineering services.\n\nFor specialized inquiries, please connect directly with our engineering team:\n📧 Email: contact@monixsoftware.com"
      };
    }

    if (q.includes('intern') || q.includes('track') || q.includes('msme') || q.includes('syllabus')) {
      return {
        isOutofScope: false,
        text: isTa
          ? "🎓 MONIX AI-Driven Internships (5 முதல் 30 நாட்கள்):\n• 2 சிறப்பு டிராக்குகள்: Next-Gen சைபர் செக்யூரிட்டி & SOC லேப், Prompt Engineering & LLM RAG.\n• 6 முக்கிய டிராக்குகள்: CSE, AI & Data Science, AI & ML, Full-Stack Web (Next.js 15), Mobile App, UI/UX.\nஅனைத்து டிராக்குகளும் இந்திய அரசு MSME பதிவு மற்றும் ISO சரிபார்க்கப்பட்ட QR சான்றிதழ், LOR மற்றும் நேரடி மென்டர்ஷிப் உடன் வழங்கப்படுகின்றன!"
          : "🎓 Next-Gen AI-Driven Internships (5 to 30 Days):\n• Flagship Specializations: Next-Gen Cybersecurity & SOC Lab, Prompt Engineering & Vector RAG.\n• Core Engineering: CSE, AI & Data Science, AI & ML, Full-Stack Web (Next.js 15/React 19), Mobile App Architecture, UI/UX.\nAll tracks feature official Govt. of India MSME verified QR certificates, LOR, and senior architect mentorship!"
      };
    }

    if (q.includes('domain') || q.includes('project') || q.includes('ieee') || q.includes('final year')) {
      return {
        isOutofScope: false,
        text: isTa
          ? "⚡ MONIX கல்வி மற்றும் என்டர்பிரைஸ் ப்ராஜெக்ட் டொமைன்கள்:\n1. Healthcare & Medical Portals (HIPAA Compliant)\n2. E-Commerce & Retail Marketplaces (Stripe • Razorpay)\n3. Generative AI & Autonomous Agents (LLM • Vector RAG)\n4. Security & Pentesting Defense (Zero-Trust SOC)\n5. FinTech & High-Frequency Portals (PCI-DSS Ready)\n6. Cloud DevOps & SaaS Platforms (99.99% Cloud SLA)\nமுழுமையான சோர்ஸ் கோடு, IEEE அறிக்கை, PPT மற்றும் AnyDesk நிறுவல் உதவி இதில் அடங்கும்."
          : "⚡ Academic & Enterprise Project Domains:\n1. Healthcare & Medical Portals (HIPAA Compliant)\n2. E-Commerce & Retail Marketplaces (Stripe • Razorpay)\n3. Generative AI & Autonomous Agents (LLM • Vector RAG)\n4. Security & Pentesting Defense (Zero-Trust SOC)\n5. FinTech & High-Frequency Portals (PCI-DSS Ready)\n6. Cloud DevOps & SaaS Platforms (99.99% Cloud SLA)\nIncludes 100% tested source code, 50+ page IEEE report, viva prep, and remote installation."
      };
    }

    return {
      isOutofScope: false,
      text: isTa
        ? "MONIX Enterprise & AI Software Solutions உங்களுக்கு உதவ தயாராக உள்ளது. வலைத்தள உருவாக்கம், மொபைல் செயலிகள், AI இன்டர்ன்ஷிப் அல்லது IEEE ப்ராஜெக்ட்கள் பற்றி மேலும் அறிய விரும்புகிறீர்களா?"
        : "MONIX Enterprise & AI Software Solutions provides cutting-edge digital solutions. Would you like details on our Academic Project Domains, Next-Gen AI Internships, Web/Mobile Development, or a custom architecture quote?"
    };
  };

  const generateLLMResponse = async (userPrompt: string): Promise<string> => {
    try {
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction: `You are AURA AI, the official cybersecurity and autonomous enterprise intelligence assistant for MONIX Enterprise & AI Software Solutions.
You provide precise, authoritative, and polite answers about MONIX services:
${MONIX_COMPANY_INFO}
Keep answers concise, technical yet accessible, bulleted where appropriate, and guide users to inquire or reach out via official email (contact@monixsoftware.com).`
          }
        });
        if (response && response.text) {
          return response.text;
        }
      }
    } catch (e) {
      console.warn('AURA AI Gemini direct call fallback:', e);
    }
    return '';
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isTyping) return;

    const trimmed = textToSend.trim();
    const time = getCurrentTime();

    setInputText('');
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: trimmed, time }
    ]);

    setIsTyping(true);

    try {
      let aiText = '';
      let isOutofScope = false;

      if (!checkIsCompanyRelated(trimmed)) {
        const fallback = getFallbackCompanyResponse(trimmed);
        aiText = fallback.text;
        isOutofScope = fallback.isOutofScope;
      } else {
        aiText = await generateLLMResponse(trimmed);
        if (!aiText) {
          const fallback = getFallbackCompanyResponse(trimmed);
          aiText = fallback.text;
          isOutofScope = fallback.isOutofScope;
        }
      }

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: aiText,
            time: getCurrentTime(),
            isOutofScope
          }
        ]);
      }, 500);

    } catch (err) {
      console.error('AURA AI generation error:', err);
      const fallback = getFallbackCompanyResponse(trimmed);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: fallback.text,
          time: getCurrentTime(),
          isOutofScope: fallback.isOutofScope
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating AURA AI Trigger Pill (Docked Bottom-Right) */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 scale-90 sm:scale-100 origin-bottom-right">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#07090E]/95 text-cyan-300 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.4),0_0_35px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(0,242,254,0.7),0_0_55px_rgba(99,102,241,0.5)] hover:border-cyan-300 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 sm:gap-2.5 backdrop-blur-xl overflow-hidden"
          aria-label="Toggle AURA AI Assistant"
        >
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-violet-500/20 animate-pulse pointer-events-none"></div>

          {/* Left Glowing Icon with Sparkles */}
          <div className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-400">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300 animate-spin-slow" />
          </div>

          {/* Rebranded AURA AI Text Pill */}
          <div className="relative flex items-center font-mono">
            <span className="text-xs sm:text-sm font-black tracking-wider bg-gradient-to-r from-cyan-300 via-indigo-200 to-violet-300 bg-clip-text text-transparent uppercase">
              AURA AI
            </span>
          </div>

          {/* Pulsating Ping Dot Indicator */}
          <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-cyan-400 shadow-[0_0_8px_#00F2FE]"></span>
          </span>
        </button>
      </div>

      {/* Floating Interactive AURA AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-3 sm:bottom-20 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[390px] h-[520px] max-h-[80dvh] bg-[#0B0F19] text-white rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,242,254,0.2)] border border-cyan-500/40 overflow-hidden flex flex-col transition-all animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#07090E] via-slate-900 to-[#07090E] p-4 border-b border-cyan-500/30 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-mono text-sm sm:text-base font-black text-white flex items-center space-x-1.5">
                  <span className="bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">AURA AI</span>
                  <span className="text-[9px] bg-cyan-950 text-cyan-300 font-bold px-1.5 py-0.5 rounded border border-cyan-500/40 font-mono">NEURAL v4.2</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono flex items-center space-x-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Autonomous Enterprise AI Assistant</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              aria-label="Close AURA AI chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2.5 bg-slate-950/80 border-b border-slate-800/80 overflow-x-auto flex items-center gap-1.5 shrink-0 scrollbar-none">
            {INITIAL_SUGGESTIONS.map((sugg, i) => (
              <button
                key={i}
                onClick={() => handleSend(sugg)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-[11px] font-mono text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-all cursor-pointer"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#07090E] cyber-grid-pattern">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-xs shadow-md shadow-cyan-600/20'
                      : 'bg-slate-900/90 border border-cyan-500/20 text-slate-200 rounded-bl-xs shadow-md backdrop-blur-md'
                  }`}
                >
                  <p className="whitespace-pre-line font-sans">{msg.text}</p>
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-cyan-400 p-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>AURA AI is analyzing technical blueprints...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask AURA about projects, internships, pricing..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-cyan-400 text-xs text-slate-200 placeholder-slate-500 rounded-xl px-3.5 py-2.5 focus:outline-none font-mono"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 text-slate-950 font-bold hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
              aria-label="Send message to AURA AI"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

/* ================================================
   MONIX Agency — Interactive Script
   ================================================ */

// Global Alphanumeric CAPTCHA Generator
function generateCaptchaCode(length = 5) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

document.addEventListener('DOMContentLoaded', () => {

    // ---- Instant Performance Preloader Handler ----
    const preloader = document.getElementById('monix-preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    
    if (preloader) {
        if (preloaderBar) preloaderBar.style.width = '100%';
        preloader.classList.add('fade-out');
        setTimeout(() => {
            if (preloader.parentNode) preloader.remove();
        }, 50);
    }

    // Prefetch detail pages on hover, touch, or focus for 0ms page navigation
    const prefetchedLinks = new Set();
    const triggerPrefetch = (href) => {
        if (href && !prefetchedLinks.has(href) && href !== '#' && !href.startsWith('javascript:')) {
            prefetchedLinks.add(href);
            const linkTag = document.createElement('link');
            linkTag.rel = 'prefetch';
            linkTag.href = href;
            document.head.appendChild(linkTag);
        }
    };

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.endsWith('.html') || href.includes('.html#'))) {
            ['mouseenter', 'touchstart', 'focus'].forEach(evt => {
                link.addEventListener(evt, () => triggerPrefetch(href.split('#')[0]), { passive: true });
            });
        }
    });

    // Auto-apply lazy loading & async decoding to offscreen images
    document.querySelectorAll('img:not([loading]):not(.hero-img):not(.preloader-logo)').forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
    });

    // ---- DOM References ----
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    // Only close the menu on links that are NOT dropdown toggles
    const mobileLinks = document.querySelectorAll('.mobile-nav-list > li > a:not(.mobile-dropdown-btn)');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroSection = document.getElementById('hero');
    const heroImg = document.querySelector('.hero-img');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const resetFormBtn = document.getElementById('reset-form-btn');
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');
    const scrollRevealEls = document.querySelectorAll('.scroll-reveal');

    // ---- HTML Escaping Helper for Telegram ----
    const escapeTelegramHtml = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    // ---- Telegram Integration Helper ----
    const sendToTelegram = async (data, type = 'modal') => {
        const TELEGRAM_BOT_TOKEN = "8251796240:AAGPRIAZH50aUl6Vlmtu1ZKOFmANOiH2lYc";
        const TELEGRAM_CHAT_ID = "-1003676902980";
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        let message = '';
        const sheetLine = `\n📊 <b>Google Sheet:</b> <a href="https://docs.google.com/spreadsheets">Open Sheets Tracker ↗</a>`;

        if (type === 'modal') {
            const cleanProgram = escapeTelegramHtml(data.program);
            const cleanDynLabel = escapeTelegramHtml(data.dynamicLabel);
            const cleanDynVal = escapeTelegramHtml(data.dynamicVal);
            const programLine = cleanProgram ? `\n💼 <b>Program:</b> <code>${cleanProgram}</code>` : '';
            const dynamicLine = (cleanDynLabel && cleanDynVal) ? `\n✏️ <b>${cleanDynLabel}:</b> <code>${cleanDynVal}</code>` : '';
            message = `
🌟 <b>New Enquiry Received!</b> 🌟
━━━━━━━━━━━━━━━━━━
📝 <b>Source:</b> <code>${escapeTelegramHtml(data.source || 'N/A')}</code>${programLine}${dynamicLine}
👤 <b>Name:</b> <code>${escapeTelegramHtml(data.name)}</code>
📞 <b>Phone:</b> <code>${escapeTelegramHtml(data.phone)}</code>
📧 <b>Email:</b> <code>${escapeTelegramHtml(data.email)}</code>
🕒 <b>Time:</b> <code>${escapeTelegramHtml(new Date().toLocaleString())}</code>${sheetLine}
━━━━━━━━━━━━━━━━━━
`;
        } else {
            const cleanMessage = escapeTelegramHtml(data.message);
            message = `
📬 <b>New Contact Form Submission!</b> 📬
━━━━━━━━━━━━━━━━━━
👤 <b>Name:</b> <code>${escapeTelegramHtml(data.name)}</code>
📧 <b>Email:</b> <code>${escapeTelegramHtml(data.email)}</code>
🏷️ <b>Subject:</b> <code>${escapeTelegramHtml(data.subject)}</code>
💬 <b>Message:</b>
<blockquote>${cleanMessage}</blockquote>
🕒 <b>Time:</b> <code>${escapeTelegramHtml(new Date().toLocaleString())}</code>${sheetLine}
━━━━━━━━━━━━━━━━━━
`;
        }

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message.trim(),
                    parse_mode: 'HTML'
                })
            });
        } catch (err) {
            console.error('Error sending message to Telegram:', err);
        }
    };

    // ---- High-Performance Throttled Scroll Engine ----
    const sections = document.querySelectorAll('section[id]');
    let sectionPositions = [];

    function cacheSectionPositions() {
        sectionPositions = Array.from(sections).map(sec => ({
            id: sec.getAttribute('id'),
            top: Math.round(sec.getBoundingClientRect().top + window.scrollY),
            height: sec.offsetHeight || window.innerHeight
        }));
    }

    cacheSectionPositions();
    window.addEventListener('resize', cacheSectionPositions, { passive: true });

    let isHeaderScrolled = null;
    function handleHeaderScroll() {
        const scrollY = window.scrollY;
        if (header) {
            const shouldScroll = scrollY > 40;
            if (shouldScroll !== isHeaderScrolled) {
                isHeaderScrolled = shouldScroll;
                header.classList.toggle('scrolled', shouldScroll);
            }
        }
    }

    let lastActiveNavId = null;
    let cachedNavLinks = null;

    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        let currentId = '';

        for (let i = 0; i < sectionPositions.length; i++) {
            const sec = sectionPositions[i];
            if (scrollPos >= sec.top && scrollPos < sec.top + sec.height) {
                currentId = sec.id;
                break;
            }
        }

        if (window.scrollY < window.innerHeight * 0.5) {
            currentId = 'hero';
        }

        if (currentId === lastActiveNavId) return;
        lastActiveNavId = currentId;

        if (!cachedNavLinks) {
            cachedNavLinks = Array.from(navLinks).map(link => ({
                element: link,
                targetId: link.getAttribute('href')
            }));
        }

        cachedNavLinks.forEach(item => {
            if (item.targetId === '#' + currentId) {
                item.element.classList.add('active');
            } else {
                item.element.classList.remove('active');
            }
        });
    }

    let isScrollTicking = false;
    window.isMainPageScrolling = false;
    let mainScrollTimeout = null;

    function onScrollThrottled() {
        if (!window.isMainPageScrolling) {
            window.isMainPageScrolling = true;
        }
        if (mainScrollTimeout) clearTimeout(mainScrollTimeout);
        mainScrollTimeout = setTimeout(() => {
            window.isMainPageScrolling = false;
        }, 150);

        if (!isScrollTicking) {
            requestAnimationFrame(() => {
                handleHeaderScroll();
                updateActiveNav();
                if (typeof window.updateScrollProgressFn === 'function') {
                    window.updateScrollProgressFn();
                }
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    handleHeaderScroll();
    updateActiveNav();

    // ---- Mobile Navigation Toggle ----
    // ---- Mobile Navigation Controls ----
    let menuOpen = false;

    function openMobileMenu() {
        menuOpen = true;
        if (mobileToggle) mobileToggle.classList.add('open');
        if (mobileMenu) mobileMenu.classList.add('open');
        if (header) header.classList.add('menu-active');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
        if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        menuOpen = false;
        if (mobileToggle) mobileToggle.classList.remove('open');
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (header) header.classList.remove('menu-active');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function toggleMobileMenu() {
        if (menuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on ANY mobile link click/tap
    const allMobileMenuLinks = document.querySelectorAll('#mobile-menu a[href]');
    allMobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Mobile Dropdown Accordions
    const dropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const content = btn.nextElementSibling;
            
            // Toggle active states
            btn.classList.toggle('active');
            if (content) {
                content.classList.toggle('open');
            }
        });
    });

    // Close mobile menu on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            closeMobileMenu();
        }
    });

    // ---- Hero Image: Prevent Drag / Context Menu / Selection ----
    if (heroImg) {
        heroImg.addEventListener('dragstart', (e) => e.preventDefault());
        heroImg.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    if (heroSection) {
        heroSection.addEventListener('contextmenu', (e) => e.preventDefault());
        heroSection.addEventListener('dragstart', (e) => e.preventDefault());
    }

    // ---- High-Performance IntersectionObserver Scroll Reveal ----
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px 60px 0px' });

        scrollRevealEls.forEach(el => revealObserver.observe(el));
    } else {
        scrollRevealEls.forEach(el => el.classList.add('revealed'));
    }

    // ---- Instant Page Prefetcher & Zero-Delay Link Navigator ----
    const prefetchedUrls = new Set();
    function prefetchUrl(url) {
        if (!url || prefetchedUrls.has(url) || url.startsWith('#') || url.startsWith('javascript:')) return;
        prefetchedUrls.add(url);
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }

    // Prefetch links on hover/touch
    document.addEventListener('mouseover', (e) => {
        const anchor = e.target.closest('a[href]');
        if (anchor && anchor.origin === window.location.origin) {
            prefetchUrl(anchor.href);
        }
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
        const anchor = e.target.closest('a[href]');
        if (anchor && anchor.origin === window.location.origin) {
            prefetchUrl(anchor.href);
        }
    }, { passive: true });



    // ---- Copy Email Button Handler ----
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const email = btn.getAttribute('data-email');
            if (email) {
                try {
                    await navigator.clipboard.writeText(email);
                    btn.classList.add('copied');
                    const tooltip = btn.querySelector('.copy-tooltip');
                    if (tooltip) tooltip.textContent = 'Copied!';
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        if (tooltip) tooltip.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy email:', err);
                }
            }
        });
    });

    // ---- Contact Category Tabs Handler ----
    const categoryTabs = document.querySelectorAll('#contact-category-tabs .contact-tab');
    const userSubjectInput = document.getElementById('user-subject');
    
    // Set initial subject value based on default active tab
    const initialActiveTab = document.querySelector('#contact-category-tabs .contact-tab.active');
    if (initialActiveTab && userSubjectInput && !userSubjectInput.value) {
        userSubjectInput.value = initialActiveTab.getAttribute('data-subject') || '';
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const subjectVal = tab.getAttribute('data-subject');
            if (userSubjectInput && subjectVal) {
                userSubjectInput.value = subjectVal;
                userSubjectInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    });

    // ---- 3D Tilt Animations for Cards & Form (Hardware Accelerated & Throttled) ----
    const tiltElements = document.querySelectorAll('.contact-card, .contact-form-wrapper');
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        tiltElements.forEach(el => {
            let rect = null;
            let tiltTicking = false;

            el.addEventListener('mouseenter', () => {
                rect = el.getBoundingClientRect();
            }, { passive: true });

            el.addEventListener('mousemove', (e) => {
                if (window.isMainPageScrolling) return;
                if (!rect) rect = el.getBoundingClientRect();
                const clientX = e.clientX;
                const clientY = e.clientY;

                if (!tiltTicking) {
                    requestAnimationFrame(() => {
                        tiltTicking = false;
                        if (!rect) return;
                        const x = clientX - rect.left;
                        const y = clientY - rect.top;
                        
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        const rotateX = ((y - centerY) / centerY) * -4;
                        const rotateY = ((x - centerX) / centerX) * 4;
                        
                        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
                    });
                    tiltTicking = true;
                }
            }, { passive: true });

            el.addEventListener('mouseleave', () => {
                rect = null;
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            }, { passive: true });
        });
    }

    // ---- Contact Form CAPTCHA ----
    let contactCaptchaVal = generateCaptchaCode(5);

    const contactCaptchaCodeEl = document.getElementById('contact-captcha-code');
    const contactCaptchaRefreshBtn = document.getElementById('contact-captcha-refresh');
    const contactCaptchaInput = document.getElementById('contact-captcha-input');
    const contactCaptchaError = document.getElementById('contact-captcha-error');

    if (contactCaptchaCodeEl) {
        contactCaptchaCodeEl.innerText = contactCaptchaVal;
    }
    if (contactCaptchaRefreshBtn) {
        contactCaptchaRefreshBtn.addEventListener('click', () => {
            contactCaptchaVal = generateCaptchaCode(5);
            if (contactCaptchaCodeEl) contactCaptchaCodeEl.innerText = contactCaptchaVal;
            if (contactCaptchaInput) contactCaptchaInput.value = '';
            if (contactCaptchaError) contactCaptchaError.style.display = 'none';
        });
    }

    // ---- Contact Form Submission ----
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic validation check
            const inputs = contactForm.querySelectorAll('[required]');
            let valid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderBottomColor = '#EF4444';
                    setTimeout(() => {
                        input.style.borderBottomColor = '';
                    }, 2000);
                }
            });

            // Email format validation
            const emailInput = contactForm.querySelector('[type="email"]');
            if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                valid = false;
                emailInput.style.borderBottomColor = '#EF4444';
                setTimeout(() => {
                    emailInput.style.borderBottomColor = '';
                }, 2000);
            }

            // CAPTCHA verification
            if (contactCaptchaInput) {
                if (contactCaptchaInput.value.trim() !== contactCaptchaVal) {
                    if (contactCaptchaError) contactCaptchaError.style.display = 'block';
                    contactCaptchaInput.focus();
                    return;
                } else {
                    if (contactCaptchaError) contactCaptchaError.style.display = 'none';
                }
            }

            if (!valid) return;

            // Submit form
            const submitBtn = document.getElementById('submit-btn');
            const submitText = document.getElementById('submit-text');
            const originalText = submitText.textContent;

            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';

            const nameVal = contactForm.querySelector('input[name="name"]')?.value || '';
            const phoneVal = contactForm.querySelector('input[name="phone"]')?.value || '';
            const emailVal = contactForm.querySelector('input[name="email"]')?.value || '';
            const subjectVal = contactForm.querySelector('input[name="subject"]')?.value || 'General Inquiry';
            const messageVal = contactForm.querySelector('textarea[name="message"]')?.value || '';

            // Send to Telegram in parallel
            sendToTelegram({
                name: nameVal,
                email: emailVal,
                subject: subjectVal,
                message: messageVal
            }, 'contact');

            try {
                // Backend API call that forwards to Telegram & Email
                const res = await fetch('/api/enroll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: nameVal,
                        phone: phoneVal,
                        email: emailVal,
                        subject: subjectVal,
                        message: messageVal,
                        source: 'Contact Us Form',
                        url: window.location.href
                    })
                });

                const data = await res.json();
                if (data.success || res.ok) {
                    formSuccess.classList.add('show');
                    contactForm.reset();
                    // Refresh CAPTCHA code
                    contactCaptchaVal = generateCaptchaCode(5);
                    if (contactCaptchaCodeEl) contactCaptchaCodeEl.innerText = contactCaptchaVal;
                } else {
                    alert(data.error || 'Submission failed. Please try again.');
                }
            } catch (err) {
                console.error('Error submitting form:', err);
                alert('Network error. Your enquiry was received via backup channel. Please try again or contact us directly.');
            } finally {
                submitBtn.disabled = false;
                submitText.textContent = originalText;
            }
        });
    }

    // ---- Reset Form ----
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            formSuccess.classList.remove('show');
        });
    }

    // ---- Newsletter Form ----
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');

            if (emailInput && emailInput.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                newsletterSuccess.classList.add('show');
                emailInput.value = '';

                setTimeout(() => {
                    newsletterSuccess.classList.remove('show');
                }, 4000);
            }
        });
    }

    // ---- Smooth scroll for all anchor & section links ----
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const rawHref = this.getAttribute('href');
            if (!rawHref || rawHref === '#') return;

            let targetId = '';
            if (rawHref.startsWith('#')) {
                targetId = rawHref;
            } else if (rawHref.includes('#')) {
                const parts = rawHref.split('#');
                const path = parts[0];
                const hash = '#' + parts[1];
                // Check if target element exists on current page or path is index.html on current home root
                if (document.querySelector(hash) && (path === '' || path === 'index.html' || window.location.pathname.endsWith(path) || window.location.pathname === '/')) {
                    targetId = hash;
                }
            }

            if (targetId) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    closeMobileMenu();

                    // Remove focus from hovered/active dropdowns
                    if (document.activeElement) {
                        document.activeElement.blur();
                    }

                    const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    const isMobileScroll = window.innerWidth <= 768 || ('ontouchstart' in window);
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: isMobileScroll ? 'auto' : 'smooth'
                    });
                }
            }
        });
    });

    // ---- Fade In Up animation keyframe (injected once) ----
    if (!document.querySelector('#monix-animations')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'monix-animations';
        styleSheet.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

});

/* ================================================
   DYNAMIC PAGE ENGINES & MODAL UI
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Instant Page Transition
    document.body.classList.add('page-enter');

    // 2. Dynamic-Style Rendering via URL Parameters & Paths (Vanilla JS)
    const urlParams = new URLSearchParams(window.location.search);
    let pageType = urlParams.get('type') || urlParams.get('id');

    // Route resolution fallback for clean URLs like /services/custom-software or /projects/sentinel-soc
    if (!pageType) {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
            const lastPart = pathParts[pathParts.length - 1].replace('.html', '');
            if (lastPart !== 'service-details' && lastPart !== 'internship-details' && lastPart !== 'index') {
                pageType = lastPart;
            }
        }
    }

    if (document.getElementById('dynamic-content')) {
        // Fallback default if no parameter is passed
        if (!pageType) {
            pageType = 'custom-software';
        }
        
        // Data Dictionary for Services, Industry Projects & Internships
        const dynamicData = {
            // =========================================================================
            // === CORE SERVICES ===
            // =========================================================================
            'custom-software': {
                title: 'Custom Software Architecture',
                desc: 'Enterprise-grade custom software built with microservices, clean domain-driven code, and scalable cloud infrastructure.',
                breadcrumb: 'Custom Software Architecture',
                badge: 'MSME CERTIFIED • ENTERPRISE READY',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Modular Microservices Architecture (Node.js, Go, Python, Java)',
                    'Sleek Modern Frontend Client Apps (React 19, Next.js 15, Tailwind CSS v4)',
                    'High-Throughput Databases (PostgreSQL, MongoDB, Redis Caching, Prisma)',
                    'Robust AWS/GCP Cloud Deployments, Docker & Kubernetes Clusters',
                    'Bank-Grade Security (Zero-Trust, AES-256 Encryption, OAuth2 / SSO)'
                ],
                projectsCount: 'Complete Code Handover • Architecture Blueprint • Support SLA',
                originalPrice: 'Worth ₹45,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: 'Flexible',
                sessions: 'Bi-Weekly',
                proofText: 'Trusted by 20+ Global Enterprises',
                cardBadge: 'ENTERPRISE ARCHITECTURE'
            },
            'web-dev': {
                title: 'High-Performance Web Development',
                desc: 'Bespoke web applications and corporate ecosystems engineered for 99+ PageSpeed scores, seamless user experience, and high conversion rates.',
                breadcrumb: 'Web Development',
                badge: 'PAGESPEED > 95 • MODERN STACK',
                image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Full-Stack Web Engineering using Next.js 15, React, & Node.js',
                    'Interactive UI Animations & Ultra-Fast Sub-Second Page Loading',
                    'Headless CMS & Dynamic Database Integration (Sanity, Supabase)',
                    'E-Commerce & Payment Gateway Integration (Stripe, Razorpay, PayPal)',
                    'Automated SEO Metadata Schema & Accessibility Compliance (WCAG AA)'
                ],
                projectsCount: 'Production Code Deployment • Lighthouse Audit Report • Source Ownership',
                originalPrice: 'Worth ₹35,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '1-3 Weeks',
                sessions: 'Weekly',
                proofText: 'Powering 50+ Modern Web Experiences',
                cardBadge: 'CORE ENGINEERING'
            },
            'corporate-websites': {
                title: 'Corporate Websites & Digital Platforms',
                desc: 'Luxury corporate websites and institutional platforms designed to establish market authority, attract enterprise clients, and communicate core value propositions.',
                breadcrumb: 'Corporate Websites',
                badge: 'ENTERPRISE BRANDING • HIGH CONVERSION',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Custom Corporate Branding & Typographic Hierarchy Alignment',
                    'Multi-Page Enterprise Layouts with Interactive Case Studies',
                    'Lead Capture Engines & CRM Sync (HubSpot, Salesforce, Zoho)',
                    'Multi-Language Localization (i18n) & Internationalization',
                    'Ultra-Secure Cloud Hosting on Cloudflare & Vercel Edge'
                ],
                projectsCount: 'Full Source Code • CMS Admin Access • SEO Optimization',
                originalPrice: 'Worth ₹40,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '1-2 Weeks',
                sessions: 'Weekly',
                proofText: 'Built for Fortune 500 & Emerging Leaders',
                cardBadge: 'CORPORATE SUITE'
            },
            'ecommerce-platforms': {
                title: 'High-Conversion E-Commerce Platforms',
                desc: 'Scalable online store engines and custom e-commerce applications built to handle high transactional concurrency, instant checkout flows, and automated inventory sync.',
                breadcrumb: 'E-Commerce Platforms',
                badge: 'HIGH CONCURRENCY • PCI-DSS COMPLIANT',
                image: 'https://images.unsplash.com/photo-1556742049-0a6708000773?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Custom Storefront Engineering (Next.js Commerce, Shopify Headless)',
                    'Multi-Currency & Global Payment Gateways (Stripe, Razorpay, Crypto)',
                    'AI Product Recommendations & Predictive Search Filters',
                    'Real-Time Inventory Synchronization & Order Management Panel',
                    'Automated Abandoned Cart Recovery & SMS/WhatsApp Notifications'
                ],
                projectsCount: 'Complete E-Commerce Web App • Merchant Dashboard • Payment Code',
                originalPrice: 'Worth ₹50,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '2-4 Weeks',
                sessions: 'Bi-Weekly',
                proofText: 'Processing $2M+ in Annual Digital GMV',
                cardBadge: 'E-COMMERCE TECH'
            },
            'landing-pages': {
                title: 'High-Converting Landing Pages & Lead Funnels',
                desc: 'Conversion-rate-optimized landing pages designed with persuasive sales copy, lightning-fast interactive forms, and targeted funnel tracking.',
                breadcrumb: 'Landing Pages & Funnels',
                badge: 'CONVERSION-FOCUSED • SUB-SECOND LOAD',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Behavioral Psychology & Conversion-Focused UX Wireframing',
                    'A/B Testing Integration & Heatmap Analytics Tracking (Hotjar, PostHog)',
                    'Dynamic Form Validation & Instant CRM/Telegram Lead Routing',
                    'Responsive Mobile-First Rendering & Touch Optimization',
                    'Performance Optimization to exceed 98+ PageSpeed Metrics'
                ],
                projectsCount: 'Deployable Landing Page • Conversion Funnel Analytics • Source',
                originalPrice: 'Worth ₹25,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '3-7 Days',
                sessions: 'Daily',
                proofText: 'Delivering 3.5x Higher Conversion Rates',
                cardBadge: 'LEAD FUNNEL'
            },
            'multivendor-marketplaces': {
                title: 'Multi-Vendor Marketplaces & B2B Portals',
                desc: 'Comprehensive multi-vendor ecosystem platforms with seller management, automated commission payouts, vendor dashboards, and multi-currency billing.',
                breadcrumb: 'Multi-Vendor Marketplaces',
                badge: 'MULTI-TENANT VENDOR PORTAL',
                image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Vendor Onboarding, KYC Verification & Commission Engine',
                    'Customer Portal, Vendor Admin & Master Platform Control Panel',
                    'Automated Escrow & Split Payout Routing (Stripe Connect, Razorpay Route)',
                    'Real-Time In-App Messaging & Order Status Tracking',
                    'Product Catalogue Management & Bulk Import/Export CSV'
                ],
                projectsCount: '3-Tier Platform (Admin, Vendor, Customer) • Source Code',
                originalPrice: 'Worth ₹65,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '3-5 Weeks',
                sessions: 'Weekly',
                proofText: 'Supporting 1,000+ Active Marketplace Vendors',
                cardBadge: 'MARKETPLACE ENGINE'
            },
            'custom-web-apps': {
                title: 'Scalable Web Applications & SaaS Engines',
                desc: 'Custom web application software, single-page apps (SPAs), and SaaS products engineered with complex business logic, user auth, and API backends.',
                breadcrumb: 'Custom Web Apps',
                badge: 'FULL-STACK SAAS ARCHITECTURE',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Full-Stack Architecture (React 19 / Vue 3 + Node.js / Python FastApi)',
                    'Secure User Authentication (JWT, Refresh Tokens, OAuth2, RBAC)',
                    'Interactive Data Analytics, Charts (Recharts, D3) & Real-time WebSockets',
                    'Restful API & GraphQL Backend Service Endpoints',
                    'Automated Unit & End-to-End Testing Pipelines (Playwright, Jest)'
                ],
                projectsCount: 'Full Web App Source • API Documentation • CI/CD Pipeline',
                originalPrice: 'Worth ₹55,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '2-4 Weeks',
                sessions: 'Bi-Weekly',
                proofText: 'Serving Over 250,000 Monthly Active Users',
                cardBadge: 'SAAS ENGINE'
            },
            'uiux-design': {
                title: 'UI/UX Design & Product Strategy',
                desc: 'Luxury user experience design, Figma component design systems, interactive prototypes, and usability testing tailored to modern digital products.',
                breadcrumb: 'UI/UX Design',
                badge: 'FIGMA DESIGN SYSTEM • LUXURY UI',
                image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'User Persona Mapping & Information Architecture (IA)',
                    'Figma Design Tokens, Auto-Layout Components & UI Kit Creation',
                    'Interactive Clickable Prototypes for Web & Mobile',
                    'Dark & Light Mode Themes with WCAG AA Accessibility Compliance',
                    'Developer-Ready Handoff Assets & Design Specs'
                ],
                projectsCount: 'Figma Master Source File • Interactive Prototype • UI Style Guide',
                originalPrice: 'Worth ₹30,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '1-2 Weeks',
                sessions: 'Weekly',
                proofText: 'Crafting Award-Winning Digital Interfaces',
                cardBadge: 'DESIGN & CRAFT'
            },
            'logo-branding': {
                title: 'Logo & Brand Identity System',
                desc: 'Comprehensive visual branding systems, custom logos, typography palettes, brand guidelines, and marketing asset kits for market positioning.',
                breadcrumb: 'Logo & Branding',
                badge: 'BRAND STRATEGY • VECTOR ASSETS',
                image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Brand Core Values, Positioning & Conceptual Ideation',
                    'Vector Logo Mark & Wordmark Design (SVG, AI, EPS, PNG)',
                    'Typography Pairings, Color Palette Math & Usage Rules',
                    'Brand Identity Guidelines Book (PDF & Web Version)',
                    'Social Media Kit, Stationery, & Digital Brand Banners'
                ],
                projectsCount: 'Complete Brand Guidelines PDF • Vector Logo Files • Asset Suite',
                originalPrice: 'Worth ₹20,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '3-7 Days',
                sessions: 'Bi-Weekly',
                proofText: 'Refining Brands Across Tech, Retail & Finance',
                cardBadge: 'BRAND IDENTITY'
            },
            'figma-to-code': {
                title: 'Figma & PSD to Pixel-Perfect Code',
                desc: 'Transform your design files (Figma, Adobe XD, PSD, Sketch) into clean, semantic, responsive HTML5/CSS3 or React/Next.js code.',
                breadcrumb: 'Figma to Code',
                badge: '100% PIXEL PERFECT • CLEAN CODE',
                image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Pixel-Perfect HTML5/CSS3 & Tailwind CSS v4 Code Conversion',
                    'Component Modularization in React 19 / Next.js / Vue',
                    'Responsive Fluid Breakpoints (Mobile, Tablet, Desktop, Ultra-Wide)',
                    'Smooth CSS Animations, Micro-Interactions & Hover Feedback',
                    'Zero External Bloat, W3C Validated & Cross-Browser Tested'
                ],
                projectsCount: 'Clean Modular Source Code • W3C Validation Report',
                originalPrice: 'Worth ₹22,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '3-5 Days',
                sessions: 'Daily',
                proofText: 'Converted 300+ Design Files into Production Code',
                cardBadge: 'CODE CONVERSION'
            },
            'responsive-design': {
                title: 'Responsive Web Design & Optimization',
                desc: 'Modernize legacy websites into fully responsive, mobile-first, high-speed web interfaces that render flawlessly on every display size.',
                breadcrumb: 'Responsive Web Design',
                badge: 'MOBILE-FIRST • FLUID BREAKPOINTS',
                image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Mobile-First Layout Restructuring & Fluid Typography Scaling',
                    'Touch Event & Gesture Optimization for Mobile Displays',
                    'High-DPI Retina Display Asset Optimization & Modern WebP Image Conversion',
                    'Viewport Breakpoint Testing Across iOS & Android Devices',
                    'Speed Optimization & Render-Blocking Resource Removal'
                ],
                projectsCount: 'Refactored Mobile-Optimized Website • Performance Audit',
                originalPrice: 'Worth ₹18,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '3-5 Days',
                sessions: 'Daily',
                proofText: 'Enhancing Mobile UX for 100+ Digital Assets',
                cardBadge: 'MOBILE UX'
            },
            'mobile-ui': {
                title: 'Mobile App UI/UX Prototyping',
                desc: 'Design human-centric mobile app user interfaces for iOS and Android, complete with interactive click-through prototypes and component libraries.',
                breadcrumb: 'Mobile App UI/UX',
                badge: 'NATIVE IOS & ANDROID LOOK',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'iOS Human Interface Guidelines & Android Material 3 Design',
                    'Mobile App Navigation Flow, Gestures, & Modal Overlays',
                    'Interactive Figma Click-Through App Prototype',
                    'UI Micro-Animations (Lottie Files, Rive Asset Specs)',
                    'Exported Assets & Redline Specifications for App Developers'
                ],
                projectsCount: 'Interactive Mobile App Figma • Asset Kit • Developer Handover',
                originalPrice: 'Worth ₹28,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '1-2 Weeks',
                sessions: 'Weekly',
                proofText: 'Designing Apps Featured on Google Play & App Store',
                cardBadge: 'MOBILE UI'
            },
            'ai-automation': {
                title: 'AI & Workflow Automation',
                desc: 'Integrate LLMs, AI agents, and RPA into your business processes to drastically reduce manual labor and accelerate response times.',
                breadcrumb: 'AI & Workflow Automation',
                badge: 'AI INFUSED • AUTO-OPTIMIZED',
                image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Custom LLM Integration & Fine-Tuning (GPT-4o, Claude 3.5, Gemini 2.5)',
                    'Autonomous AI Agent Networks (CrewAI, LangGraph, AutoGen)',
                    'Automated Multi-Channel Customer Support Bots (WhatsApp, Web, Discord)',
                    'Workflow Orchestration & Scraping Engines (Zapier, Make.com, Puppeteer)',
                    'Business Intelligence Dashboards with Real-time metrics'
                ],
                projectsCount: 'Full Source Code • API Documentation • 30-Day Support SLA',
                originalPrice: 'Worth ₹35,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: 'Flexible',
                sessions: 'Bi-Weekly',
                proofText: 'Trusted by 15+ Automated Systems',
                cardBadge: 'LAUNCH OFFER'
            },
            'academic-projects': {
                title: 'Academic & Final Year IEEE IT Projects',
                desc: 'End-to-end IT, Computer Science, and AI final year project development packages with runnable source code, IEEE base papers, and project report documentation.',
                breadcrumb: 'Academic IT Projects',
                badge: 'IEEE STANDARD • 100% RUNNABLE CODE',
                image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Latest IEEE Research Paper Selection & System Domain Analysis',
                    'Full Working Source Code in Python / Java / Node.js / React',
                    'Complete Project Documentation Report (Word/PDF with Diagrams)',
                    'Database ER Diagrams, Data Flow Charts & UML Class Diagrams',
                    'Live Demo Session & Technical Viva Voce Guidance'
                ],
                projectsCount: 'Full Source Code Repository • Project Report PDF • PPT Presentation',
                originalPrice: 'Worth ₹25,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '1-2 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Helped 500+ Engineering Graduates Secure Top Marks',
                cardBadge: 'ACADEMIC SUITE'
            },
            'mvp-dev': {
                title: 'Rapid Startup MVP Development',
                desc: 'Transform your product idea into a market-ready Minimum Viable Product (MVP) in 2 to 4 weeks with production-grade code ready for pitch decks and beta users.',
                breadcrumb: 'MVP Development',
                badge: 'FAST LAUNCH • INVESTOR READY',
                image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Core Feature Scope Definition & Rapid Architecture Blueprint',
                    'Full-Stack Rapid Prototype Development (Next.js, Supabase, Tailwind)',
                    'User Registration, OAuth Authentication & Subscription Billing',
                    'Analytics & Event Tracking Setup for Beta User Insights',
                    'Deploy to Production Cloud with Continuous Integration (CI/CD)'
                ],
                projectsCount: 'Production MVP Launch • Full Source Ownership • Pitch Tech Stack',
                originalPrice: 'Worth ₹45,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '2-3 Weeks',
                sessions: 'Weekly',
                proofText: 'Helped 12+ Early Stage Startups Raise Capital',
                cardBadge: 'STARTUP MVP'
            },
            'erp-crm': {
                title: 'Custom Enterprise ERP & CRM Platforms',
                desc: 'Consolidate business workflows, inventory, HR resources, and customer relations into a unified cloud portal with real-time reporting dashboards.',
                breadcrumb: 'Enterprise ERP & CRM',
                badge: 'ENTERPRISE LEVEL • SECURE CLOUD',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Unified Resource & Staff Planning Modules',
                    'Interactive Client Pipelines & Lead Trackers',
                    'Automated Invoicing, Billing & Financial reporting',
                    'Secure Multi-Role Access Control (RBAC)',
                    'Real-Time PDF/Excel Export & Auto-Reporting engines'
                ],
                projectsCount: 'Fully Owned Database • Staff Training Session • Support SLA',
                originalPrice: 'Worth ₹60,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '4-8 Weeks',
                sessions: 'Weekly',
                proofText: 'Trusted by Top Industrial Brands',
                cardBadge: 'ENTERPRISE CHOICE'
            },
            'cloud-devops': {
                title: 'Cloud Infrastructure & DevOps Automation',
                desc: 'Architect and deploy robust GCP/AWS cloud environments with automated CI/CD pipelines, Kubernetes, and zero-downtime cluster hosting.',
                breadcrumb: 'Cloud & DevOps',
                badge: '99.99% UPTIME GUARANTEE',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Infrastructure as Code (IaC) using Terraform',
                    'Container Orchestration (Docker, Kubernetes/K8s, ECS)',
                    'Robust Automated CI/CD Pipelines (GitHub Actions, GitLab CI)',
                    'Zero-Downtime Blue-Green / Canary Deployments',
                    'Proactive Real-Time Monitoring & Alerts (Prometheus, Grafana)'
                ],
                projectsCount: 'Terraform Scripts • Architecture Charts • Security Audit',
                originalPrice: 'Worth ₹40,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: 'Flexible',
                sessions: 'Bi-Weekly',
                proofText: 'Managing High-Scale Cloud Infrastructures',
                cardBadge: 'CLOUD DEVOPS'
            },
            'generative-ai': {
                title: 'Generative AI & Agentic Workflows',
                desc: 'Integrate LLMs, custom machine learning models, vector databases, and autonomous AI agents to accelerate business decision making.',
                breadcrumb: 'Generative AI Solutions',
                badge: 'NEXT-GEN AI ENGINE',
                image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Retrieval-Augmented Generation (RAG) Platforms',
                    'Semantic Search & Vector Database Storage (Pinecone, PGVector)',
                    'Custom Embedding Generation & Document Chunking pipelines',
                    'Multi-Modal Processing (Text-to-Speech, Speech-to-Text, Vision AI)',
                    'AI Guardrails & Bias Filtering implementation'
                ],
                projectsCount: 'AI Prompt Library • Model Fine-Tuning Code • Evaluation Report',
                originalPrice: 'Worth ₹50,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: 'Flexible',
                sessions: 'Weekly',
                proofText: 'Leveraging State-of-the-Art Generative Models',
                cardBadge: 'AI EDGE'
            },
            'custom-saas': {
                title: 'High-Performance Custom SaaS Architecture',
                desc: 'Develop secure, multi-tenant web systems, complete with subscription billing logic, API rate limiting, and modular microservices.',
                breadcrumb: 'Custom SaaS Architecture',
                badge: 'MULTI-TENANT READY',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Secure Tenant Isolation & Database Partitioning',
                    'Subscription & Usage-Based Billing via Stripe / Razorpay',
                    'Robust Public API Endpoints with Rate Limiting',
                    'Interactive Data Visualizations & Real-Time Dashboards',
                    'Scalable Email/SMS Notification Orchestration'
                ],
                projectsCount: 'Stripe Integration Code • API Documentation • Code Handover',
                originalPrice: 'Worth ₹55,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: '4-6 Weeks',
                sessions: 'Weekly',
                proofText: 'Accelerating SaaS Founders to Launch',
                cardBadge: 'MVP BUILD'
            },
            'security-devsecops': {
                title: 'Enterprise Security & DevSecOps',
                desc: 'Implement robust authentication protocols, automated vulnerability scans, role-based access control, and end-to-end data encryption.',
                breadcrumb: 'Cybersecurity & DevSecOps',
                badge: 'ZERO-TRUST COMPLIANT',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Zero-Trust Architecture & Single Sign-On (OIDC / SAML)',
                    'Static and Dynamic Security Vulnerability Scanning (SAST/DAST)',
                    'End-to-End Data Encryption at Rest & In Transit',
                    'Automated Penetration Testing & Threat Modeling',
                    'Regulatory Compliance Readiness (ISO27001, SOC2, HIPAA)'
                ],
                projectsCount: 'Compliance Certificate Draft • Vulnerability Scan Report',
                originalPrice: 'Worth ₹48,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: 'Flexible',
                sessions: 'Weekly',
                proofText: 'Securing Sensitive Corporate Assets',
                cardBadge: 'SECURE FLOW'
            },
            'etl-automation': {
                title: 'ETL & Real-Time Data Orchestration',
                desc: 'Design custom ETL systems that automatically ingest, sanitize, sync, and visualize internal business data feeds in real-time dashboards.',
                breadcrumb: 'ETL & Automation',
                badge: 'DATA INTEGRITY ENFORCED',
                image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'High-Throughput Data Ingestion Pipelines',
                    'Automated Data Cleansing, Normalization & Sanitization',
                    'Data Lake & Modern Data Warehouse Integration (BigQuery, Snowflake)',
                    'Cron-Scheduled Auto-Sync Tasks & Airflow DAG Orchestration',
                    'Visual Analytics & Enterprise BI Dashboards'
                ],
                projectsCount: 'Data Pipeline Scripts • Airflow Setup • Dashboard Source',
                originalPrice: 'Worth ₹38,000',
                discount: '100% FREE',
                price: 'FREE',
                duration: 'Flexible',
                sessions: 'Bi-Weekly',
                proofText: 'Syncing Millions of Corporate Data Points',
                cardBadge: 'DATA EXPERT'
            },

            // =========================================================================
            // === INDUSTRY PROJECT DOMAINS / CASE STUDIES ===
            // =========================================================================
            'healthcare': {
                title: 'Healthcare & Medical Web Applications',
                desc: 'AI-assisted medical diagnosis web portals, EHR patient dashboards, HIPAA-compliant telehealth applications, and appointment scheduling web systems.',
                breadcrumb: 'Healthcare & Medical Web Portals',
                badge: 'HIPAA & MEDICAL WEB COMPLIANT',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Machine Learning Web Models for Disease Risk & Diagnostics',
                    'Electronic Health Record (EHR) & Doctor Telehealth Portals',
                    'Patient Appointment Scheduling & Prescription Management Web Apps',
                    'Real-Time Patient Vitals Analytics Web Dashboards',
                    'HIPAA Compliance, Data Encryption & Access Control Systems'
                ],
                projectsCount: 'Full Source Code • IEEE Documentation • Live Web Portal',
                originalPrice: 'Worth ₹45,000',
                discount: 'ACADEMIC / ENTERPRISE READY',
                price: 'Custom Quote',
                duration: '1-4 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Used by Healthcare Leaders & Final Year Students',
                cardBadge: 'HEALTH TECH'
            },
            'ecommerce': {
                title: 'E-Commerce & Retail Web Platforms',
                desc: 'Multi-vendor marketplace web applications, personalized AI recommendation engines, storefront portals, and payment gateway integrations.',
                breadcrumb: 'E-Commerce & Retail Web Portals',
                badge: 'MULTI-VENDOR MARKETPLACE',
                image: 'https://images.unsplash.com/photo-1556742049-0a6708000773?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Full-Featured Multi-Vendor Marketplace & Seller Web Dashboards',
                    'AI Product Recommendation & Collaborative Filtering Web Engine',
                    'Stripe / UPI / Razorpay Payment Gateway Web Integration',
                    'Real-Time Order Tracking & Automated Email/SMS Receipts',
                    'Admin Analytics Dashboard & Web Inventory Management'
                ],
                projectsCount: 'Complete Multi-Vendor App • Admin Panel • Payment Code',
                originalPrice: 'Worth ₹40,000',
                discount: 'FULL STACK READY',
                price: 'Custom Quote',
                duration: '1-3 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Powering 200+ Retail Solutions',
                cardBadge: 'E-COMMERCE'
            },
            'cybersecurity-domain': {
                title: 'Web Application Security & Defense',
                desc: 'Automated web application penetration testing, API vulnerability assessment platforms, zero-trust web authentication, and OWASP audit engines.',
                breadcrumb: 'Web & Application Security',
                badge: 'OWASP TOP 10 & ZERO-TRUST WEB DEFENSE',
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Web Application Penetration Testing & OWASP Top 10 Scanners',
                    'Automated Vulnerability Assessment & API Security Portals',
                    'Security Information & Event Management (SIEM) Web Radar',
                    'Zero-Trust Identity Authentication, OAuth2 & Multi-Factor Auth',
                    'Ethical Hacking Lab Setup & Web Security Mitigation Reports'
                ],
                projectsCount: 'Pentest Scripts • SIEM Dashboard • Security Report',
                originalPrice: 'Worth ₹45,000',
                discount: 'DEFENSE READY',
                price: 'Custom Quote',
                duration: '2-4 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Tested in High-Security Web Environments',
                cardBadge: 'SECURITY'
            },
            'fintech': {
                title: 'FinTech & Payment Web Applications',
                desc: 'Digital banking web portals, payment gateway integrations, financial analytics web dashboards, and secure crypto wallet web apps.',
                breadcrumb: 'FinTech & Payment Portals',
                badge: 'PAYMENT GATEWAYS & FRAUD AI',
                image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Solidity Smart Contract Development & Web3.js Web Portals',
                    'AI-Powered Transaction Fraud Detection Web Engines',
                    'Decentralized Crypto Wallet & Token Swap Web Applications',
                    'Algorithmic Trading Dashboards & Live Market Data Streaming',
                    'Bank-Grade Encryption & Regulatory Web Compliance Workflows'
                ],
                projectsCount: 'Smart Contracts • Web3 DApp Source • AI Fraud Code',
                originalPrice: 'Worth ₹50,000',
                discount: 'BLOCKCHAIN READY',
                price: 'Custom Quote',
                duration: '2-4 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Audited & Verified Web Architectures',
                cardBadge: 'FINTECH'
            },
            'web-apis': {
                title: 'Custom Web Apps & API Software Systems',
                desc: 'High-throughput REST & GraphQL APIs, microservice web backends, enterprise web application suites, and cloud software pipelines.',
                breadcrumb: 'Custom Web Apps & APIs',
                badge: 'MICROSERVICES & WEB API ARCHITECTURE',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'RESTful & GraphQL API Design, Rate Limiting & OpenAPI Specs',
                    'Microservices Web Architecture & Message Queue Systems (RabbitMQ/Kafka)',
                    'Database ORM Modeling, Indexing & Caching Strategies (Redis / PostgreSQL)',
                    'Full-Stack Web Portal Integration & Auth Middleware (JWT/OAuth2)',
                    'Automated Unit Testing, API Monitoring & Production Docker Deployment'
                ],
                projectsCount: 'Full API Source • Swagger Docs • Web Application Integration',
                originalPrice: 'Worth ₹38,000',
                discount: 'ENTERPRISE READY',
                price: 'Custom Quote',
                duration: '1-3 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Powering Scalable Web Applications & APIs',
                cardBadge: 'WEB ARCHITECTURE'
            },
            'mobile-apps': {
                title: 'Mobile & Web Application Engineering',
                desc: 'Native Android (Kotlin) and cross-platform Flutter/React Native mobile applications, Progressive Web Apps (PWAs), and responsive web clients.',
                breadcrumb: 'Mobile & Web App Engineering',
                badge: 'FLUTTER, REACT NATIVE & PWAs',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Cross-Platform Flutter, React Native & Mobile Web Architecture',
                    'State Management (Provider, Bloc, Redux) & Clean Code',
                    'Firebase Authentication & Cloud Firestore Database Integration',
                    'Google Maps Location Tracking, PWAs & Push Notifications',
                    'APK Production Builds, iOS App Store & Web Publishing'
                ],
                projectsCount: 'Full App Source Code • APK / Web Build • Documentation',
                originalPrice: 'Worth ₹40,000',
                discount: 'PLAY STORE READY',
                price: 'Custom Quote',
                duration: '1-3 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Over 50+ Mobile & Web Apps Published',
                cardBadge: 'MOBILE APPS'
            },
            'saas-cloud': {
                title: 'Cloud DevOps & Enterprise SaaS Web Platforms',
                desc: 'Multi-tenant SaaS web architectures, Docker/Kubernetes container orchestration, Terraform IaC, and automated CI/CD web pipelines.',
                breadcrumb: 'Cloud DevOps & SaaS Portals',
                badge: 'MULTI-TENANT SAAS & KUBERNETES',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Multi-Tenant Web Database Design & Schema Isolation',
                    'Kubernetes Cluster Deployment & Docker Containerization',
                    'Infrastructure as Code (IaC) with Terraform & AWS/GCP Cloud',
                    'CI/CD Web Pipelines using GitHub Actions & Automated Testing',
                    'Stripe Subscription Billing & Tenant Admin Web Dashboards'
                ],
                projectsCount: 'IaC Scripts • Dockerfiles • SaaS Web Boilerplate Source',
                originalPrice: 'Worth ₹50,000',
                discount: 'ENTERPRISE READY',
                price: 'Custom Quote',
                duration: '2-4 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Trusted by High-Growth SaaS Web Startups',
                cardBadge: 'CLOUD SAAS'
            },
            'education': {
                title: 'E-Learning & Educational Web Portals',
                desc: 'Learning Management System (LMS) web platforms, virtual live classroom tools, AI auto-grading, student progress analytics, and video course streaming.',
                breadcrumb: 'E-Learning & LMS Portals',
                badge: 'LMS & VIRTUAL CLASSROOM WEB APPS',
                image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Learning Management System (LMS) Student & Instructor Web Portals',
                    'AI-Powered Automated Assignment Grading & Quiz Web Generator',
                    'Video Course Streaming & Digital Certificate Issuance Web Apps',
                    'Live Interactive Video Classroom & Real-Time Chat Integration',
                    'Student Attendance & Web Analytics Dashboard'
                ],
                projectsCount: 'Full LMS Web App • Video Stream Code • PPT & Report',
                originalPrice: 'Worth ₹35,000',
                discount: 'ACADEMIC READY',
                price: 'Custom Quote',
                duration: '1-3 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Used by Universities & Educational Portals',
                cardBadge: 'E-LEARNING'
            },
            'realestate': {
                title: 'Real Estate & PropTech Web Systems',
                desc: 'Property search web portals, 360 Virtual Tour embeds, agent CRM web applications, price valuation ML engines, and agreement generators.',
                breadcrumb: 'Real Estate & PropTech Web Apps',
                badge: 'PROPTECH & VIRTUAL TOURS',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Property Search Web Portal with Geospatial Maps & Filters',
                    'Machine Learning Property Price Valuation Web Engine',
                    'Agent Lead Management CRM & Inquiry Routing Web Portals',
                    'Virtual 360 Degree Property Tour Web Embeds',
                    'Automated Lease & Agreement Web Document Generator'
                ],
                projectsCount: 'PropTech Web Portal • Price Valuation Model • Source',
                originalPrice: 'Worth ₹38,000',
                discount: 'PROPTECH READY',
                price: 'Custom Quote',
                duration: '1-3 Weeks',
                sessions: 'Dedicated Mentor',
                proofText: 'Streamlining Real Estate Web Operations',
                cardBadge: 'PROPTECH'
            },

            // =========================================================================
            // === AI REMOTE INTERNSHIPS ===
            // =========================================================================
            'cse': {
                title: 'Computer Science & Engineering (CSE)',
                desc: 'Master core software engineering principles, data structures, algorithms, system design, and production software architecture.',
                breadcrumb: 'Computer Science & Engineering',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: Advanced Data Structures & Algorithms (Trees, Graphs, Dynamic Programming)',
                    'Module 2: Object-Oriented Programming & Enterprise Design Patterns',
                    'Module 3: Database System Design & Relational SQL Architectures',
                    'Module 4: Operating Systems, Networking & Distributed Systems Core',
                    'Module 5: End-to-End Software Engineering Project & Code Review'
                ],
                projectsCount: '+ 2 Core Software Engineering Builds • Git & GitHub',
                originalPrice: '₹11,999',
                discount: '83% OFF',
                price: '₹1,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 650+ CSE Students',
                cardBadge: 'POPULAR TRACK'
            },
            'ai-datascience': {
                title: 'AI & Data Science',
                desc: 'Master Python, pandas, statistical modeling, machine learning, and AI algorithms to extract insights and build predictive data pipelines.',
                breadcrumb: 'AI & Data Science',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: Python Data Science Ecosystem (NumPy, Pandas, Matplotlib)',
                    'Module 2: Exploratory Data Analysis (EDA) & Cleaning Real-World Datasets',
                    'Module 3: Machine Learning Foundations (Scikit-Learn, Regression, Classification)',
                    'Module 4: Deep Learning & Large Language Models (LLM API integrations)',
                    'Module 5: Interactive Analytics Dashboards deployment using Streamlit'
                ],
                projectsCount: '+ 2 Interactive Analytics Projects • Streamlit Host',
                originalPrice: '₹11,999',
                discount: '83% OFF',
                price: '₹1,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 400+ Budding Data Scientists',
                cardBadge: 'LIMITED SLOTS'
            },
            'ai-ml': {
                title: 'AI & Machine Learning (AI & ML)',
                desc: 'Build and train deep learning models, neural networks, computer vision, and predictive AI systems using PyTorch and TensorFlow.',
                breadcrumb: 'AI & Machine Learning',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: Foundations of Machine Learning & Statistical Learning',
                    'Module 2: Supervised & Unsupervised Learning Algorithms (Scikit-Learn)',
                    'Module 3: Deep Learning & Neural Networks Architectures (PyTorch / TensorFlow)',
                    'Module 4: Computer Vision (OpenCV) & Natural Language Processing (NLP)',
                    'Module 5: Model Deployment, Inference APIs & Edge ML Integration'
                ],
                projectsCount: '+ 2 Production ML Models • Live Inference API',
                originalPrice: '₹11,999',
                discount: '83% OFF',
                price: '₹1,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 500+ AI/ML Engineers',
                cardBadge: 'LIMITED SLOTS'
            },
            'cybersecurity': {
                title: 'Next-Gen Cybersecurity & Ethical Hacking',
                desc: 'Learn advanced offensive security, penetration testing, SOC operations, and defensive postures using modern threat intelligence.',
                breadcrumb: 'Cybersecurity',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: Ethical Hacking Foundations & Network Scanning (Nmap, Wireshark)',
                    'Module 2: Penetration Testing & Web Application Assessment (Burp Suite, OWASP Top 10)',
                    'Module 3: AI in Security (Using LLMs for vulnerability scans, code security review)',
                    'Module 4: Threat Intelligence & Incident Response in SOC Environments',
                    'Module 5: Portfolio Creation & Resume Review (How to land security roles)'
                ],
                projectsCount: '+ 2 Defensive Lab Setups • Live Pentesting Demo • Resume Audit',
                originalPrice: '₹11,999',
                discount: '75% OFF',
                price: '₹2,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 350+ Ethical Hackers',
                cardBadge: 'LIMITED SLOTS'
            },
            'ai-webdev': {
                title: 'AI-Powered Full-Stack Web Development',
                desc: 'Master modern frameworks, serverless architecture, and AI-assisted coding to build production-grade web applications from scratch.',
                breadcrumb: 'Full-Stack Web Dev',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: Responsive Core UI design using Tailwind CSS v4 & React 19',
                    'Module 2: RESTful API design & Node.js Express server backend architectures',
                    'Module 3: Persistent Database Integration (SQL/NoSQL) with Drizzle / Mongoose',
                    'Module 4: Dynamic State Management, Authentication (JWT), & Secure sessions',
                    'Module 5: Continuous Integration (CI/CD) & Cloud Deployment of web apps'
                ],
                projectsCount: '+ 2 Complete SaaS Applications • Live Vercel / Render Links',
                originalPrice: '₹11,999',
                discount: '83% OFF',
                price: '₹1,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 600+ Full-Stack Engineers',
                cardBadge: 'LIMITED SLOTS'
            },
            'ai-mobile': {
                title: 'AI-Assisted Mobile App Architecture',
                desc: 'Design and build cross-platform mobile applications using AI-augmented development workflows and modern component architectures.',
                breadcrumb: 'Mobile App Architecture',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: Cross-Platform Framework Setup (Flutter / React Native)',
                    'Module 2: AI-Driven Mobile UI Layout design using Figma & AI converters',
                    'Module 3: State Management & Offline-First API Caching models',
                    'Module 4: Push Notifications, Geolocation, and Native Device Features',
                    'Module 5: Publishing to Google Play / App Store & CI/CD deployment'
                ],
                projectsCount: '+ 2 Fully Functional Mobile Apps • Play Store Ready',
                originalPrice: '₹11,999',
                discount: '83% OFF',
                price: '₹1,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 200+ Mobile Engineers',
                cardBadge: 'LIMITED SLOTS'
            },
            'prompt-engineering': {
                title: 'Next-Gen Prompt Engineering & LLMs',
                desc: 'Master the art of prompt engineering, fine-tuning LLMs, and integrating open-source models into applications.',
                breadcrumb: 'Prompt Engineering & LLMs',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1680814907495-d22513a20721?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: Prompting Engineering Paradigms (Few-Shot, CoT, ReAct)',
                    'Module 2: OpenAI, Anthropic, and Google Gemini API integration pattern',
                    'Module 3: Orchestration Frameworks (LangChain, LangGraph, LlamaIndex)',
                    'Module 4: Setting up local models using Ollama & HuggingFace pipelines',
                    'Module 5: Constructing dynamic AI chatbots with web-search capabilities'
                ],
                projectsCount: '+ 2 Smart AI Agents • API Library Portfolio',
                originalPrice: '₹11,999',
                discount: '75% OFF',
                price: '₹2,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 180+ AI Specialists',
                cardBadge: 'LIMITED SLOTS'
            },
            'generative-uiux': {
                title: 'Generative UI/UX & Product Design',
                desc: 'Learn AI-driven design thinking, generative prototyping, and modern product design workflows to create stunning user experiences.',
                breadcrumb: 'Generative UI/UX',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1541462608141-2758574e8416?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: User Experience (UX) foundations & Modern Figma design patterns',
                    'Module 2: Generative Design Workflows (v0.dev, Midjourney, Galileo AI)',
                    'Module 3: Prototyping Responsive and Accessible User Interfaces',
                    'Module 4: UX Audit methodologies & Interactive click-through maps',
                    'Module 5: Design handoff guidelines for high-performance development'
                ],
                projectsCount: '+ 2 Beautiful Interactive Prototyping Figmas',
                originalPrice: '₹11,999',
                discount: '83% OFF',
                price: '₹1,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 150+ Creative Designers',
                cardBadge: 'LIMITED SLOTS'
            },
            'ai-fullstack': {
                title: 'Next-Gen AI Full-Stack Internship',
                desc: 'Master the future of development by building Next.js apps with AI-assisted coding, autonomous agents, and production deployments.',
                breadcrumb: 'AI Full-Stack',
                badge: '15 DAYS • LIVE • REMOTE',
                image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80',
                syllabus: [
                    'Module 1: Modern Full-Stack Setup (Next.js 15, React 19, Tailwind CSS v4)',
                    'Module 2: AI-Assisted Development (Cursor, Windsurf, Claude/Gemini prompting)',
                    'Module 3: Database & Cloud Integration (PostgreSQL/Supabase, Prisma, Vercel)',
                    'Module 4: Build real-world AI projects (Chatbots, SaaS landing pages)',
                    'Module 5: Capstone Deployment, Git & Portfolio building'
                ],
                projectsCount: '+ 2 Real-World Projects • Git & GitHub • Portfolio Building',
                originalPrice: '₹11,999',
                discount: '83% OFF',
                price: '₹1,999',
                duration: '15',
                sessions: 'Daily',
                proofText: 'Joined by 500+ Students Worldwide',
                cardBadge: 'LIMITED SLOTS'
            }
        };

        // Resolve item data using pageType with safe fallback
        let data = dynamicData[pageType];
        if (!data) {
            // Attempt fuzzy fallback if exact key missed
            const matchedKey = Object.keys(dynamicData).find(k => k.includes(pageType) || pageType.includes(k));
            data = matchedKey ? dynamicData[matchedKey] : dynamicData['custom-software'];
        }
        
        if (data) {
            const dynamicTitleEl = document.getElementById('dynamic-title');
            const dynamicDescEl = document.getElementById('dynamic-desc');
            const dynamicBreadcrumbEl = document.getElementById('dynamic-breadcrumb');
            const dynamicBadgeEl = document.getElementById('dynamic-badge');
            const dynamicSyllabusListEl = document.getElementById('dynamic-syllabus-list');
            const dynamicProjectsCountEl = document.getElementById('dynamic-projects-count');
            const dynamicOriginalPriceEl = document.getElementById('dynamic-original-price');
            const dynamicDiscountEl = document.getElementById('dynamic-discount');
            const dynamicPriceEl = document.getElementById('dynamic-price');
            const dynamicDurationEl = document.getElementById('dynamic-duration');
            const dynamicSessionsEl = document.getElementById('dynamic-sessions');
            const dynamicProofTextEl = document.getElementById('dynamic-proof-text');
            const dynamicCardBadgeEl = document.getElementById('dynamic-card-badge');

            if (dynamicTitleEl) dynamicTitleEl.innerHTML = data.title;
            if (dynamicDescEl) dynamicDescEl.innerHTML = data.desc;
            if (dynamicBreadcrumbEl) dynamicBreadcrumbEl.innerHTML = data.breadcrumb;
            if (dynamicBadgeEl) dynamicBadgeEl.innerHTML = data.badge;
            if (dynamicProjectsCountEl) dynamicProjectsCountEl.innerHTML = data.projectsCount;
            if (dynamicOriginalPriceEl) dynamicOriginalPriceEl.innerHTML = data.originalPrice;
            if (dynamicDiscountEl) dynamicDiscountEl.innerHTML = data.discount;
            if (dynamicPriceEl) dynamicPriceEl.innerHTML = data.price;
            if (dynamicDurationEl) dynamicDurationEl.innerHTML = data.duration;
            if (dynamicSessionsEl) dynamicSessionsEl.innerHTML = data.sessions;
            if (dynamicProofTextEl) dynamicProofTextEl.innerHTML = data.proofText;
            if (dynamicCardBadgeEl) dynamicCardBadgeEl.innerHTML = data.cardBadge;

            // Update document title dynamically
            document.title = `${data.title} - MONIX Software Solutions`;

            // Set dynamic background image for services section pages and domains
            const detailsHeroEl = document.querySelector('.details-hero');
            if (detailsHeroEl) {
                const isServicePage = document.body.classList.contains('service-details-page') || window.location.pathname.includes('service-details');
                const heroBg = isServicePage ? 'assets/services_hero_bg.webp' : (data.image || 'assets/services_hero_bg.webp');
                detailsHeroEl.style.backgroundImage = `linear-gradient(135deg, rgba(8, 12, 22, 0.82) 0%, rgba(15, 23, 42, 0.90) 100%), url('${heroBg}')`;
            }

            // Map syllabus array into lists
            if (dynamicSyllabusListEl && data.syllabus) {
                dynamicSyllabusListEl.innerHTML = '';
                data.syllabus.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'syllabus-item';
                    li.innerHTML = `
                        <svg class="syllabus-check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>${item}</span>
                    `;
                    dynamicSyllabusListEl.appendChild(li);
                });
            }

            // Update any price buttons
            const dynamicPriceBtnEls = document.querySelectorAll('.dynamic-price-btn');
            dynamicPriceBtnEls.forEach(el => {
                el.innerHTML = data.price;
            });

            // Update the new dynamic elements in the sidebar and modal
            const dynamicPriceStatEl = document.getElementById('dynamic-price-stat');
            const dynamicPriceTextEl = document.getElementById('dynamic-price-text');
            if (dynamicPriceStatEl) dynamicPriceStatEl.innerHTML = `${data.price} Only`;
            if (dynamicPriceTextEl) dynamicPriceTextEl.innerHTML = `Fill out the form below to secure your slot at ${data.price}.`;
        }
    }

    // ==========================================================================
    // 3 & 4. Enquiry Modal Logic & CAPTCHA
    // ==========================================================================
    const modalOverlay = document.getElementById('enquiry-modal');
    const enrollBtns = document.querySelectorAll('.btn-enroll, .open-enquiry-modal');
    const closeBtn = document.querySelector('.modal-close');
    const sourceInput = document.getElementById('sourceClick');

    let modalCaptchaVal = generateCaptchaCode(5);
    const modalCaptchaCodeEl = document.getElementById('modal-captcha-code');
    const modalCaptchaRefreshBtn = document.getElementById('modal-captcha-refresh');
    const modalCaptchaInput = document.getElementById('modal-captcha-input');
    const modalCaptchaError = document.getElementById('modal-captcha-error');

    if (modalCaptchaCodeEl) {
        modalCaptchaCodeEl.innerText = modalCaptchaVal;
    }
    if (modalCaptchaRefreshBtn) {
        modalCaptchaRefreshBtn.addEventListener('click', () => {
            modalCaptchaVal = generateCaptchaCode(5);
            if (modalCaptchaCodeEl) modalCaptchaCodeEl.innerText = modalCaptchaVal;
            if (modalCaptchaInput) modalCaptchaInput.value = '';
            if (modalCaptchaError) modalCaptchaError.style.display = 'none';
        });
    }

    // Helper to determine if current page is for Internship or Service
    function isInternshipPage() {
        return window.location.pathname.includes('internship') || 
               document.title.toLowerCase().includes('internship') || 
               (document.getElementById('dynamic-title')?.innerText || '').toLowerCase().includes('internship');
    }

    // ==========================================================
    // SECURE SERVER-SIDE SUBMISSION ENGAGEMENT ENGINE (NO LOGIN REQUIRED)
    // ==========================================================

    if (modalOverlay) {
        // Open Modal
        enrollBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalOverlay.classList.add('active');
                document.body.classList.add('modal-open');
                document.documentElement.classList.add('modal-open');
                
                // Track source: check button data attribute first, then dynamic title, then document title fallback
                const btnSource = btn.getAttribute('data-source') || btn.getAttribute('data-program');
                const dynamicTitle = document.getElementById('dynamic-title');
                const programName = btnSource ? btnSource : (dynamicTitle ? dynamicTitle.innerText.trim() : document.title.replace(' - MONIX', '').trim());
                if (sourceInput) {
                    sourceInput.value = programName;
                }

                // Pre-fill the Selected Program readonly field
                const programInput = document.getElementById('modal-program');
                if (programInput) {
                    programInput.value = programName;
                }

                // Dynamic field configuration
                const dynamicGroup = document.getElementById('modal-dynamic-field-group');
                const dynamicLabel = document.getElementById('modal-dynamic-label');
                const dynamicVal = document.getElementById('modal-dynamic-val');

                if (dynamicGroup) {
                    if (isInternshipPage()) {
                        dynamicGroup.style.display = 'block';
                        dynamicGroup.classList.remove('hidden-field');
                        if (dynamicLabel) dynamicLabel.innerText = "Internship Duration";
                        if (dynamicVal) {
                            dynamicVal.required = true;
                        }
                    } else {
                        // For Services and Projects: remove / hide budget and timeline fields entirely
                        dynamicGroup.style.display = 'none';
                        dynamicGroup.classList.add('hidden-field');
                        if (dynamicVal) {
                            dynamicVal.required = false;
                        }
                    }
                }
                // Refresh modal CAPTCHA code when modal opens
                modalCaptchaVal = generateCaptchaCode(5);
                if (modalCaptchaCodeEl) modalCaptchaCodeEl.innerText = modalCaptchaVal;
                if (modalCaptchaInput) modalCaptchaInput.value = '';
                if (modalCaptchaError) modalCaptchaError.style.display = 'none';
            });
        });

        // Close Modal
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
            document.documentElement.classList.remove('modal-open');
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        
        // Close on outside click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        const modalForm = document.getElementById('enquiry-form-inner');
        const modalLoader = document.getElementById('modal-loader');
        const modalSuccess = document.getElementById('modal-success');

        // Modal Form Submit Lifecycle
        if (modalForm) {
            modalForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // CAPTCHA verification
                if (modalCaptchaInput) {
                    if (modalCaptchaInput.value.trim() !== modalCaptchaVal) {
                        if (modalCaptchaError) modalCaptchaError.style.display = 'block';
                        modalCaptchaInput.focus();
                        return;
                    } else {
                        if (modalCaptchaError) modalCaptchaError.style.display = 'none';
                    }
                }

                // Hide form, show loader
                modalForm.style.display = 'none';
                if (modalLoader) modalLoader.style.display = 'block';

                // Gather values
                const nameVal = document.getElementById('modal-name')?.value || '';
                const phoneVal = document.getElementById('modal-phone')?.value || '';
                const emailVal = document.getElementById('modal-email')?.value || '';
                const sourceVal = document.getElementById('sourceClick')?.value || document.title;
                const programVal = document.getElementById('modal-program')?.value || sourceVal;

                const isIntern = isInternshipPage();
                const dynamicVal = isIntern ? (document.getElementById('modal-dynamic-val')?.value || '1 Month') : '';
                const dynamicLabel = isIntern ? "Internship Duration" : "";

                try {
                    // Submit securely to server API endpoint
                    const response = await fetch('/api/enroll', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: nameVal,
                            phone: phoneVal,
                            email: emailVal,
                            program: programVal,
                            dynamicLabel: dynamicLabel,
                            dynamicVal: dynamicVal,
                            source: sourceVal,
                            url: window.location.href
                        })
                    });

                    const result = await response.json();

                    if (modalLoader) modalLoader.style.display = 'none';

                    if (result.success || response.ok) {
                        if (modalSuccess) modalSuccess.style.display = 'block';
                    } else {
                        throw new Error(result.error || 'Submission failed');
                    }
                } catch (err) {
                    console.error('Submission failed:', err);
                    if (modalLoader) modalLoader.style.display = 'none';
                    if (modalForm) modalForm.style.display = '';
                    alert('Network error. Your enquiry was received via backup channel. Please try again or contact us directly.');
                }
            });
        }
    }

    // ==========================================================================
    // DUAL CHAT SYSTEM: MONIX AI CHATBOT (LEFT) & WHATSAPP DIRECT CHAT (RIGHT)
    // ==========================================================================
    
    // 1. Inject HTML Structures for both Chatbot (Left) and WhatsApp Direct Chat (Right)
    const dualChatHTML = `
        <!-- LEFT SIDE: MONIX AI CHATBOT (BLACK & GOLD GRADIENT THEME) -->
        <div class="monix-ai-float-container" id="monix-ai-container">
            <div class="monix-ai-badge" id="monix-ai-badge">1</div>
            
            <div class="monix-ai-tooltip active" id="monix-ai-tooltip">
                <span>⚡ Chat with MONIX AI (Online)</span>
                <button class="monix-ai-tooltip-close" id="monix-ai-tooltip-close" aria-label="Close tooltip">&times;</button>
            </div>
            
            <button class="monix-ai-btn" id="monix-ai-toggle-btn" aria-label="Open MONIX AI Chat">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M12 2v2"></path>
                    <path d="M12 4a5 5 0 0 1 5 5v2H7V9a5 5 0 0 1 5-5z"></path>
                    <circle cx="8.5" cy="15.5" r="1.5" fill="#d4af37"></circle>
                    <circle cx="15.5" cy="15.5" r="1.5" fill="#d4af37"></circle>
                    <path d="M9 19c1 1 5 1 6 0"></path>
                </svg>
            </button>
            
            <div class="monix-ai-chat-window" id="monix-ai-chat-window">
                <div class="monix-ai-chat-header">
                    <div class="monix-ai-header-left">
                        <div class="monix-ai-avatar">
                            <img src="assets/monix-logo.webp" alt="MONIX AI" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">
                            <span class="monix-ai-status-indicator"></span>
                        </div>
                        <div class="monix-ai-profile-info">
                            <span class="monix-ai-profile-name">MONIX AI Assistant</span>
                            <span class="monix-ai-profile-status" id="monix-ai-substatus">Online • Smart Neural Engine</span>
                        </div>
                    </div>
                    <button class="monix-ai-close-btn" id="monix-ai-close-btn" aria-label="Close chat">&times;</button>
                </div>
                
                <div class="monix-ai-chat-body" id="monix-ai-chat-body">
                    <div class="monix-ai-encryption-note">
                        ✨ Powered by MONIX Core AI • Smart, instant & attractive responses
                    </div>
                    <div class="monix-ai-day-separator">TODAY</div>
                </div>
                
                <div class="monix-ai-chat-footer">
                    <div class="monix-ai-input-wrap">
                        <input type="text" class="monix-ai-input-field" id="monix-ai-input" placeholder="Ask MONIX AI about web dev, AI agents, quote..." autocomplete="off">
                    </div>
                    <button class="monix-ai-send-btn" id="monix-ai-send-btn" aria-label="Send message">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- RIGHT SIDE: WHATSAPP DIRECT CHAT (WHATSAPP GREEN THEME) -->
        <div class="whatsapp-direct-container" id="whatsapp-direct-container">
            <div class="whatsapp-direct-tooltip active" id="whatsapp-direct-tooltip">
                <span>💬 WhatsApp Direct Support</span>
                <button class="whatsapp-tooltip-close" id="whatsapp-direct-tooltip-close" aria-label="Close tooltip">&times;</button>
            </div>

            <button class="whatsapp-fixed-btn" id="whatsapp-direct-toggle-btn" aria-label="Open WhatsApp Direct Chat">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.81 0c3.14.001 6.094 1.221 8.317 3.441A11.662 11.662 0 0 1 23.56 11.89c-.004 6.475-5.33 11.799-11.813 11.799-2.001-.001-3.966-.51-5.7-1.484L0 24zm6.59-4.846c1.785 1.059 3.555 1.611 5.215 1.612 5.227 0 9.479-4.221 9.482-9.407a9.387 9.387 0 0 0-2.738-6.697 9.432 9.432 0 0 0-6.744-2.784c-5.23 0-9.482 4.222-9.485 9.408-.001 1.77.493 3.5 1.43 5.009L2.593 21.4l5.054-1.246zm12.516-7.62c-.104-.173-.385-.278-.802-.486-.417-.209-2.464-1.214-2.839-1.352-.375-.139-.646-.209-.917.209-.271.417-1.042 1.352-1.278 1.629-.236.278-.472.313-.889.104-.417-.209-1.761-.649-3.355-2.068-1.24-1.104-2.077-2.468-2.32-2.885-.243-.417-.026-.642.181-.849.187-.186.417-.486.625-.729.209-.243.278-.417.417-.695.139-.278.07-.521-.035-.73-.104-.208-.917-2.209-1.257-3.029-.33-.794-.666-.686-.917-.698l-.782-.015c-.271 0-.712.102-1.083.506-.371.403-1.417 1.385-1.417 3.376 0 1.99 1.45 3.916 1.65 4.183.201.267 2.854 4.343 6.914 6.093.966.417 1.719.666 2.307.852.971.309 1.855.265 2.553.161.778-.115 2.464-1.007 2.812-1.98.347-.972.347-1.806.243-1.98z"/>
                </svg>
            </button>

            <div class="whatsapp-chat-window" id="whatsapp-direct-chat-window">
                <div class="whatsapp-chat-header">
                    <div class="whatsapp-header-left">
                        <div class="whatsapp-avatar-container">
                            <img src="assets/monix-logo.webp" alt="MONIX softwaresolutions" class="whatsapp-avatar">
                            <span class="whatsapp-status-indicator"></span>
                        </div>
                        <div class="whatsapp-profile-info">
                            <span class="whatsapp-profile-name">MONIX softwaresolutions</span>
                            <span class="whatsapp-profile-status">online</span>
                        </div>
                    </div>
                    <div class="whatsapp-header-actions">
                        <button class="whatsapp-action-icon close-chat-btn" id="whatsapp-direct-close-btn" aria-label="Close chat">&times;</button>
                    </div>
                </div>

                <div class="whatsapp-chat-body" id="whatsapp-direct-chat-body">
                    <div class="whatsapp-encryption-note">
                        🔒 Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
                    </div>
                    <div class="whatsapp-day-separator">TODAY</div>
                    <div class="whatsapp-msg incoming">
                        <div>Hello! 👋 Welcome to <strong>MONIX softwaresolutions</strong>.</div>
                        <div class="whatsapp-msg-meta">
                            <span>Just now</span>
                        </div>
                    </div>
                </div>

                <div class="whatsapp-chat-footer">
                    <div class="whatsapp-input-wrap">
                        <input type="text" class="whatsapp-input-field" id="whatsapp-direct-input" placeholder="Type a message..." autocomplete="off">
                    </div>
                    <button class="whatsapp-footer-right-btn" id="whatsapp-direct-send-btn" aria-label="Send via WhatsApp" style="background:#00a884; color:white;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    if (!document.getElementById('monix-ai-container')) {
        document.body.insertAdjacentHTML('beforeend', dualChatHTML);
    }

    // Scroll Progress Bar
    const progressHTML = `
        <div id="scroll-progress-container" style="position: fixed; top: 0; right: 4px; width: 5px; height: 100vh; background: rgba(255, 255, 255, 0.1); border-radius: 10px; z-index: 100005; pointer-events: none; opacity: 0; transform: translateX(10px); transition: opacity 0.3s ease, transform 0.3s ease;">
            <div id="scroll-progress-bar" style="width: 100%; height: 0%; background: #DF9825; border-radius: 10px; transition: none;"></div>
        </div>
    `;
    if (!document.getElementById('scroll-progress-container')) {
        document.body.insertAdjacentHTML('beforeend', progressHTML);
    }

    const progressBar = document.getElementById('scroll-progress-bar');
    const progressContainer = document.getElementById('scroll-progress-container');
    let isProgressTicking = false;

    let cachedMaxScroll = 1;
    const cacheMaxScroll = () => {
        cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    cacheMaxScroll();
    window.addEventListener('resize', cacheMaxScroll, { passive: true });

    if (progressBar) {
        progressBar.style.height = '100%';
        progressBar.style.transformOrigin = 'top center';
        progressBar.style.transform = 'scaleY(0)';
    }

    let isProgressVisible = null;
    const updateScrollProgress = () => {
        if (window.innerWidth <= 768) return;
        const winScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const progressRatio = Math.min(1, Math.max(0, winScroll / cachedMaxScroll));
        if (progressBar) {
            progressBar.style.transform = `scaleY(${progressRatio.toFixed(4)})`;
        }
        if (progressContainer) {
            const shouldShow = winScroll > 80;
            if (shouldShow !== isProgressVisible) {
                isProgressVisible = shouldShow;
                progressContainer.style.opacity = shouldShow ? '1' : '0';
                progressContainer.style.transform = shouldShow ? 'translateX(0)' : 'translateX(10px)';
            }
        }
    };
    window.updateScrollProgressFn = updateScrollProgress;

    // ==========================================================================
    // 1. MONIX AI CHATBOT LOGIC (LEFT SIDE - BLACK & GOLD)
    // ==========================================================================
    const monixAiToggleBtn = document.getElementById('monix-ai-toggle-btn');
    const monixAiChatWindow = document.getElementById('monix-ai-chat-window');
    const monixAiCloseBtn = document.getElementById('monix-ai-close-btn');
    const monixAiBadge = document.getElementById('monix-ai-badge');
    const monixAiTooltip = document.getElementById('monix-ai-tooltip');
    const monixAiTooltipClose = document.getElementById('monix-ai-tooltip-close');
    const monixAiInput = document.getElementById('monix-ai-input');
    const monixAiSendBtn = document.getElementById('monix-ai-send-btn');
    const monixAiChatBody = document.getElementById('monix-ai-chat-body');
    const monixAiSubstatus = document.getElementById('monix-ai-substatus');

    let initialAIGreeted = false;

    if (monixAiTooltipClose) {
        monixAiTooltipClose.addEventListener('click', (e) => {
            e.stopPropagation();
            monixAiTooltip.classList.remove('active');
        });
    }

    setTimeout(() => {
        if (monixAiTooltip) monixAiTooltip.classList.remove('active');
    }, 10000);

    const toggleAIChat = () => {
        if (!monixAiChatWindow) return;
        const willBeActive = !monixAiChatWindow.classList.contains('active');
        if (willBeActive && whatsappDirectChatWindow && whatsappDirectChatWindow.classList.contains('active')) {
            whatsappDirectChatWindow.classList.remove('active');
        }

        monixAiChatWindow.classList.toggle('active');
        if (monixAiBadge) monixAiBadge.style.display = 'none';
        if (monixAiTooltip) monixAiTooltip.classList.remove('active');

        if (willBeActive) {
            setTimeout(() => {
                if (monixAiChatBody) monixAiChatBody.scrollTop = monixAiChatBody.scrollHeight;
            }, 100);

            if (!initialAIGreeted) {
                triggerAIGreet();
            }
        }
    };

    if (monixAiToggleBtn) monixAiToggleBtn.addEventListener('click', toggleAIChat);
    if (monixAiCloseBtn) monixAiCloseBtn.addEventListener('click', toggleAIChat);

    const monixChatbotNavBtn = document.getElementById('monix-chatbot-btn');
    if (monixChatbotNavBtn) {
        monixChatbotNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAIChat();
        });
    }

    // AI Knowledge Base with High-Converting, Smart Formatting
    const aiKnowledgeBank = {
        web: {
            match: ["web", "website", "dev", "design", "ui", "ux", "figma", "e-commerce", "ecommerce", "app", "custom"],
            response: "MONIX crafts world-class, high-conversion <strong>Web Development & Digital Ecosystems</strong>:<br><br>✨ <strong>Sleek Corporate Portfolios & Landing Pages</strong> - Conversion optimized with 99+ PageSpeed.<br>🛒 <strong>E-commerce & Multi-Vendor Marketplaces</strong> - Seamless payment gateways (Stripe, Razorpay, PayPal) + Inventory AI.<br>⚡ <strong>Full-Stack SaaS & Web Applications</strong> - Custom React, Next.js, Node.js & Python architectures.<br>🎨 <strong>Figma to Pixel-Perfect Code</strong> - Fully responsive across mobile & ultra-wide screens.<br><br>Ready to elevate your brand? Click <strong>Get a Quote 💰</strong> below or email directly at <strong>contact@monixsoftware.com</strong>!",
            chips: ["Get a Quote 💰", "AI Automation 🤖", "AI Internships 🎓"]
        },
        ai: {
            match: ["ai", "automation", "agent", "agents", "llm", "gpt", "rag", "bot", "chat", "generative", "python", "workflow"],
            response: "Supercharge your business productivity with custom <strong>Generative AI & Agent Automations</strong>:<br><br>🤖 <strong>Autonomous AI Agent Systems</strong> (CrewAI, LangGraph) to automate operations.<br>🔍 <strong>Enterprise RAG Knowledge Engines</strong> - Query internal PDFs, SQL DBs, or docs securely.<br>🧠 <strong>Fine-tuned LLMs & Smart Prompts</strong> - Integrated with Gemini, GPT-4o, and open-source models.<br>🔗 <strong>Seamless API Integrations & Webhooks</strong> - Connecting legacy CRMs, ERPs, and cloud apps.<br><br>Save hundreds of manual hours every week! Select an option below to discuss your project.",
            chips: ["Web Development 🌐", "Get a Quote 💰", "Direct Contact ✉️"]
        },
        internships: {
            match: ["internship", "intern", "internships", "training", "course", "syllabus", "learn", "student", "certificate"],
            response: "Build live projects & launch your career with <strong>MONIX's Elite 15-Day AI Remote Internships</strong>:<br><br>1. <strong>Computer Science & Engineering (CSE)</strong><br>2. <strong>AI & Data Science</strong><br>3. <strong>AI & Machine Learning (AI & ML)</strong><br>4. <strong>Next-Gen Cybersecurity & Ethical Hacking</strong><br>5. <strong>AI-Powered Full-Stack Web Development</strong><br>6. <strong>AI-Assisted Mobile Architecture</strong><br>7. <strong>Generative UI/UX & Product Design</strong><br>8. <strong>Next-Gen Prompt Engineering & LLMs</strong><br><br>🏆 <strong>Key Benefits:</strong> Verified Industry Certificate, Resume Optimization, Real GitHub Repositories, and Lifetime Alumni Network! Type <strong>syllabus</strong> or click below.",
            chips: ["AI Internships 🎓", "Direct Contact ✉️", "Go to Menu ↩️"]
        },
        quote: {
            match: ["quote", "price", "cost", "budget", "pricing", "hire", "service", "estimate"],
            response: "Let's turn your vision into production reality! Here is how to get a customized roadmap & cost quote:<br><br>1️⃣ <strong>Instant Quote Form:</strong> Submit your project details in the form on our homepage.<br>2️⃣ <strong>Email Us:</strong> Send requirements to <strong>contact@monixsoftware.com</strong>.<br><br>We deliver a comprehensive estimation report in under 2 hours!",
            chips: ["Direct Contact ✉️", "Web Development 🌐", "AI Automation 🤖"]
        },
        contact: {
            match: ["contact", "staff", "phone", "email", "founder", "monish", "number", "location"],
            response: "Connect directly with MONIX leadership & core engineers:<br><br>✉️ <strong>Official Email:</strong> contact@monixsoftware.com<br>⏱️ <strong>SLA Response:</strong> &lt; 2 Hours Turnaround<br>🔗 <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/monish-srm' target='_blank'>linkedin.com/in/monish-srm</a><br><br>We are available for immediate consultation, project review, or live virtual demos!",
            chips: ["Go to Menu ↩️", "Get a Quote 💰"]
        },
        options: {
            match: ["options", "help", "menu", "hi", "hello", "hey", "start"],
            response: "Welcome! Here are the core services MONIX provides:<br><br>🌐 <strong>Web Development & Design</strong><br>🤖 <strong>Generative AI & Autonomous Agents</strong><br>🎓 <strong>Professional Live AI Internships</strong><br>💰 <strong>Custom Project Quotes</strong><br>✉️ <strong>Direct Executive Contact</strong><br><br>Click any option button below or type your question directly!",
            chips: ["Web Development 🌐", "AI Automation 🤖", "AI Internships 🎓", "Get a Quote 💰", "Direct Contact ✉️"]
        }
    };

    const aiFallback = {
        response: "I am MONIX AI, ready to help you with software development, AI automations, and internships!<br><br>✉️ <strong>Email:</strong> contact@monixsoftware.com<br>⏱️ <strong>SLA:</strong> Under 2 Hours Response<br><br>Choose an option below or type <strong>menu</strong> to see our full service directory!",
        chips: ["Go to Menu ↩️", "Direct Contact ✉️", "Get a Quote 💰"]
    };

    const appendAIBubble = (text, sender = 'incoming', chips = []) => {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const bubble = document.createElement('div');
        bubble.className = `whatsapp-msg ${sender}`;

        // Auto parse markdown bold **text** to <strong>text</strong>
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        bubble.innerHTML = `
            <div>${formattedText}</div>
            <div class="whatsapp-msg-meta"><span>${timeStr}</span></div>
        `;

        if (sender === 'incoming' && chips && chips.length > 0) {
            const container = document.createElement('div');
            container.className = 'whatsapp-quick-reply-container';
            chips.forEach(chipText => {
                const btn = document.createElement('button');
                btn.className = 'whatsapp-quick-reply-btn';
                btn.innerHTML = chipText;
                btn.addEventListener('click', () => handleAISend(chipText));
                container.appendChild(btn);
            });
            bubble.appendChild(container);
        }

        monixAiChatBody.appendChild(bubble);
        monixAiChatBody.scrollTop = monixAiChatBody.scrollHeight;
    };

    const setAITyping = (isTyping) => {
        if (isTyping) {
            monixAiSubstatus.innerText = "typing...";
        } else {
            monixAiSubstatus.innerText = "Online • Smart Neural Engine";
        }
    };

    const triggerAIGreet = () => {
        initialAIGreeted = true;
        setAITyping(true);
        setTimeout(() => {
            setAITyping(false);
            appendAIBubble(
                "Welcome to <strong>MONIX AI</strong>! 👋<br><br>How can our AI engine assist you today? We specialize in high-performance web development, AI workflow automations, and live remote internships.<br><br>Select an option below to explore!",
                'incoming',
                ["Web Development 🌐", "AI Automation 🤖", "AI Internships 🎓", "Get a Quote 💰"]
            );
        }, 1000);
    };

    const parseAndReplyAI = (query) => {
        const lower = query.toLowerCase();
        let matched = null;
        for (const [key, details] of Object.entries(aiKnowledgeBank)) {
            if (details.match.some(kw => lower.includes(kw))) {
                matched = key;
                break;
            }
        }

        setAITyping(true);
        setTimeout(() => {
            setAITyping(false);
            if (matched) {
                const info = aiKnowledgeBank[matched];
                appendAIBubble(info.response, 'incoming', info.chips);
            } else {
                appendAIBubble(aiFallback.response, 'incoming', aiFallback.chips);
            }
        }, 900);
    };

    const handleAISend = (textInput = '') => {
        const text = textInput || monixAiInput.value.trim();
        if (!text) return;

        if (!textInput) monixAiInput.value = '';

        appendAIBubble(text, 'outgoing');
        parseAndReplyAI(text);
    };

    if (monixAiSendBtn) {
        monixAiSendBtn.addEventListener('click', () => handleAISend());
    }

    if (monixAiInput) {
        monixAiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleAISend();
        });
    }

    // ==========================================================================
    // 2. WHATSAPP DIRECT CHAT LOGIC (RIGHT SIDE - DIRECT WHATSAPP NUMBER)
    // ==========================================================================
    const whatsappDirectToggleBtn = document.getElementById('whatsapp-direct-toggle-btn');
    const whatsappDirectChatWindow = document.getElementById('whatsapp-direct-chat-window');
    const whatsappDirectCloseBtn = document.getElementById('whatsapp-direct-close-btn');
    const whatsappDirectTooltip = document.getElementById('whatsapp-direct-tooltip');
    const whatsappDirectTooltipClose = document.getElementById('whatsapp-direct-tooltip-close');
    const whatsappDirectInput = document.getElementById('whatsapp-direct-input');
    const whatsappDirectSendBtn = document.getElementById('whatsapp-direct-send-btn');
    const whatsappDirectChatBody = document.getElementById('whatsapp-direct-chat-body');

    if (whatsappDirectTooltipClose) {
        whatsappDirectTooltipClose.addEventListener('click', (e) => {
            e.stopPropagation();
            whatsappDirectTooltip.classList.remove('active');
        });
    }

    setTimeout(() => {
        if (whatsappDirectTooltip) whatsappDirectTooltip.classList.remove('active');
    }, 10000);

    const toggleWhatsAppDirect = () => {
        if (!whatsappDirectChatWindow) return;
        const willBeActive = !whatsappDirectChatWindow.classList.contains('active');
        if (willBeActive && monixAiChatWindow && monixAiChatWindow.classList.contains('active')) {
            monixAiChatWindow.classList.remove('active');
        }

        whatsappDirectChatWindow.classList.toggle('active');
        if (whatsappDirectTooltip) whatsappDirectTooltip.classList.remove('active');

        if (willBeActive) {
            setTimeout(() => {
                if (whatsappDirectChatBody) whatsappDirectChatBody.scrollTop = whatsappDirectChatBody.scrollHeight;
            }, 100);
        }
    };

    if (whatsappDirectToggleBtn) whatsappDirectToggleBtn.addEventListener('click', toggleWhatsAppDirect);
    if (whatsappDirectCloseBtn) whatsappDirectCloseBtn.addEventListener('click', toggleWhatsAppDirect);

    const handleWhatsAppDirectSend = () => {
        if (!whatsappDirectInput) return;
        const text = whatsappDirectInput.value.trim();
        const msgText = text || "Hi MONIX! I'm interested in discussing a project with you.";
        const mailtoUrl = `mailto:contact@monixsoftware.com?subject=${encodeURIComponent("MONIX Project Discussion")}&body=${encodeURIComponent(msgText)}`;

        // Append user message bubble locally
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userBubble = document.createElement('div');
        userBubble.className = 'whatsapp-msg outgoing';
        userBubble.style.background = '#d9fdd3';
        userBubble.style.color = '#111b21';
        userBubble.innerHTML = `
            <div>${msgText}</div>
            <div class="whatsapp-msg-meta" style="color:#667781;"><span>${timeStr}</span></div>
        `;
        if (whatsappDirectChatBody) {
            whatsappDirectChatBody.appendChild(userBubble);
        }

        // System notification bubble with direct link
        const sysBubble = document.createElement('div');
        sysBubble.className = 'whatsapp-msg incoming';
        sysBubble.style.background = '#ffffff';
        sysBubble.style.color = '#111b21';
        sysBubble.innerHTML = `
            <div>🚀 Dispatching your scope to <b>contact@monixsoftware.com</b>...<br><br><a href="${mailtoUrl}" target="_blank" rel="noopener noreferrer" style="color:#0284c7; font-weight:700; text-decoration:underline;">Click here to send email directly</a></div>
            <div class="whatsapp-msg-meta" style="color:#667781;"><span>Just now</span></div>
        `;
        if (whatsappDirectChatBody) {
            whatsappDirectChatBody.appendChild(sysBubble);
            whatsappDirectChatBody.scrollTop = whatsappDirectChatBody.scrollHeight;
        }

        whatsappDirectInput.value = '';

        // Open email client safely
        try {
            window.location.href = mailtoUrl;
        } catch (e) {
            // fallback
        }
    };

    if (whatsappDirectSendBtn) {
        whatsappDirectSendBtn.addEventListener('click', handleWhatsAppDirectSend);
    }

    if (whatsappDirectInput) {
        whatsappDirectInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleWhatsAppDirectSend();
        });
    }

    // 7. Services Horizontal Continuous Auto-Slider Controller
    const servicesTrack = document.getElementById('services-track');
    const servicesPrevBtn = document.getElementById('services-prev');
    const servicesNextBtn = document.getElementById('services-next');
    const servicesDotsContainer = document.getElementById('services-dots');

    if (servicesTrack) {
        const originalCards = Array.from(servicesTrack.querySelectorAll('.service-slide-card'));
        const originalCount = originalCards.length;

        if (originalCount > 0) {
            // Clone cards for seamless infinite marquee loop
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                servicesTrack.appendChild(clone);
            });

            // Render indicator dots corresponding to original cards
            if (servicesDotsContainer) {
                servicesDotsContainer.innerHTML = '';
                originalCards.forEach((_, idx) => {
                    const dot = document.createElement('button');
                    dot.className = `services-dot ${idx === 0 ? 'active' : ''}`;
                    dot.setAttribute('aria-label', `Go to service slide ${idx + 1}`);
                    dot.addEventListener('click', () => {
                        pauseAutoSlide(3500);
                        const cardWidth = originalCards[0].offsetWidth + 24;
                        const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                        servicesTrack.scrollTo({ left: idx * cardWidth, behavior: isMobile ? 'auto' : 'smooth' });
                    });
                    servicesDotsContainer.appendChild(dot);
                });
            }

            let isPaused = false;
            let pauseTimer = null;
            let autoMoveAnimId = null;
            let isTrackInView = true;
            const autoSpeed = 1; // pixels per frame

            let cachedCardWidth = (originalCards[0].offsetWidth || 300) + 24;
            let cachedSingleSetWidth = cachedCardWidth * originalCount;
            let cachedDots = servicesDotsContainer ? Array.from(servicesDotsContainer.querySelectorAll('.services-dot')) : [];
            let lastActiveIndex = -1;

            const updateDimensions = () => {
                if (originalCards[0]) {
                    cachedCardWidth = (originalCards[0].offsetWidth || 300) + 24;
                    cachedSingleSetWidth = cachedCardWidth * originalCount;
                }
            };
            window.addEventListener('resize', updateDimensions, { passive: true });

            const pauseAutoSlide = (duration = 2500) => {
                isPaused = true;
                if (pauseTimer) clearTimeout(pauseTimer);
                pauseTimer = setTimeout(() => {
                    isPaused = false;
                }, duration);
            };

            const updateDots = () => {
                if (!cachedDots.length || !cachedCardWidth) return;
                const normalizedScroll = servicesTrack.scrollLeft % cachedSingleSetWidth;
                const activeIndex = Math.floor(normalizedScroll / cachedCardWidth) % originalCount;
                if (activeIndex !== lastActiveIndex) {
                    cachedDots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === activeIndex);
                    });
                    lastActiveIndex = activeIndex;
                }
            };

            const isMobileView = () => window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

            const autoStep = () => {
                if (isMobileView()) {
                    if (autoMoveAnimId) {
                        cancelAnimationFrame(autoMoveAnimId);
                        autoMoveAnimId = null;
                    }
                    return;
                }
                if (!isPaused && isTrackInView && !document.hidden && !window.isMainPageScrolling) {
                    servicesTrack.scrollLeft += autoSpeed;

                    if (servicesTrack.scrollLeft >= cachedSingleSetWidth) {
                        servicesTrack.scrollLeft -= cachedSingleSetWidth;
                    }

                    updateDots();
                }
                if (isTrackInView) {
                    autoMoveAnimId = requestAnimationFrame(autoStep);
                }
            };

            // IntersectionObserver to only animate when in view
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        isTrackInView = entry.isIntersecting;
                        if (isTrackInView) {
                            if (!autoMoveAnimId) autoMoveAnimId = requestAnimationFrame(autoStep);
                        } else {
                            if (autoMoveAnimId) {
                                cancelAnimationFrame(autoMoveAnimId);
                                autoMoveAnimId = null;
                            }
                        }
                    });
                }, { threshold: 0.05 });
                observer.observe(servicesTrack);
            } else {
                autoMoveAnimId = requestAnimationFrame(autoStep);
            }

            // Pause on hover / touch
            servicesTrack.addEventListener('mouseenter', () => { isPaused = true; }, { passive: true });
            servicesTrack.addEventListener('mouseleave', () => { isPaused = false; }, { passive: true });
            servicesTrack.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
            servicesTrack.addEventListener('touchend', () => { pauseAutoSlide(2000); }, { passive: true });

            // Next & Prev Manual Controls
            if (servicesPrevBtn) {
                servicesPrevBtn.addEventListener('click', () => {
                    pauseAutoSlide(3500);
                    if (servicesTrack.scrollLeft <= 10) {
                        servicesTrack.scrollLeft += cachedSingleSetWidth;
                    }
                    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                    servicesTrack.scrollBy({ left: -cachedCardWidth, behavior: isMobile ? 'auto' : 'smooth' });
                });
            }

            if (servicesNextBtn) {
                servicesNextBtn.addEventListener('click', () => {
                    pauseAutoSlide(3500);
                    if (servicesTrack.scrollLeft >= cachedSingleSetWidth * 1.8) {
                        servicesTrack.scrollLeft -= cachedSingleSetWidth;
                    }
                    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                    servicesTrack.scrollBy({ left: cachedCardWidth, behavior: isMobile ? 'auto' : 'smooth' });
                });
            }
        }
    }

    // 8. Academic & Enterprise Project Domains Carousel & Navigation Controller
    const solutionsGrid = document.getElementById('solutions-grid');
    const solutionsPrevBtn = document.getElementById('solutions-prev');
    const solutionsNextBtn = document.getElementById('solutions-next');
    const solutionsCounter = document.getElementById('solutions-counter');
    const solutionsDotsContainer = document.getElementById('solutions-dots');

    if (solutionsGrid) {
        const solutionCards = Array.from(solutionsGrid.querySelectorAll('.solution-card'));
        const totalCards = solutionCards.length;
        let cardWidth = (solutionCards[0]?.offsetWidth || 320) + 12;
        let cachedDots = [];

        const updateCardWidth = () => {
            if (solutionCards[0]) cardWidth = (solutionCards[0].offsetWidth || 320) + 12;
        };
        window.addEventListener('resize', updateCardWidth, { passive: true });

        // Initialize Pagination Dots
        if (solutionsDotsContainer) {
            solutionsDotsContainer.innerHTML = '';
            solutionCards.forEach((_, idx) => {
                const dot = document.createElement('button');
                dot.className = `solutions-dot ${idx === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to domain ${idx + 1}`);
                dot.addEventListener('click', () => {
                    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                    solutionsGrid.scrollTo({ left: idx * cardWidth, behavior: isMobile ? 'auto' : 'smooth' });
                });
                solutionsDotsContainer.appendChild(dot);
            });
            cachedDots = Array.from(solutionsDotsContainer.querySelectorAll('.solutions-dot'));
        }

        let isTicking = false;
        let lastActiveIdx = -1;

        // Active Card & Counter Update Handler
        const updateActiveCard = () => {
            if (!solutionCards.length) return;
            const currentScroll = solutionsGrid.scrollLeft;
            let activeIdx = Math.round(currentScroll / cardWidth);
            activeIdx = Math.max(0, Math.min(activeIdx, totalCards - 1));

            if (activeIdx !== lastActiveIdx) {
                if (solutionsCounter) {
                    solutionsCounter.textContent = `${activeIdx + 1} / ${totalCards}`;
                }

                if (cachedDots.length) {
                    cachedDots.forEach((dot, idx) => {
                        dot.classList.toggle('active', idx === activeIdx);
                    });
                }
                lastActiveIdx = activeIdx;
            }
            isTicking = false;
        };

        // Listen for scroll & touch movements
        solutionsGrid.addEventListener('scroll', () => {
            if (!isTicking) {
                requestAnimationFrame(updateActiveCard);
                isTicking = true;
            }
        }, { passive: true });

        // Prev & Next Buttons
        if (solutionsPrevBtn) {
            solutionsPrevBtn.addEventListener('click', () => {
                const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                solutionsGrid.scrollBy({ left: -cardWidth, behavior: isMobile ? 'auto' : 'smooth' });
            });
        }

        if (solutionsNextBtn) {
            solutionsNextBtn.addEventListener('click', () => {
                const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                solutionsGrid.scrollBy({ left: cardWidth, behavior: isMobile ? 'auto' : 'smooth' });
            });
        }
    }

    // 9. Next-Gen AI Internships & Specialized Tracks Carousel Controllers
    function setupHorizontalGridSlider(gridId, prevId, nextId, counterId, dotsId, dotClass) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);
        const counter = document.getElementById(counterId);
        const dotsContainer = document.getElementById(dotsId);

        const cards = Array.from(grid.querySelectorAll('.internship-card, .solution-card'));
        const totalCards = cards.length;
        if (!totalCards) return;

        let cardWidth = (cards[0]?.offsetWidth || 320) + 12;
        let cachedDots = [];

        const updateWidth = () => {
            if (cards[0]) cardWidth = (cards[0].offsetWidth || 320) + 12;
        };
        window.addEventListener('resize', updateWidth, { passive: true });

        // Populate dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            cards.forEach((_, idx) => {
                const dot = document.createElement('button');
                dot.className = `${dotClass} ${idx === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
                dot.addEventListener('click', () => {
                    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                    grid.scrollTo({ left: idx * cardWidth, behavior: isMobile ? 'auto' : 'smooth' });
                });
                dotsContainer.appendChild(dot);
            });
            cachedDots = Array.from(dotsContainer.querySelectorAll(`.${dotClass}`));
        }

        let isTicking = false;
        let lastActiveIdx = -1;

        const updateActiveState = () => {
            let activeIdx = Math.round(grid.scrollLeft / cardWidth);
            activeIdx = Math.max(0, Math.min(activeIdx, totalCards - 1));

            if (activeIdx !== lastActiveIdx) {
                if (counter) {
                    counter.textContent = `${activeIdx + 1} / ${totalCards}`;
                }

                if (cachedDots.length) {
                    cachedDots.forEach((dot, idx) => {
                        dot.classList.toggle('active', idx === activeIdx);
                    });
                }
                lastActiveIdx = activeIdx;
            }
            isTicking = false;
        };

        grid.addEventListener('scroll', () => {
            if (!isTicking) {
                requestAnimationFrame(updateActiveState);
                isTicking = true;
            }
        }, { passive: true });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                grid.scrollBy({ left: -cardWidth, behavior: isMobile ? 'auto' : 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
                grid.scrollBy({ left: cardWidth, behavior: isMobile ? 'auto' : 'smooth' });
            });
        }
    }

    setupHorizontalGridSlider('internships-grid', 'internships-prev', 'internships-next', 'internships-counter', 'internships-dots', 'internships-dot');
    setupHorizontalGridSlider('specialized-internships-grid', 'specialized-prev', 'specialized-next', 'specialized-counter', 'specialized-dots', 'internships-dot');

    // 10. Interactive FAQ Accordion Controller
    const faqItems = document.querySelectorAll('.faq-accordion-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const btn = item.querySelector('.faq-question-btn');
            if (btn) {
                btn.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');
                    faqItems.forEach(i => i.classList.remove('active'));
                    if (!isOpen) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
});


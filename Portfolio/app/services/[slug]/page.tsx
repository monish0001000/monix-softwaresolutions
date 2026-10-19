import React from 'react';
import Link from 'next/link';

export default function ServicePage({ params }: { params: { slug: string } }) {
  // Mock data fetching based on slug
  const serviceName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const bookingMailto = `mailto:contact@monixsoftware.com?subject=${encodeURIComponent(`Enterprise Booking: ${serviceName}`)}&body=${encodeURIComponent(`Hello MONIX Engineering Team,\n\nI would like to book or discuss the ${serviceName} service for our organization.\n\nProject Overview:\n`)}`;

  const guarantees = [
    { title: 'Unlimited Concepts Free', icon: '💡' },
    { title: 'Satisfaction Guaranteed', icon: '⭐' },
    { title: 'Customized AI-Driven Design', icon: '🤖' },
    { title: 'Unlimited Revisions', icon: '🔄' },
    { title: 'Affordable & Realistic Pricing', icon: '💰' },
    { title: '100% Ownership Rights', icon: '🛡️' },
    { title: 'Source Files Provided', desc: '(High & Low Res, PNG, SVG)', icon: '📁' },
  ];

  // This could be dynamically fetched based on the service slug
  const subServices = [
    'Monogram', 'Mascot', 'Brand Marks', 'Abstract Marks', 'Combination Mark', 'Emblem Logo', 'Word Mark', 'Pictorial Mark'
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-70"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">{serviceName}</span> Company in India
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 font-medium">
            Create. Innovate. Interact. A super design is all it takes!
          </p>
          <Link href={bookingMailto} className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900">
            Book This Service 🚀
          </Link>
        </div>
      </section>

      {/* 2. Deep-Dive Description Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="prose prose-lg md:prose-xl mx-auto text-gray-600 leading-relaxed text-center">
            <p>
              <strong className="text-gray-900">{serviceName}</strong> is no longer just a visual, it is your identity. We at MONIX, the best digital architects, take care of your needs whether you are a start-up or an established enterprise.
            </p>
            <p className="mt-6">
              With our expert AI-driven developers and designers, we promise untiring efforts to leave your target clients mesmerized. We are not just a service provider, but a digital home for you.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 'Why Choose MONIX' Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Why Choose MONIX</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-yellow-400 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{guarantee.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{guarantee.title}</h3>
                {guarantee.desc && <p className="text-sm text-gray-500">{guarantee.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sub-Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">What We Offer in {serviceName}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {subServices.map((sub, index) => (
              <span key={index} className="px-6 py-3 bg-gray-50 text-gray-700 font-medium rounded-full border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-colors duration-300 cursor-default">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing for sticky bottom bar */}
      <div className="h-24"></div>

      {/* 5. Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 transition-all duration-500">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl">
          <p className="text-lg font-bold text-gray-900">Ready to elevate your brand?</p>
          <Link href={bookingMailto} className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-gray-900 transition-all duration-300 bg-yellow-400 rounded-full hover:bg-yellow-500 shadow-sm whitespace-nowrap">
            Email & Book Service
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { ContactTerminal } from '../ContactTerminal';
import { Language } from '../../types';

interface ContactPageProps {
  lang: Language;
}

/**
 * ContactPage: Consolidated to single source of truth (Executive Contact Terminal).
 * Eliminates redundant standalone forms, ensuring unified SLA & trust signals.
 */
export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-16 sm:pt-20 bg-[#07090E] min-h-screen">
      <ContactTerminal lang={lang} />
    </div>
  );
};

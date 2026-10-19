import React from 'react';
import { ContactTerminal } from './ContactTerminal';
import { Language } from '../types';

interface ContactSectionProps {
  lang?: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = (props) => {
  return <ContactTerminal {...props} />;
};

export { ContactTerminal };

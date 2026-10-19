import React from 'react';
import { Language } from '../types';
import { ExecutiveContactTerminal } from './ExecutiveContactTerminal';

interface CTASectionProps {
  lang: Language;
  onOpenInquiry?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ lang }) => {
  return <ExecutiveContactTerminal lang={lang} />;
};

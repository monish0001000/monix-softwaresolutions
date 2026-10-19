import React from 'react';
import { Language } from '../../types';
import { AboutUsDeepDive } from '../AboutUsDeepDive';

interface AboutPageProps {
  lang: Language;
  onOpenInquiry?: (inquiryType?: string) => void;
  onBackToHome?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  lang,
  onOpenInquiry,
  onBackToHome,
}) => {
  return (
    <AboutUsDeepDive
      lang={lang}
      onOpenInquiry={onOpenInquiry}
      onBackToHome={onBackToHome}
    />
  );
};

export default AboutPage;

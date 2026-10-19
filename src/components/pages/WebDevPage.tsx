import React from 'react';
import { Language } from '../../types';
import { SoftwareDeepDive } from '../SoftwareDeepDive';

interface WebDevPageProps {
  lang: Language;
  onOpenInquiryWithCategory: (category: string) => void;
  onSelectCategoryDetail?: (catTitle: string, serviceType: 'web') => void;
}

export const WebDevPage: React.FC<WebDevPageProps> = ({
  lang,
  onOpenInquiryWithCategory,
}) => {
  return (
    <SoftwareDeepDive
      lang={lang}
      onOpenInquiry={(solution) => onOpenInquiryWithCategory(solution)}
    />
  );
};

export default WebDevPage;

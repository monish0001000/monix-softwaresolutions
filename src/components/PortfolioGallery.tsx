import React from 'react';
import { ProjectShowcase } from './ProjectShowcase';
import { Language } from '../types';

interface PortfolioGalleryProps {
  lang?: Language;
  onOpenInquiry?: (service: string, category: string) => void;
  onSelectCategoryDetail?: (cat: string, serviceType: 'web' | 'mobile' | 'internship' | 'projects') => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = (props) => {
  return <ProjectShowcase {...props} />;
};

export { ProjectShowcase };

import React from 'react';
import { Language } from '../types';
import { ReviewsMarquee } from './ReviewsMarquee';

interface TestimonialsSectionProps {
  lang?: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang = 'en' }) => {
  return <ReviewsMarquee lang={lang} />;
};

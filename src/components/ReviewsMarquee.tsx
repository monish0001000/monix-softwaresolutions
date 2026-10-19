import React from 'react';
import { TestimonialsMarquee } from './TestimonialsMarquee';
import { Language } from '../types';

interface ReviewsMarqueeProps {
  lang?: Language;
}

export const ReviewsMarquee: React.FC<ReviewsMarqueeProps> = (props) => {
  return <TestimonialsMarquee {...props} />;
};

export { TestimonialsMarquee };

import React from 'react';
import { WhyChooseMonix } from './WhyChooseMonix';
import { Language } from '../types';

interface WhyChooseUsProps {
  lang?: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  return <WhyChooseMonix lang={lang} />;
};

export { WhyChooseMonix };

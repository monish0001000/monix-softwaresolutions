import React from 'react';
import { TrustMetricsGrid } from './TrustMetricsGrid';
import { Language } from '../types';

interface StatsSectionProps {
  lang: Language;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ lang }) => {
  return <TrustMetricsGrid lang={lang} />;
};

export { TrustMetricsGrid };

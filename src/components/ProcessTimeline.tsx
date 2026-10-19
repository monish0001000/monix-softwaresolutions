import React from 'react';
import { Language } from '../types';
import { EngineeringPipeline } from './ServicesSection';

interface ProcessTimelineProps {
  lang?: Language;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = () => {
  return <EngineeringPipeline />;
};

export { EngineeringPipeline };
export default ProcessTimeline;

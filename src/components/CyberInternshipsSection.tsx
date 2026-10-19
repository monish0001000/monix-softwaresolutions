import React from 'react';
import { InternshipsDeepDive, InternshipsDeepDiveProps } from './InternshipsDeepDive';

export interface CyberInternshipsSectionProps extends InternshipsDeepDiveProps {}

export const CyberInternshipsSection: React.FC<CyberInternshipsSectionProps> = (props) => {
  return <InternshipsDeepDive {...props} />;
};

export default CyberInternshipsSection;

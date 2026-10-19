import React from 'react';
import { ProjectDomains, ProjectDomainsProps } from './ProjectDomains';

export interface CyberDomainsSectionProps extends ProjectDomainsProps {}

export const CyberDomainsSection: React.FC<CyberDomainsSectionProps> = (props) => {
  return <ProjectDomains {...props} />;
};

export default CyberDomainsSection;

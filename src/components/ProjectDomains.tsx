import React from 'react';
import { ProjectDomainsDeepDive, ProjectDomainsProps } from './ProjectDomainsDeepDive';

export type { ProjectDomainsProps };

export const ProjectDomains: React.FC<ProjectDomainsProps> = (props) => {
  return <ProjectDomainsDeepDive {...props} />;
};

export default ProjectDomains;

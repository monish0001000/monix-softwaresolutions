import React from 'react';
import { ContactTerminal } from './ContactTerminal';
import { Language } from '../types';

interface ExecutiveContactTerminalProps {
  lang?: Language;
}

export const ExecutiveContactTerminal: React.FC<ExecutiveContactTerminalProps> = (props) => {
  return <ContactTerminal {...props} />;
};

export { ContactTerminal };

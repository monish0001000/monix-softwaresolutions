import React from 'react';
import { Language } from '../types';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  lang?: Language;
}

// Phone number removal: All inquiries rely on official email (contact@monixsoftware.com) and direct form dispatch.
export const WhatsAppButton: React.FC<WhatsAppButtonProps> = () => {
  return null;
};

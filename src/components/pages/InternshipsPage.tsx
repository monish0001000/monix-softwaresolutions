import React from 'react';
import { Language } from '../../types';
import { InternshipsDeepDive } from '../InternshipsDeepDive';

interface InternshipsPageProps {
  lang: Language;
  onOpenInquiryWithProgram: (program: string) => void;
  onSelectCategoryDetail: (catTitle: string, serviceType: 'internship') => void;
}

export const InternshipsPage: React.FC<InternshipsPageProps> = ({
  lang,
  onOpenInquiryWithProgram,
  onSelectCategoryDetail,
}) => {
  return (
    <div className="bg-[#07090E] text-slate-100 min-h-screen">
      <InternshipsDeepDive
        lang={lang}
        onOpenInquiryWithProgram={onOpenInquiryWithProgram}
        onSelectCategoryDetail={onSelectCategoryDetail}
      />
    </div>
  );
};

export default InternshipsPage;

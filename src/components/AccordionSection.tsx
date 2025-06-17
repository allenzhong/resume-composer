import type { ReactNode } from 'react';

interface AccordionSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  name: string;
}

const AccordionSection = ({ title, icon, children, defaultOpen = false, name }: AccordionSectionProps) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 shadow-lg">
      <input type="radio" name={name} defaultChecked={defaultOpen} /> 
      <div className="collapse-title text-xl font-medium">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          {title}
        </div>
      </div>
      <div className="collapse-content">
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionSection; 
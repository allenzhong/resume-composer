import StandardInput from '../../../components/StandardInput';
import type { ChangeEvent } from 'react';

interface PersonalInfoData {
  email: string;
  phone: string;
  website: string;
}

interface ContactInformationProps {
  formData: PersonalInfoData;
  onInputChange: (field: keyof PersonalInfoData, value: string) => void;
}

const ContactInformation = ({ formData, onInputChange }: ContactInformationProps) => {
  return (
    <div className="space-y-6">
      {/* Email and Phone Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <StandardInput
            type="email"
            name="email"
            label="Email Address *"
            autoComplete="section-personal-info email"
            data-1p-ignore
            inputMode="email"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('email', e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <StandardInput
            type="tel"
            name="phone"
            label="Phone Number"
            autoComplete="section-personal-info tel"
            data-1p-ignore
            inputMode="tel"
            value={formData.phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('phone', e.target.value)}
          />
        </div>
      </div>
      
      {/* Website Row */}
      <div className="form-control">
        <StandardInput
          type="url"
          name="website"
          label="Personal Website"
          autoComplete="section-personal-info url"
          data-1p-ignore
          inputMode="url"
          value={formData.website}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('website', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContactInformation; 
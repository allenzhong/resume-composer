import StandardInput from '../../../components/StandardInput';
import type { ChangeEvent } from 'react';

interface PersonalInfoData {
  github: string;
  linkedin: string;
  portfolio: string;
  twitter: string;
}

interface SocialMediaLinksProps {
  formData: PersonalInfoData;
  onInputChange: (field: keyof PersonalInfoData, value: string) => void;
}

const SocialMediaLinks = ({ formData, onInputChange }: SocialMediaLinksProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-control">
        <StandardInput
          type="url"
          name="github"
          label="GitHub"
          autoComplete="section-personal-info url"
          data-1p-ignore
          inputMode="url"
          value={formData.github}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('github', e.target.value)}
        />
      </div>
      <div className="form-control">
        <StandardInput
          type="url"
          name="linkedin"
          label="LinkedIn"
          autoComplete="section-personal-info url"
          data-1p-ignore
          inputMode="url"
          value={formData.linkedin}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('linkedin', e.target.value)}
        />
      </div>
      <div className="form-control">
        <StandardInput
          type="url"
          name="portfolio"
          label="Portfolio Website"
          autoComplete="section-personal-info url"
          data-1p-ignore
          inputMode="url"
          value={formData.portfolio}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('portfolio', e.target.value)}
        />
      </div>
      <div className="form-control">
        <StandardInput
          type="url"
          name="twitter"
          label="Twitter/X"
          autoComplete="section-personal-info url"
          data-1p-ignore
          inputMode="url"
          value={formData.twitter}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('twitter', e.target.value)}
        />
      </div>
    </div>
  );
};

export default SocialMediaLinks; 
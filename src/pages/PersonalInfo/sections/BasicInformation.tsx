import StandardInput from '../../../components/StandardInput';
import type { ChangeEvent } from 'react';

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  title: string;
  location: string;
}

interface BasicInformationProps {
  formData: PersonalInfoData;
  onInputChange: (field: keyof PersonalInfoData, value: string) => void;
}

const BasicInformation = ({ formData, onInputChange }: BasicInformationProps) => {
  return (
    <div className="space-y-6">
      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <StandardInput
            type="text"
            name="firstName"
            label="First Name *"
            autoComplete="section-personal-info given-name"
            data-1p-ignore
            inputMode="text"
            value={formData.firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('firstName', e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <StandardInput
            type="text"
            name="lastName"
            label="Last Name *"
            autoComplete="section-personal-info family-name"
            data-1p-ignore
            inputMode="text"
            value={formData.lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('lastName', e.target.value)}
            required
          />
        </div>
      </div>
      {/* Title and Location Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <StandardInput
            type="text"
            name="title"
            label="Professional Title"
            autoComplete="section-personal-info organization-title"
            data-1p-ignore
            inputMode="text"
            value={formData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('title', e.target.value)}
          />
        </div>
        <div className="form-control">
          <StandardInput
            type="text"
            name="location"
            label="Location"
            autoComplete="section-personal-info address-level2"
            data-1p-ignore
            inputMode="text"
            value={formData.location}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('location', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation; 
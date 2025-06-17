import StandardInput from '../../../components/StandardInput';
import type { ChangeEvent } from 'react';

interface PersonalInfoData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AddressProps {
  formData: PersonalInfoData;
  onInputChange: (field: keyof PersonalInfoData, value: string) => void;
}

const Address = ({ formData, onInputChange }: AddressProps) => {
  return (
    <div className="space-y-6">
      {/* Street Address */}
      <div className="form-control">
        <StandardInput
          type="text"
          name="address"
          label="Street Address"
          autoComplete="section-personal-info street-address"
          data-1p-ignore
          inputMode="text"
          value={formData.address}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('address', e.target.value)}
        />
      </div>
      
      {/* City, State, ZIP Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="form-control">
          <StandardInput
            type="text"
            name="city"
            label="City"
            autoComplete="section-personal-info address-level2"
            data-1p-ignore
            inputMode="text"
            value={formData.city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('city', e.target.value)}
          />
        </div>
        
        <div className="form-control">
          <StandardInput
            type="text"
            name="state"
            label="State/Province"
            autoComplete="section-personal-info address-level1"
            data-1p-ignore
            inputMode="text"
            value={formData.state}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('state', e.target.value)}
          />
        </div>
        
        <div className="form-control">
          <StandardInput
            type="text"
            name="zipCode"
            label="ZIP/Postal Code"
            autoComplete="section-personal-info postal-code"
            data-1p-ignore
            inputMode="text"
            value={formData.zipCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('zipCode', e.target.value)}
          />
        </div>
      </div>
      
      {/* Country */}
      <div className="form-control">
        <StandardInput
          type="text"
          name="country"
          label="Country"
          autoComplete="section-personal-info country"
          data-1p-ignore
          inputMode="text"
          value={formData.country}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('country', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Address; 
import { useState } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  Link as LinkIcon 
} from 'lucide-react';
import AccordionSection from '../../components/AccordionSection';
import BasicInformation from './sections/BasicInformation';
import ContactInformation from './sections/ContactInformation';
import Address from './sections/Address';
import PersonalStatement from './sections/PersonalStatement';
import SocialMediaLinks from './sections/SocialMediaLinks';

interface PersonalInfoData {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Personal Statement
  personalStatement: string;
  
  // Social Media Links
  github: string;
  linkedin: string;
  portfolio: string;
  twitter: string;
  
  // Additional Info
  title: string;
  location: string;
}

const PersonalInfo = () => {
  const [formData, setFormData] = useState<PersonalInfoData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    personalStatement: '',
    github: '',
    linkedin: '',
    portfolio: '',
    twitter: '',
    title: '',
    location: '',
  });

  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Personal Info Data:', formData);
    // TODO: Save to global state or localStorage
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Personal Information</h2>
        <p className="text-gray-600">Fill in your basic information and contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information Accordion */}
        <AccordionSection 
          title="Basic Information" 
          icon={<User className="w-5 h-5" />}
          defaultOpen={true}
          name="personal-info-accordion"
        >
          <BasicInformation 
            formData={formData}
            onInputChange={handleInputChange}
          />
        </AccordionSection>

        {/* Contact Information Accordion */}
        <AccordionSection 
          title="Contact Information" 
          icon={<Phone className="w-5 h-5" />}
          name="personal-info-accordion"
        >
          <ContactInformation 
            formData={formData}
            onInputChange={handleInputChange}
          />
        </AccordionSection>

        {/* Address Accordion */}
        <AccordionSection 
          title="Address" 
          icon={<MapPin className="w-5 h-5" />}
          name="personal-info-accordion"
        >
          <Address 
            formData={formData}
            onInputChange={handleInputChange}
          />
        </AccordionSection>

        {/* Personal Statement Accordion */}
        <AccordionSection 
          title="Personal Statement" 
          icon={<FileText className="w-5 h-5" />}
          name="personal-info-accordion"
        >
          <PersonalStatement 
            formData={formData}
            onInputChange={handleInputChange}
          />
        </AccordionSection>

        {/* Social Media Links Accordion */}
        <AccordionSection 
          title="Social Media & Portfolio Links" 
          icon={<LinkIcon className="w-5 h-5" />}
          name="personal-info-accordion"
        >
          <SocialMediaLinks 
            formData={formData}
            onInputChange={handleInputChange}
          />
        </AccordionSection>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button type="submit" className="btn btn-primary btn-lg">
            Save Personal Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo; 
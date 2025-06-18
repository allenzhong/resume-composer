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
import { useResume } from '../../hooks/useResume';
import type { PersonalInfoData } from '../../types/resume';

const PersonalInfo = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const formData = resumeData.personalInfo;

  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    updatePersonalInfo({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Personal Info Data:', formData);
    // Data is already saved in global state
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
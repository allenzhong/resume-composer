import StandardTextarea from '../../../components/StandardTextarea';
import type { ChangeEvent } from 'react';

interface PersonalInfoData {
  personalStatement: string;
}

interface PersonalStatementProps {
  formData: PersonalInfoData;
  onInputChange: (field: keyof PersonalInfoData, value: string) => void;
}

const MAX_LENGTH = 1000;

const PersonalStatement = ({ formData, onInputChange }: PersonalStatementProps) => {
  return (
    <StandardTextarea
      name="personalStatement"
      label="Professional Summary"
      helperText="Brief description of your professional background and goals."
      showCharCount
      maxLength={MAX_LENGTH}
      markdown
      autoComplete="off"
      value={formData.personalStatement}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onInputChange('personalStatement', e.target.value)}
    />
  );
};

export default PersonalStatement; 
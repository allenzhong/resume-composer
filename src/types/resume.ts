// Personal Information Types
export interface PersonalInfoData {
  // Basic Information
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  
  // Contact Information
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
}

// Experience Types
export interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

// Education Types
export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

// Skills Types
export interface Skill {
  id: string;
  name: string;
  proficiency: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

// Main Resume Type
export interface ResumeData {
  personalInfo: PersonalInfoData;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillCategory[];
} 
import AccordionSection from '../../components/AccordionSection';
import StandardInput from '../../components/StandardInput';
import StandardTextarea from '../../components/StandardTextarea';
import { Briefcase } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import type { ExperienceEntry } from '../../types/resume';

const emptyExperience = (): ExperienceEntry => ({
  id: Math.random().toString(36).slice(2),
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
});

const MAX_DESCRIPTION_LENGTH = 800;

const Experience = () => {
  const { resumeData, updateExperience } = useResume();
  const experiences = resumeData.experience.length > 0 ? resumeData.experience : [emptyExperience()];

  const handleChange = (id: string, field: keyof ExperienceEntry, value: string) => {
    const updatedExperiences = experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateExperience(updatedExperiences);
  };

  const addExperience = () => {
    updateExperience([...experiences, emptyExperience()]);
  };

  const removeExperience = (id: string) => {
    const updatedExperiences = experiences.length > 1 
      ? experiences.filter(exp => exp.id !== id) 
      : experiences;
    updateExperience(updatedExperiences);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your relevant work experience. You can add multiple jobs.</p>
      </div>
      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <AccordionSection
            key={exp.id}
            title={`Job #${idx + 1}`}
            icon={<Briefcase className="w-5 h-5" />}
            defaultOpen={idx === 0}
            name="experience-accordion"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <StandardInput
                    type="text"
                    name="jobTitle"
                    label="Job Title"
                    value={exp.jobTitle}
                    onChange={e => handleChange(exp.id, 'jobTitle', e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <StandardInput
                    type="text"
                    name="company"
                    label="Company"
                    value={exp.company}
                    onChange={e => handleChange(exp.id, 'company', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <StandardInput
                    type="text"
                    name="location"
                    label="Location"
                    value={exp.location}
                    onChange={e => handleChange(exp.id, 'location', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <StandardInput
                    type="month"
                    name="startDate"
                    label="Start Date"
                    value={exp.startDate}
                    onChange={e => handleChange(exp.id, 'startDate', e.target.value)}
                  />
                  <StandardInput
                    type="month"
                    name="endDate"
                    label="End Date"
                    value={exp.endDate}
                    onChange={e => handleChange(exp.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-control">
                <StandardTextarea
                  name="description"
                  label="Description / Responsibilities"
                  helperText="Describe your main responsibilities, achievements, and skills used."
                  showCharCount
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  markdown
                  value={exp.description}
                  onChange={e => handleChange(exp.id, 'description', e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                {experiences.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-error btn-outline btn-sm"
                    onClick={() => removeExperience(exp.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </AccordionSection>
        ))}
        <div className="flex justify-end pt-4">
          <button type="button" className="btn btn-primary btn-outline" onClick={addExperience}>
            + Add Another Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience; 
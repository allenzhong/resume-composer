import AccordionSection from '../../components/AccordionSection';
import StandardInput from '../../components/StandardInput';
import StandardTextarea from '../../components/StandardTextarea';
import { GraduationCap } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import type { EducationEntry } from '../../types/resume';

const emptyEducation = (): EducationEntry => ({
  id: Math.random().toString(36).slice(2),
  degree: '',
  institution: '',
  location: '',
  startDate: '',
  endDate: '',
  gpa: '',
  description: '',
});

const MAX_DESCRIPTION_LENGTH = 600;

const Education = () => {
  const { resumeData, updateEducation } = useResume();
  const educations = resumeData.education.length > 0 ? resumeData.education : [emptyEducation()];

  const handleChange = (id: string, field: keyof EducationEntry, value: string) => {
    const updatedEducations = educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateEducation(updatedEducations);
  };

  const addEducation = () => {
    updateEducation([...educations, emptyEducation()]);
  };

  const removeEducation = (id: string) => {
    const updatedEducations = educations.length > 1 
      ? educations.filter(edu => edu.id !== id) 
      : educations;
    updateEducation(updatedEducations);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Education</h2>
        <p className="text-gray-600">Add your educational background. You can add multiple degrees or certifications.</p>
      </div>
      <div className="space-y-4">
        {educations.map((edu, idx) => (
          <AccordionSection
            key={edu.id}
            title={`Education #${idx + 1}`}
            icon={<GraduationCap className="w-5 h-5" />}
            defaultOpen={idx === 0}
            name="education-accordion"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <StandardInput
                    type="text"
                    name="degree"
                    label="Degree / Certification"
                    value={edu.degree}
                    onChange={e => handleChange(edu.id, 'degree', e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <StandardInput
                    type="text"
                    name="institution"
                    label="Institution"
                    value={edu.institution}
                    onChange={e => handleChange(edu.id, 'institution', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-control">
                  <StandardInput
                    type="text"
                    name="location"
                    label="Location"
                    value={edu.location}
                    onChange={e => handleChange(edu.id, 'location', e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <StandardInput
                    type="month"
                    name="startDate"
                    label="Start Date"
                    value={edu.startDate}
                    onChange={e => handleChange(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <StandardInput
                    type="month"
                    name="endDate"
                    label="End Date"
                    value={edu.endDate}
                    onChange={e => handleChange(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-control">
                <StandardInput
                  type="text"
                  name="gpa"
                  label="GPA (Optional)"
                  placeholder="e.g., 3.8/4.0 or 4.2/5.0"
                  value={edu.gpa}
                  onChange={e => handleChange(edu.id, 'gpa', e.target.value)}
                />
              </div>
              <div className="form-control">
                <StandardTextarea
                  name="description"
                  label="Description / Achievements"
                  helperText="Describe relevant coursework, projects, honors, or achievements."
                  showCharCount
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  markdown
                  value={edu.description}
                  onChange={e => handleChange(edu.id, 'description', e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                {educations.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-error btn-outline btn-sm"
                    onClick={() => removeEducation(edu.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </AccordionSection>
        ))}
        <div className="flex justify-end pt-4">
          <button type="button" className="btn btn-primary btn-outline" onClick={addEducation}>
            + Add Another Education
          </button>
        </div>
      </div>
    </div>
  );
};

export default Education; 
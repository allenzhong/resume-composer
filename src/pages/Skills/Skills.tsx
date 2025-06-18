import AccordionSection from '../../components/AccordionSection';
import StandardInput from '../../components/StandardInput';
import StandardTextarea from '../../components/StandardTextarea';
import { Zap, Code, Users, Globe, Award } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import type { Skill, SkillCategory } from '../../types/resume';

const createEmptySkill = (): Skill => ({
  id: Math.random().toString(36).slice(2),
  name: '',
  proficiency: '',
  description: '',
});

const MAX_DESCRIPTION_LENGTH = 200;

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'technical': return <Code className="w-5 h-5" />;
    case 'soft': return <Users className="w-5 h-5" />;
    case 'languages': return <Globe className="w-5 h-5" />;
    case 'certifications': return <Award className="w-5 h-5" />;
    default: return <Zap className="w-5 h-5" />;
  }
};

const Skills = () => {
  const { resumeData, updateSkills } = useResume();
  
  // Initialize with default categories if none exist
  const skillCategories = resumeData.skills.length > 0 ? resumeData.skills : [
    {
      id: 'technical',
      name: 'Technical Skills',
      skills: [createEmptySkill()]
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      skills: [createEmptySkill()]
    },
    {
      id: 'languages',
      name: 'Languages',
      skills: [createEmptySkill()]
    },
    {
      id: 'certifications',
      name: 'Certifications',
      skills: [createEmptySkill()]
    }
  ];

  const handleSkillChange = (categoryId: string, skillId: string, field: keyof Skill, value: string) => {
    const updatedCategories = skillCategories.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            skills: category.skills.map(skill => 
              skill.id === skillId ? { ...skill, [field]: value } : skill
            )
          }
        : category
    );
    updateSkills(updatedCategories);
  };

  const addSkill = (categoryId: string) => {
    const updatedCategories = skillCategories.map(category => 
      category.id === categoryId 
        ? { ...category, skills: [...category.skills, createEmptySkill()] }
        : category
    );
    updateSkills(updatedCategories);
  };

  const removeSkill = (categoryId: string, skillId: string) => {
    const updatedCategories = skillCategories.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            skills: category.skills.length > 1 
              ? category.skills.filter(skill => skill.id !== skillId)
              : category.skills
          }
        : category
    );
    updateSkills(updatedCategories);
  };

  const addCategory = () => {
    const newCategory: SkillCategory = {
      id: Math.random().toString(36).slice(2),
      name: 'Custom Category',
      skills: [createEmptySkill()]
    };
    updateSkills([...skillCategories, newCategory]);
  };

  const removeCategory = (categoryId: string) => {
    const updatedCategories = skillCategories.length > 1 
      ? skillCategories.filter(cat => cat.id !== categoryId) 
      : skillCategories;
    updateSkills(updatedCategories);
  };

  const updateCategoryName = (categoryId: string, name: string) => {
    const updatedCategories = skillCategories.map(category => 
      category.id === categoryId ? { ...category, name } : category
    );
    updateSkills(updatedCategories);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Skills & Certifications</h2>
        <p className="text-gray-600">Add your skills, languages, and certifications. Organize them by categories.</p>
      </div>
      
      <div className="space-y-4">
        {skillCategories.map((category) => (
          <AccordionSection
            key={category.id}
            title={category.name}
            icon={getCategoryIcon(category.id)}
            defaultOpen={category.id === 'technical'}
            name="skills-accordion"
          >
            <div className="space-y-6">
              {/* Category Name Editor */}
              <div className="form-control">
                <StandardInput
                  type="text"
                  name={`category-${category.id}`}
                  label="Category Name"
                  value={category.name}
                  onChange={e => updateCategoryName(category.id, e.target.value)}
                />
              </div>

              {/* Skills in this category */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="card bg-base-200/50 p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StandardInput
                          type="text"
                          name={`skill-name-${skill.id}`}
                          label="Skill Name"
                          value={skill.name}
                          onChange={e => handleSkillChange(category.id, skill.id, 'name', e.target.value)}
                          required
                        />
                        <StandardInput
                          type="text"
                          name={`skill-proficiency-${skill.id}`}
                          label="Proficiency Level"
                          placeholder="e.g., Expert, Advanced, Intermediate, Beginner"
                          value={skill.proficiency}
                          onChange={e => handleSkillChange(category.id, skill.id, 'proficiency', e.target.value)}
                        />
                      </div>
                      <StandardTextarea
                        name={`skill-description-${skill.id}`}
                        label="Description (Optional)"
                        helperText="Add details about your experience with this skill."
                        showCharCount
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        markdown
                        value={skill.description}
                        onChange={e => handleSkillChange(category.id, skill.id, 'description', e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        {category.skills.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-error btn-outline btn-sm"
                            onClick={() => removeSkill(category.id, skill.id)}
                          >
                            Remove Skill
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn btn-secondary btn-outline btn-sm"
                    onClick={() => addSkill(category.id)}
                  >
                    + Add Skill
                  </button>
                </div>
              </div>

              {/* Remove Category Button */}
              {skillCategories.length > 1 && (
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    className="btn btn-error btn-outline btn-sm"
                    onClick={() => removeCategory(category.id)}
                  >
                    Remove Category
                  </button>
                </div>
              )}
            </div>
          </AccordionSection>
        ))}
        
        <div className="flex justify-end pt-4">
          <button type="button" className="btn btn-primary btn-outline" onClick={addCategory}>
            + Add Custom Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills; 
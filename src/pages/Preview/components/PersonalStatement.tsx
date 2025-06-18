import React from 'react';

interface PersonalStatementProps {
  personalStatement: string;
  renderMarkdown: (text: string) => string;
}

const PersonalStatement: React.FC<PersonalStatementProps> = ({ personalStatement, renderMarkdown }) => {
  if (!personalStatement) return null;
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
        Professional Summary
      </h2>
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(personalStatement) }}
      />
    </div>
  );
};

export default PersonalStatement; 
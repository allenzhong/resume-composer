import type { TextareaHTMLAttributes } from 'react';
import { useId } from 'react';

interface StandardTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
  markdown?: boolean;
}

const textareaClass = "textarea textarea-bordered w-full peer border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y min-h-[8rem]";
const labelClass = "absolute left-3 -top-2.5 z-10 pointer-events-none bg-base-100 px-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary";

const StandardTextarea = ({ label, helperText, showCharCount, maxLength, markdown = false, value, ...props }: StandardTextareaProps) => {
  const id = useId();
  const val = typeof value === 'string' ? value : '';
  
  const markdownHelperText = markdown ? "Supports markdown: **bold**, *italic*, - lists, [links](url)" : "";
  const combinedHelperText = helperText ? (markdownHelperText ? `${helperText} • ${markdownHelperText}` : helperText) : markdownHelperText;
  
  return (
    <div className="relative">
      <textarea
        {...props}
        id={id}
        className={textareaClass}
        placeholder={label}
        maxLength={maxLength}
        value={val}
      />
      <label htmlFor={id} className={labelClass}>{label}</label>
      {(combinedHelperText || showCharCount) && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{combinedHelperText}</span>
          {showCharCount && maxLength && (
            <span className="ml-auto">{val.length}/{maxLength}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StandardTextarea; 
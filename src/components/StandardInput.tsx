import type { InputHTMLAttributes } from 'react';

interface StandardInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
}

const inputClass = "input input-bordered w-full peer border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
const labelClass = "absolute left-3 -top-2.5 z-10 pointer-events-none bg-base-100 px-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary";

const StandardInput = ({ label, ...props }: StandardInputProps) => {
  return (
    <div className="relative">
      <input
        {...props}
        className={inputClass}
        placeholder={label}
      />
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default StandardInput; 
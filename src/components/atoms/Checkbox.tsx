import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = ({ label, className = "", ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className={`w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary ${className}`}
        {...props}
      />
      {label && (
        <label className="text-sm font-Pretendard text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;


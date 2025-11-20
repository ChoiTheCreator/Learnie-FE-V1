import { InputHTMLAttributes, ReactNode } from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: ReactNode;
}

const FormField = ({
  label,
  error,
  required = false,
  helperText,
  id,
  ...inputProps
}: FormFieldProps) => {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <Input
        id={fieldId}
        error={!!error}
        required={required}
        aria-required={required}
        {...inputProps}
      />
      {error && (
        <span className="text-sm text-red-600 font-Pretendard" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="text-sm text-gray-500 font-Pretendard">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default FormField;


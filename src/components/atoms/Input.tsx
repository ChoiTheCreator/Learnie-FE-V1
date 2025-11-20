import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = ({ className = "", error = false, ...props }: InputProps) => {
  const baseStyles = "px-5 py-4 rounded-lg bg-white border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed font-Pretendard";
  const errorStyles = error ? "border-red-300 focus:ring-red-500" : "border-gray-300";

  return (
    <input
      className={`${baseStyles} ${errorStyles} ${className}`}
      {...props}
    />
  );
};

export default Input;


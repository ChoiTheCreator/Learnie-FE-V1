interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "gray" | "white";
}

const Spinner = ({ size = "md", color = "primary" }: SpinnerProps) => {
  const sizeStyles = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const colorStyles = {
    primary: "border-primary border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
    white: "border-white border-t-transparent",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 ${sizeStyles[size]} ${colorStyles[color]}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;


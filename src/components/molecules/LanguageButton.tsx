interface LanguageButtonProps {
  code: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const LanguageButton = ({
  code,
  label,
  isActive,
  onClick,
}: LanguageButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
        isActive
          ? "bg-primary text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
};

export default LanguageButton;


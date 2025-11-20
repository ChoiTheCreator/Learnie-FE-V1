interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded border text-base font-Pretendard transition-colors ${
        isActive
          ? "border-primary text-primary bg-primary/5"
          : "border-gray-300 text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;


interface ExerciseChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const ExerciseChip = ({ label, isSelected, onClick }: ExerciseChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-semibold mr-1 mb-1 transition-colors border border-whiteT-40 bg-transparent
        ${
          isSelected
            ? 'border-primary-100 text-primary-100'
            : ' text-whiteT-40 hover:border-primary-100 hover:text-primary-100'
        }`}
    >
      # {label}
    </button>
  );
};

export default ExerciseChip;

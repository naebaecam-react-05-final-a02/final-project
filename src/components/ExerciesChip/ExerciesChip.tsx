interface ExerciseChipProps {
  label: string;
  isSelected: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ExerciseChip = ({ label, isSelected, onClick }: ExerciseChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-3 py-2 rounded-lg text-xs border bg-transparent leading-none 
        ${
          isSelected
            ? 'border-primary-100 text-primary-100'
            : ' text-whiteT-40 border-whiteT-40 hover:border-primary-100 hover:text-primary-100'
        }`}
    >
      # {label}
    </button>
  );
};

export default ExerciseChip;

import { cva } from 'class-variance-authority';

interface ButtonProps {
  label: string;
  value: string;
  category: string;
  onClick: (value: string) => void;
}

const categoryButtonVariants = cva('text-sm w-11 h-7  border rounded-lg', {
  variants: {
    isSelected: {
      true: 'border-primary-100 text-primary-100',
      false: 'border-white/50 text-white/50',
    },
  },
});

const CategoryButton = ({ label, value, category, onClick }: ButtonProps) => {
  const isSelected = value === category;

  return (
    <button onClick={() => onClick(value)} className={categoryButtonVariants({ isSelected })}>
      {label}
    </button>
  );
};

export default CategoryButton;

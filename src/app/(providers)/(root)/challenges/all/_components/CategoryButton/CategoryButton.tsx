import { ChallengeCategoryTypes } from '@/types/challenge';
import { cva } from 'class-variance-authority';
import { CategoryTypes } from '../../_constants/constants';

interface ButtonProps {
  label: string;
  value: CategoryTypes;
  categories: ChallengeCategoryTypes[];
  onClick: (value: CategoryTypes) => void;
}

const categoryButtonVariants = cva('text-sm w-11 h-7  border rounded-lg', {
  variants: {
    isSelected: {
      true: 'border-primary-100 text-primary-100',
      false: 'border-white/50 text-white/50',
    },
  },
});

const CategoryButton = ({ label, value, categories, onClick }: ButtonProps) => {
  const isSelected = !!categories.find((item) => item === value);

  return (
    <button onClick={() => onClick(value)} className={categoryButtonVariants({ isSelected })}>
      {label}
    </button>
  );
};

export default CategoryButton;

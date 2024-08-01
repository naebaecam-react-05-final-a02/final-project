import { cva } from 'class-variance-authority';

interface ButtonProps {
  label: string;
  value: string;
  category: string;
  onClick: (value: string) => void;
}

const categoryButtonVariants = cva('text-sm px-3 py-1.5 rounded-full', {
  variants: {
    isSelected: {
      true: 'bg-gray-800 text-white font-normal',
      false: 'bg-white text-black font-semibold',
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

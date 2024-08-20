import { FILTER_LIST } from '@/constants/challenges';

interface ButtonProps {
  label: string;
}

const CategoryLabel = ({ label }: ButtonProps) => {
  const filterItem = FILTER_LIST.find((item) => item.value === label);

  return (
    <div
      className={
        'text-sm px-2 h-7  border rounded-lg border-primary-100 text-primary-100 flex justify-center items-center'
      }
    >
      {filterItem?.label}
    </div>
  );
};

export default CategoryLabel;

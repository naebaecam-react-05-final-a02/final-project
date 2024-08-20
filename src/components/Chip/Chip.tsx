import { FoodType } from '@/types/diet';
import { ComponentProps } from 'react';
import CloseIcon from '/public/icons/x.svg';

interface ChipProps {
  food: FoodType;
  isActive?: boolean;
  handleDelete?: () => void;
}

const Chip = ({ food, isActive, handleDelete, onClick }: ChipProps & ComponentProps<'button'>) => {
  return (
    <button
      className={`flex gap-2 items-center flex-none p-1 pr-3 bg-white bg-opacity-10 rounded-full border ${
        isActive ? 'border-primary-100' : 'border-transparent'
      }`}
      onClick={onClick}
    >
      <div className="p-2 text-2xl leading-none">{food.foodType}</div>
      <div className="flex flex-col justify-center items-start">
        <span className="text-sm whitespace-nowrap pr-1">{food.foodName || '-'}</span>
        <span className="text-[10px] opacity-30 whitespace-nowrap leading-none">{food.kcal || 0} Kcal</span>
      </div>
      {handleDelete && (
        <CloseIcon
          width={20}
          height={20}
          stroke="#ffffff80"
          strokeWidth={1.5}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        />
      )}
    </button>
  );
};

export default Chip;

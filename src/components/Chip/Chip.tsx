import { FoodType } from '@/types/diet';
import Image from 'next/image';
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
      className={`flex gap-3 items-center flex-none p-1 pr-3 bg-white bg-opacity-10 rounded-full border ${
        isActive ? 'border-[#12F287]' : 'border-transparent'
      }`}
      onClick={onClick}
    >
      <div className="p-2">
        <Image width={24} height={24} className="max-w-fit" src={`/foods/${food.foodType}.png`} alt={food.foodType} />
      </div>
      <div className="flex flex-col justify-center items-start">
        <span className="text-sm whitespace-nowrap leading-tight pr-1">{food.foodName || '-'}</span>
        <span className="text-[10px] opacity-30 whitespace-nowrap leading-tight">{food.kcal || 0} Kcal</span>
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

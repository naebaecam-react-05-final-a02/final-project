import Card from '@/components/Card';
import Chip from '@/components/Chip';
import { DietsLogType } from '@/types/diet';
import { getDietsCalories, getFoods } from '@/utils/calculateDiet';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';

const DietsLog = ({ diets }: { diets: DietsLogType }) => {
  const calories = getDietsCalories(diets);
  const foods = getFoods(diets);

  return (
    <Card className="bg-white size-full relative px-[-20px] text-sm flex flex-col items-center select-none">
      <div className="relative flex text-white items-center justify-between w-full">
        <div className="text-xs flex items-center gap-x-2">
          <div className="text-base cursor-pointer">
            <IoMdArrowDropleft />
          </div>
          <div className="cursor-pointer">7/25</div>
          <div className="text-base cursor-pointer">
            <IoMdArrowDropright />
          </div>
        </div>

        <div className="absolute opacity-50 text-base left-1/2 transform -translate-x-1/2">식단</div>

        <div className="cursor-pointer text-xl">
          <IoCreateOutline />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center h-[44px] relative">
          <div className="border-l-4 border-[#03C717]/80 w-1/2 absolute top-0 -left-4 bottom-0 right-0 bg-gradient-to-r from-[#12f287]/10  to-white/0" />
          <p className="font-bold text-sm text-[#12F287]">칼로리</p>
          <div className="flex gap-x-1 items-end">
            <p className="text-white font-bold text-lg">{calories.kcal.toLocaleString()}</p>
            <p className="text-white/30 text-[12px]">Kcal</p>
          </div>
        </div>

        <div className="flex justify-between  items-center h-[44px]">
          <p className="font-bold text-sm text-white/30">탄수화물</p>
          <div className="flex gap-x-1 items-center">
            <p className="text-white font-bold text-lg">{calories.carbohydrate}</p>
            <p className="text-white/30 text-[12px]">g</p>
          </div>
        </div>

        <div className="flex justify-between  items-center h-[44px]">
          <p className="font-bold text-sm text-white/30">단백질</p>
          <div className="flex gap-x-1 items-center">
            <p className="text-white font-bold text-lg">{calories.protein}</p>
            <p className="text-white/30 text-[12px]">g</p>
          </div>
        </div>

        <div className="flex justify-between  items-center h-[44px] ">
          <p className="font-bold text-sm text-white/30">지방</p>
          <div className="flex gap-x-1 items-center">
            <p className="text-white font-bold text-lg">{calories.fat}</p>
            <p className="text-white/30 text-[12px]">g</p>
          </div>
        </div>
      </div>
      {foods.length > 0 && (
        <div className="w-full py-4 flex gap-x-4 overflow-x-scroll border-t border-white/10">
          {foods.map((food) => (
            <Chip key={food.id} food={food} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default DietsLog;

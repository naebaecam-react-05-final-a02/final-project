import Card from '@/components/Card';
import { DietsLogType } from '@/types/diet';
import { getDietsCalories } from '@/utils/calculateDiet';

const DietsLog = ({ diets }: { diets: DietsLogType }) => {
  const calories = getDietsCalories(diets);

  return (
    <Card className="bg-white size-full relative p-2 box-border divide-y-[1px] divide-gray-300 text-sm flex flex-col items-center">
      <h5 className="w-full text-base text-center font-bold pb-2">오늘의 칼로리</h5>
      <div className="w-full flex flex-col flex-1 h-full divide-y-[1px] divide-gray-300">
        <div className="flex  justify-between px-2 items-end">
          <p className="font-bold text-base">Calories</p>
          <div className="flex gap-x-px items-end">
            <p className="font-bold text-base">{calories.kcal.toLocaleString()}</p>
            <p className="text-gray-500 text-[11px]">Kcal</p>
          </div>
        </div>
        <div className="divide-y-[1px] divide-gray-300">
          <div className="flex justify-around w-full divide-x-[1px] divide-gray-300  font-bold p-2">
            <div className="w-full flex-1 flex justify-center items-center">탄수화물</div>
            <div className="w-full flex-1 flex justify-center items-center">단백질</div>
            <div className="w-full flex-1 flex justify-center items-center">지방</div>
          </div>
          <div className="flex justify-around w-full divide-x-[1px] divide-gray-300  p-2">
            <div className="w-full flex-1 flex justify-center items-center">{calories.carbohydrate}g</div>
            <div className="w-full flex-1 flex justify-center items-center">{calories.protein}g</div>
            <div className="w-full flex-1 flex justify-center items-center">{calories.fat}g</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DietsLog;

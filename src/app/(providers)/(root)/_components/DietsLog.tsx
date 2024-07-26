import { DietsLogType } from '@/types/diet';

const DietsLog = ({ diets }: { diets: DietsLogType }) => {
  const totalNutrients = diets.reduce(
    (total, diet) => {
      diet.foodInfo.forEach((food) => {
        total.kcal += Number(food?.kcal || 0);
        total.carbohydrate += Number(food?.carbohydrate || 0);
        total.protein += Number(food?.protein || 0);
        total.fat += Number(food?.fat || 0);
      });
      return total;
    },
    { kcal: 0, carbohydrate: 0, protein: 0, fat: 0 },
  );

  return (
    <div className="bg-white size-full relative p-2 box-border divide-y-[1px] divide-gray-300 text-sm">
      <h5 className="text-base text-center font-bold pb-2">오늘의 칼로리</h5>
      <div className="flex flex-col flex-1 h-full divide-y-[1px] divide-gray-300">
        <div className="flex  justify-between px-2 items-end">
          <p className="font-bold text-base">Calories</p>
          <div className="flex gap-x-px items-end">
            <p className="font-bold text-base">{totalNutrients.kcal.toLocaleString()}</p>
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
            <div className="w-full flex-1 flex justify-center items-center">{totalNutrients.carbohydrate}g</div>
            <div className="w-full flex-1 flex justify-center items-center">{totalNutrients.protein}g</div>
            <div className="w-full flex-1 flex justify-center items-center">{totalNutrients.fat}g</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietsLog;

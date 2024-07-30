import Chip from '@/components/Chip';
import { dietCode } from '@/data/dietTypeCode';
import { useGetDiets } from '@/hooks/diet/useDiets';
import { getDietsCalories, getFoodsCalories } from '@/utils/calculateDiet';
import { useRouter } from 'next/navigation';
import EditIcon from '/public/icons/edit.svg';

interface DietListProps {
  date: string;
}

const DietList = ({ date }: DietListProps) => {
  const router = useRouter();

  const { data: diets, isPending, isError } = useGetDiets(date);

  if (isPending) return <div className="text-center">데이터를 불러오고 있습니다...</div>;
  if (isError) return <div className="text-center">데이터를 불러오는 도중 에러가 발생했습니다!</div>;

  const totalCalories = getDietsCalories(diets);
  const calories = diets.map((diet) => getFoodsCalories(diet.foods));

  return (
    <>
      {diets?.length === 0 ? (
        <div className="flex flex-col items-center gap-1">
          <span>식단 기록이 없습니다</span>
          <button className="text-sm" onClick={() => router.push('/diets/write')}>
            추가하러 가기
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col p-4 bg-[#FFFFFF0D] border border-[#FFFFFF33] shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)] rounded-[20px]">
            <div className="text-lg font-semibold border-b border-[#FFFFFF1A] pb-4 mb-4">
              <span className="mr-[2px]">{totalCalories.kcal}</span>
              <span>kcal</span>
            </div>
            <div className="grid grid-cols-3 justify-items-center">
              <div className="flex flex-col items-center text-sm">
                <span className="text-[#FFFFFF80] py-2 font-semibold">탄수화물</span>
                <span className="py-2 font-medium">{totalCalories.carbohydrate}g</span>
              </div>
              <div className="flex flex-col items-center text-sm">
                <span className="text-[#FFFFFF80] py-2 font-semibold">단백질</span>
                <span className="py-2 font-medium">{totalCalories.protein}g</span>
              </div>
              <div className="flex flex-col items-center text-sm">
                <span className="text-[#FFFFFF80] py-2 font-semibold">지방</span>
                <span className="py-2 font-medium">{totalCalories.fat}g</span>
              </div>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {diets?.map((diet, idx) => (
              <li
                key={`diet-${diet.id}`}
                className="flex flex-col gap-1 bg-[#FFFFFF0D] border border-[#FFFFFF33] shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)] rounded-[20px]"
              >
                <div className="flex justify-between px-4 py-[14px]">
                  <div className="w-5"></div>
                  <h3 className="text-center text-[17px] font-bold text-[#FFFFFF80] font-semibold">
                    {dietCode[diet.dietType]}
                  </h3>
                  <button>
                    <EditIcon />
                  </button>
                </div>
                <div className="flex justify-between items-center text-sm h-11 p-3 border-l-[3px] border-[#03C717] bg-gradient-to-r from-[rgba(18,242,135,0.10)] to-transparent to-[47.31%]">
                  <span className="text-[#12F287]">칼로리</span>
                  <span>{calories[idx].kcal}kcal</span>
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex justify-between p-3 text-sm font-medium">
                    <span className="text-[#FFFFFF80]">탄수화물</span>
                    <span>
                      {calories[idx].carbohydrate}
                      <span className="text-xs text-[#FFFFFF4D]">g</span>
                    </span>
                  </div>
                  <div className="flex justify-between p-3 text-sm font-medium">
                    <span className="text-[#FFFFFF80]">단백질</span>
                    <span>
                      {calories[idx].protein}
                      <span className="text-xs text-[#FFFFFF4D]">g</span>
                    </span>
                  </div>
                  <div className="flex justify-between p-3 text-sm font-medium">
                    <span className="text-[#FFFFFF80]">지방</span>
                    <span>
                      {calories[idx].fat}
                      <span className="text-xs text-[#FFFFFF4D]">g</span>
                    </span>
                  </div>
                </div>
                <div className="bg-[#FFFFFF1A] w-[calc(full-16px)] h-[1px] mx-4"></div>
                <div className="chips flex gap-3 overflow-x-scroll scale p-3">
                  {diet.foods.map((food) => (
                    <Chip key={food.id} food={food} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default DietList;

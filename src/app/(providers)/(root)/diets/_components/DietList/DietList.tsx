import { DietTableType } from '@/types/diet';
import Image from 'next/image';

interface DietListProps {
  diets: DietTableType[];
}

const DietList = ({ diets }: DietListProps) => {
  const breakfasts: DietListProps[] = [];
  const lunchs: DietListProps[] = [];
  const dinners: DietListProps[] = [];

  console.log(diets);
  // ! 아침 점심 저녁 순으로 구분 필요
  return (
    <div className="flex flex-col gap-2">
      {diets.map((diet) => (
        <div key={`diet-${diet.id}`} className="flex flex-col gap-1">
          <div className="text-center text-xl font-bold">{diet.dietType}</div>
          <div className="grid grid-cols-3">
            {diet.images?.map((image, idx) => (
              <div key={`${diet.id}-${idx}`} className="relative aspect-square">
                <Image
                  className="object-cover"
                  src={`https://abijrjpibayqrzanhqcq.supabase.co/storage/v1/object/public/dietImages/${image}`}
                  alt={`${diet.id}-${idx}`}
                  fill
                />
              </div>
            ))}
          </div>
          <div>
            {diet.foodInfo.map((food: any) => (
              <div key={`${diet.id}-food-${food.name}`} className="flex flex-col border border-gray-300 rounded p-3">
                <div>{food.foodName}</div>
                <div>{food.kcal}kcal</div>
                <div className="flex gap-3 text-sm">
                  <div>탄수화물 {food.carbohydrate}g</div>
                  <div>단백질 {food.protein}g</div>
                  <div>지방 {food.fat}g</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DietList;

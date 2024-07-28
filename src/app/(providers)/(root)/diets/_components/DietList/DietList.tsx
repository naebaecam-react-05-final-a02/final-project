import { DietTableType } from '@/types/diet';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DietListProps {
  diets: DietTableType[];
}

const DietList = ({ diets }: DietListProps) => {
  const router = useRouter();
  return (
    <>
      {diets.length === 0 ? (
        <div className="flex flex-col items-center gap-1">
          <span>식단 기록이 없습니다</span>
          <button className="text-sm" onClick={() => router.push('/diets/write')}>
            추가하러 가기
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-5">
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
                  <div
                    key={`${diet.id}-food-${food.name}`}
                    className="flex flex-col border border-gray-300 rounded p-3"
                  >
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
      )}
    </>
  );
};

export default DietList;

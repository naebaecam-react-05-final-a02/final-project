import Chip from '@/components/Chip';
import { dietCode } from '@/data/dietTypeCode';
import { dietsQueryKeys } from '@/hooks/diet/queries';
import { useDeleteDiets, useGetDiets } from '@/hooks/diet/useDiets';
import { queryClient } from '@/providers/QueryProvider';
import useDietStore from '@/stores/diet.store';
import { DietTableType } from '@/types/diet';
import { getDietsCalories, getFoodsCalories } from '@/utils/calculateDiet';
import { getFormattedDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/navigation';
import DeleteIcon from '/public/icons/delete.svg';
import EditIcon from '/public/icons/edit.svg';

interface DietListProps {
  selectedDate: Date;
}

const DietList = ({ selectedDate }: DietListProps) => {
  const router = useRouter();

  const setDiet = useDietStore((state) => state.setDiet);
  const { data: diets, isPending: isFetching, isError: isFetchError } = useGetDiets(getFormattedDate(selectedDate));
  const { mutate: deleteDiet, error, isPending: isDeleting } = useDeleteDiets();

  if (isFetching) return <div className="text-center">데이터를 불러오고 있습니다...</div>;
  if (isDeleting) return <div className="text-center">데이터를 삭제하고 있습니다...</div>;
  if (isFetchError) return <div className="text-center">데이터를 불러오는 도중 에러가 발생했습니다!</div>;

  const totalCalories = getDietsCalories(diets);
  const calories = diets.map((diet) => getFoodsCalories(diet.foods));

  const handleAddButtonClick = () => {
    setDiet(null);
    router.push('/diets/write');
  };

  const handleEditButtonClick = (diet: DietTableType) => {
    setDiet(diet);
    router.push('/diets/write?mode=edit');
  };

  const handleDeleteButtonClick = (dietId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setDiet(null);
    deleteDiet(
      { id: dietId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: dietsQueryKeys.detail(getFormattedDate(selectedDate)) });
        },
        onError: (e) => {
          alert(e);
        },
      },
    );
  };

  return (
    <>
      {diets?.length === 0 ? (
        <div className="flex flex-col items-center gap-3">
          <span>식단 기록이 없습니다</span>
          <button className="text-sm" onClick={handleAddButtonClick}>
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
                  <h3 className="text-center text-[17px] text-[#FFFFFF80] font-semibold">{dietCode[diet.dietType]}</h3>
                  <div className="flex gap-4">
                    <button onClick={() => handleEditButtonClick(diet)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => handleDeleteButtonClick(diet.id)}>
                      <DeleteIcon />
                    </button>
                  </div>
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

import Chip from '@/components/Chip';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { dietCode } from '@/data/dietTypeCode';
import { dietsQueryKeys } from '@/hooks/diet/queries';
import { useDeleteDiets, useGetDiets } from '@/hooks/diet/useDiets';
import { queryClient } from '@/providers/QueryProvider';
import useDateStore from '@/stores/date.store';
import useDietStore from '@/stores/diet.store';
import { DietTableType } from '@/types/diet';
import { getDietsCalories, getFoodsCalories } from '@/utils/calculateDiet';
import { getFormattedDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import EditIcon from '/public/icons/edit.svg';
import DeleteIcon from '/public/icons/x.svg';

const DietList = () => {
  const router = useRouter();
  const modal = useModal();

  const selectedDate = useDateStore((store) => store.date);
  const setDiet = useDietStore((state) => state.setDiet);
  const { data: diets, isPending: isFetching, isError: isFetchError } = useGetDiets(getFormattedDate(selectedDate));
  const { mutate: deleteDiet, isPending: isDeleting } = useDeleteDiets();

  if (isFetching) return <div className="text-center">로딩중...</div>;
  if (isDeleting) return <Loading />;
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

  const handleDeleteButtonClick = async (dietId: number) => {
    const response = await modal.confirm(['정말 삭제하시겠습니까?']);
    if (!response) return;
    setDiet(null);
    deleteDiet(
      { id: dietId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: dietsQueryKeys.detail(getFormattedDate(selectedDate)) });
        },
        onError: (e) => {
          modal.alert([e.message]);
        },
      },
    );
  };

  return (
    <div className="flex flex-col px-4 gap-4">
      {diets?.length === 0 ? (
        <div className="flex flex-col items-center gap-1">
          <span>식단 기록이 없습니다</span>
          <button className="text-sm text-primary-100 underline underline-offset-2" onClick={handleAddButtonClick}>
            추가하러 가기
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col p-4 bg-whiteT-3 border border-whiteT-20 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)] rounded-[20px]">
            <div className="text-lg font-semibold border-b border-whiteT-10 pb-2 mb-2">
              <span className="mr-0.5">{totalCalories.kcal}</span>
              <span>kcal</span>
            </div>
            <div className="grid grid-cols-3 justify-items-center">
              <div className="flex flex-col items-center text-sm">
                <span className="text-whiteT-50 py-2 font-semibold">탄수화물</span>
                <span className="py-2 font-medium">
                  <span className="mr-0.5">{totalCalories.carbohydrate}</span>g
                </span>
              </div>
              <div className="flex flex-col items-center text-sm">
                <span className="text-whiteT-50 py-2 font-semibold">단백질</span>
                <span className="py-2 font-medium">
                  <span className="mr-0.5">{totalCalories.protein}</span>g
                </span>
              </div>
              <div className="flex flex-col items-center text-sm">
                <span className="text-whiteT-50 py-2 font-semibold ">지방</span>
                <span className="py-2 font-medium">
                  <span className="mr-0.5">{totalCalories.fat}</span>g
                </span>
              </div>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {diets?.map((diet, idx) => (
              <li
                key={`diet-${diet.id}`}
                className="flex flex-col gap-1 bg-whiteT-5 border border-whiteT-20 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)] rounded-[20px]"
              >
                <div className="flex justify-between px-4 py-[14px]">
                  <h3 className="text-center text-[17px] text-whiteT-50 font-semibold">{dietCode[diet.dietType]}</h3>
                  <div className="flex gap-4">
                    <button onClick={() => handleEditButtonClick(diet)}>
                      <EditIcon width={20} height={20} />
                    </button>
                    <button onClick={() => handleDeleteButtonClick(diet.id)}>
                      <DeleteIcon width={20} height={20} stroke="#FFF" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm h-11 p-3 border-l-[3px] border-primary-100 bg-gradient-to-r from-[rgba(18,242,135,0.10)] to-transparent to-[47.31%]">
                  <span className="text-primary-100">칼로리</span>
                  <div className="flex items-center">
                    <span className="text-base font-bold mr-0.5">{calories[idx].kcal}</span>
                    <span className="text-whiteT-30 text-xs font-normal">kcal</span>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex justify-between p-3 text-sm font-medium">
                    <span className="text-whiteT-50">탄수화물</span>
                    <span>
                      <span className="mr-0.5">{calories[idx].carbohydrate}</span>
                      <span className="text-xs text-whiteT-30">g</span>
                    </span>
                  </div>
                  <div className="flex justify-between p-3 text-sm font-medium">
                    <span className="text-whiteT-50">단백질</span>
                    <span>
                      <span className="mr-0.5">{calories[idx].protein}</span>
                      <span className="text-xs text-whiteT-30">g</span>
                    </span>
                  </div>
                  <div className="flex justify-between p-3 text-sm font-medium">
                    <span className="text-whiteT-50">지방</span>
                    <span>
                      <span className="mr-0.5">{calories[idx].fat}</span>
                      <span className="text-xs text-whiteT-30">g</span>
                    </span>
                  </div>
                </div>
                <div className="bg-whiteT-10 w-[calc(full-16px)] h-[1px] mx-4"></div>
                <div className="styled-scrollbar flex justify-start gap-3 overflow-x-auto p-3 whitespace-nowrap">
                  <Swiper
                    slidesPerView="auto"
                    spaceBetween={16}
                    freeMode={true}
                    mousewheel={true}
                    modules={[FreeMode, Mousewheel]}
                    className="!flex !justify-start !mx-0 !w-full"
                  >
                    {diet.foods.map((food) => (
                      <SwiperSlide key={food.id} className="!w-auto !flex-shrink-0" style={{ width: 'auto' }}>
                        <Chip food={food} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DietList;

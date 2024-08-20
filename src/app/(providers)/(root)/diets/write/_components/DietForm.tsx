'use client';
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import Input from '@/components/Input';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { foodsQueryKeys } from '@/hooks/diet/foods/queries';
import { useSearchFoodInfo } from '@/hooks/diet/foods/useFoods';
import useDietForm from '@/hooks/diet/useDietForm';
import { useSubmitDiet } from '@/hooks/diet/useDiets';
import useRadio from '@/hooks/diet/useRadio';
import { useDebounce } from '@/hooks/useDebounce';
import { queryClient } from '@/providers/QueryProvider';
import useDateStore from '@/stores/date.store';
import useDietStore from '@/stores/diet.store';
import { DietTimeType } from '@/types/diet';
import { formatCalory } from '@/utils/calculateDiet';
import { getFormattedDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddButton from './AddButton';
import EmojiSelector from './EmojiSelector';

const DietForm = () => {
  const initialValue = useDietStore((state) => state.diet);

  const {
    foodForm,
    foodChips,
    activeChipIdx,
    handleChange: handleFormChange,
    validateFood,
    addNewChip,
    deleteChip,
    changeChip,
    resetForm,
  } = useDietForm({ initialValue });

  const router = useRouter();
  const modal = useModal();

  const selectedDate = useDateStore((state) => state.date);
  const [date, setDate] = useState(getFormattedDate(selectedDate));
  const { selectedValue: dietType, handleChange: handleRadioChange } = useRadio<DietTimeType>(
    ['아침', '점심', '저녁'],
    initialValue?.dietType,
  );

  const { mutate: submitDiet, isPending: isSubmitting } = useSubmitDiet();
  const {
    data: searchedFoods = [],
    isFetching: isSearching,
    isError,
    refetch,
  } = useSearchFoodInfo(foodForm['foodName']);

  const debouncedSearchFoods = useDebounce(() => {
    refetch();
  }, 1000);

  if (isError) return <div>에러입니다</div>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFood()) return;

    submitDiet(
      { id: initialValue?.id, date: new Date(date), dietType, foods: foodChips },
      {
        onSuccess: (response) => {
          modal.alert([response.message]);
          resetForm();
          router.push('/diets');
        },
        onError: (error) => {
          modal.alert([...error.message.split('\n')], `식단 ${initialValue ? '수정' : '저장'} 오류`);
        },
      },
    );
  };

  const dietOptions = [
    { id: '아침', value: '아침' },
    { id: '점심', value: '점심' },
    { id: '저녁', value: '저녁' },
  ];

  const handleDietTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRadioChange(event.target.value as DietTimeType);
  };
  return (
    <>
      {isSubmitting && <Loading />}
      <div className="grid grid-cols-[48px_1fr] gap-3 px-4 mb-8">
        <AddButton onClick={addNewChip} />
        <div className="styled-scrollbar flex overflow-x-scroll scale">
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            freeMode={true}
            mousewheel={true}
            modules={[FreeMode, Mousewheel]}
            className="!flex !justify-start !mx-0 !w-full"
          >
            {foodChips.map((food, idx) => (
              <SwiperSlide key={food.id} className="!w-auto !flex-shrink-0 !mr-3">
                <Chip
                  key={food.id}
                  food={food}
                  isActive={activeChipIdx === idx}
                  handleDelete={() => {
                    deleteChip(food.id!);
                    queryClient.setQueryData(foodsQueryKeys.all, []);
                  }}
                  onClick={() => changeChip(idx)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <form className="flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
        <div className="w-full px-4">
          <div className="grid grid-cols-2 items-end gap-2">
            <Input
              label="날짜 선택"
              inputType="date"
              name="date"
              showMonth
              value={new Date(date)}
              position="left"
              onChange={(newDate: Date) => setDate(getFormattedDate(newDate))}
            />
            <Input
              inputType="select"
              readOnly
              value={dietType}
              dropdownOptions={dietOptions}
              onChange={handleDietTypeChange}
            />
          </div>
        </div>
        <div className="w-full px-4">
          <div className="grid grid-cols-[1fr_48px] items-end gap-2">
            <Input
              label="음식 이름"
              inputType="select"
              value={foodForm['foodName']}
              placeholder="음식 이름을 입력해주세요."
              maxHeight={300}
              dropdownOptions={
                isSearching
                  ? [{ value: '검색중...', preventClick: true }]
                  : searchedFoods.length === 0
                  ? [
                      { value: foodForm['foodName'] },
                      { value: `${foodForm['foodName']}의 음식 검색 결과가 없습니다`, preventClick: true },
                    ]
                  : [
                      { value: foodForm['foodName'] },
                      ...searchedFoods.map((food) => ({
                        value: `${food.name}`,
                        text: `${food.serving}g당 ${food.kcal}kcal`,
                        onClick: () => {
                          handleFormChange('foodName', food.name);
                          handleFormChange('kcal', Number(food.kcal));
                          handleFormChange('carbohydrate', Number(food.carbohydrate));
                          handleFormChange('protein', Number(food.protein));
                          handleFormChange('fat', Number(food.fat));
                        },
                      })),
                    ]
              }
              onChange={(e) => {
                handleFormChange('foodName', e.target.value);
                debouncedSearchFoods();
              }}
            />
            <EmojiSelector
              foodType={foodForm['foodType']}
              handleEmojiChange={(emoji) => handleFormChange('foodType', emoji)}
            />
          </div>
        </div>
        <div className="w-full px-4">
          <Input
            label="칼로리"
            type="number"
            value={foodForm['kcal'] === null ? '' : foodForm['kcal']}
            placeholder="0"
            unit="kcal"
            onChange={(e) => handleFormChange('kcal', formatCalory(e.target.value))}
          />
        </div>
        <div className="w-full grid grid-cols-3 gap-2 px-4">
          <div>
            <Input
              label="탄수화물"
              type="number"
              value={foodForm['carbohydrate'] === null ? '' : foodForm['carbohydrate']}
              placeholder="0"
              unit="g"
              onChange={(e) => handleFormChange('carbohydrate', formatCalory(e.target.value))}
            />
          </div>
          <div>
            <Input
              label="단백질"
              type="number"
              value={foodForm['protein'] === null ? '' : foodForm['protein']}
              placeholder="0"
              unit="g"
              onChange={(e) => handleFormChange('protein', formatCalory(e.target.value))}
            />
          </div>
          <div>
            <Input
              label="지방"
              type="number"
              value={foodForm['fat'] === null ? '' : foodForm['fat']}
              placeholder="0"
              unit="g"
              onChange={(e) => handleFormChange('fat', formatCalory(e.target.value))}
            />
          </div>
        </div>
        <div className="w-full px-4 mt-4">
          <Button type="submit">입력 완료</Button>
        </div>
      </form>
    </>
  );
};

export default DietForm;

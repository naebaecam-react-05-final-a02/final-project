'use client';
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import Input from '@/components/Input';
import Loading from '@/components/Loading/Loading';
import useDietForm from '@/hooks/diet/useDietForm';
import { useSubmitDiet } from '@/hooks/diet/useDiets';
import useRadio from '@/hooks/diet/useRadio';
import useDateStore from '@/stores/date.store';
import useDietStore from '@/stores/diet.store';
import { DietTimeType } from '@/types/diet';
import { getFormattedDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddButton from './AddButton';
import EmojiSelector from './EmojiSelector';
import TextInput from './TextInput';

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

  // TODO: 식단 date 컬럼 타입 timestamp에서 date로 변경해서 split 필요없게 할래용
  const selectedDate = useDateStore((state) => state.date);
  const [date, setDate] = useState(getFormattedDate(selectedDate));
  const { selectedValue: dietType, handleChange: handleRadioChange } = useRadio<DietTimeType>(
    ['아침', '점심', '저녁'],
    initialValue?.dietType,
  );

  const { mutate: submitDiet, isPending } = useSubmitDiet();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFood()) return;

    submitDiet(
      { id: initialValue?.id, date: new Date(date), dietType, foods: foodChips },
      {
        onSuccess: (response) => {
          alert(response.message);
          resetForm();
          router.push('/diets');
        },
        onError: (error) => {
          console.error('Save-diet error:', error);
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
      {isPending && <Loading />}
      <div className="grid grid-cols-[48px_1fr] gap-3 px-4 mb-8">
        <AddButton onClick={addNewChip} />
        <div className="chips flex overflow-x-scroll scale">
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
                  handleDelete={() => deleteChip(food.id!)}
                  onClick={() => changeChip(idx)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <form className="flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
        <div className="w-full px-4">
          <h2 className="opacity-70 text-sm">날짜 선택</h2>
          <div className="grid grid-cols-2 items-center gap-2">
            <Input
              inputType="date"
              name="date"
              showMonth
              value={new Date(date)}
              position="left"
              onChange={(newDate: Date) => setDate(getFormattedDate(newDate))}
            />
            <Input inputType="select" value={dietType} dropdownOptions={dietOptions} onChange={handleDietTypeChange} />
          </div>
        </div>
        <div className="w-full px-4">
          <h2 className="opacity-70 text-sm">음식 이름</h2>
          <TextInput
            value={foodForm['foodName']}
            placeholder="음식 이름을 입력해주세요."
            onChange={(e) => handleFormChange('foodName', e.target.value)}
          >
            {
              <EmojiSelector
                foodType={foodForm['foodType']}
                handleEmojiChange={(emoji) => handleFormChange('foodType', emoji)}
              />
            }
          </TextInput>
        </div>
        <div className="w-full px-4">
          <Input
            label="칼로리"
            type="number"
            value={foodForm['kcal'] === null ? '' : foodForm['kcal']}
            placeholder="0"
            unit="kcal"
            onChange={(e) => handleFormChange('kcal', Number.parseInt(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 px-4">
          <div className="w-full">
            <Input
              label="탄수화물"
              type="number"
              value={foodForm['carbohydrate'] === null ? '' : foodForm['carbohydrate']}
              placeholder="0"
              unit="g"
              onChange={(e) => handleFormChange('carbohydrate', Number.parseInt(e.target.value))}
            />
          </div>
          <div className="w-full">
            <Input
              label="단백질"
              type="number"
              value={foodForm['protein'] === null ? '' : foodForm['protein']}
              placeholder="0"
              unit="g"
              onChange={(e) => handleFormChange('protein', Number.parseInt(e.target.value))}
            />
          </div>
          <div className="w-full">
            <Input
              label="지방"
              type="number"
              value={foodForm['fat'] === null ? '' : foodForm['fat']}
              placeholder="0"
              unit="g"
              onChange={(e) => handleFormChange('fat', Number.parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="w-full px-4">
          <Button type="submit">입력 완료</Button>
        </div>
      </form>
    </>
  );
};

export default DietForm;

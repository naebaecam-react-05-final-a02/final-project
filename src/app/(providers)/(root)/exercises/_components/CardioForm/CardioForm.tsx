import { useCardioInputStore } from '@/stores/useExerciseStore';
import { CardioInput } from '@/types/exercises';
import { useEffect } from 'react';
import AddSetButton from '../AddSetButton';
import FormItem from '../FormItem';
import InputLabel from '../InputLabel';

type CardioFormProps = {
  onChange: (data: CardioInput[]) => void;
};

const CardioForm = ({ onChange }: CardioFormProps) => {
  const cardioList = useCardioInputStore((state) => state.cardioInputs);
  console.log(cardioList);
  const setCardioList = useCardioInputStore((state) => state.setCardioInputs);
  const addCardio = useCardioInputStore((state) => state.addInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = cardioList.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: Number(value) };
      }
      return item;
    });
    console.log('@@');
    setCardioList(list);
    if (cardioList.length === 0) {
      console.error('유산소 리스트가 비어 있습니다.');
    } else {
      onChange(list);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-4 justify-items-center h-12">
          <InputLabel>세트</InputLabel>
          <InputLabel>시간</InputLabel>
          <InputLabel>분</InputLabel>
          <InputLabel></InputLabel>
        </div>
        {cardioList.map((item, index) => (
          <FormItem
            type={'cardio'}
            onChange={handleChange}
            key={index}
            index={index}
            firstProp={item.hours}
            secondProp={item.minutes}
          />
        ))}
        <AddSetButton onClick={addCardio}>세트 추가하기</AddSetButton>
      </form>
    </div>
  );
};

export default CardioForm;

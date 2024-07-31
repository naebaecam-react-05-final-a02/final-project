import { useCardioInputStore } from '@/stores/useExerciseStore';
import AddSetButton from '../AddSetButton/AddSetButton';
import FormItem from '../FormItem';
import InputLabel from '../InputLabel/InputLabel';

const CardioForm = () => {
  const cardioList = useCardioInputStore((state) => state.cardioInputs);
  console.log(cardioList);
  const setCardioList = useCardioInputStore((state) => state.setCardioInputs);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = cardioList.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: Number(value) };
      }
      return item;
    });

    setCardioList(list);
  };
  const addCardio = useCardioInputStore((state) => state.addInput);

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
            onChange={onChange}
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

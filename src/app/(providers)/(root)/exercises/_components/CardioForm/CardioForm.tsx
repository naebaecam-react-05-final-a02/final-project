import { useCardioInputStore } from '@/stores/useExerciseStore';
import FormItem from '../FormItem';

const CardioForm = () => {
  const cardioList = useCardioInputStore((state) => state.cardioInputs);
  console.log(cardioList);
  const setCardioList = useCardioInputStore((state) => state.setCardioInputs);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    console.log(name, value);
    const list = cardioList.map((item, i) => {
      console.log(i, index);
      console.log(i === index);
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
      <form>
        <div className="grid grid-cols-4 justify-items-center">
          <p>세트</p>
          <p>시간</p>
          <p>분</p>
          <p></p>
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
        <button className="w-full h-8 bg-gray-400 text-white" onClick={addCardio} type="button">
          세트 추가하기
        </button>
      </form>
    </div>
  );
};

export default CardioForm;

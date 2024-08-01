import { useWeightInputStore } from '@/stores/useExerciseStore';
import FormItem from '../FormItem';

const WeightForm = () => {
  const weightList = useWeightInputStore((state) => state.weightInputs);

  const setWeightList = useWeightInputStore((state) => state.setWeightInputs);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = weightList.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: Number(value) };
      }
      return item;
    });

    setWeightList(list);
  };
  const addWeight = useWeightInputStore((state) => state.addInput);

  return (
    <div>
      <form>
        <div className="grid grid-cols-4 justify-items-center">
          <p>세트</p>
          <p>무게</p>
          <p>횟수</p>
          <p></p>
        </div>
        {weightList.map((item, index) => (
          <FormItem
            type={'weight'}
            onChange={onChange}
            key={index}
            index={index}
            firstProp={item.weight}
            secondProp={item.reps}
          />
        ))}
        <button className="w-full h-8 bg-gray-400 text-white" onClick={addWeight} type="button">
          세트 추가하기
        </button>
      </form>
    </div>
  );
};

export default WeightForm;

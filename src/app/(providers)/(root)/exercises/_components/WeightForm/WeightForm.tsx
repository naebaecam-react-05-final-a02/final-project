import { useWeightInputStore } from '@/stores/useExerciseStore';
import AddSetButton from '../AddSetButton';
import FormItem from '../FormItem';
import InputLabel from '../InputLabel';

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
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-4 justify-items-center h-12">
          <InputLabel>세트</InputLabel>
          <InputLabel>무게</InputLabel>
          <InputLabel>횟수</InputLabel>
          <InputLabel></InputLabel>
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
        <AddSetButton onClick={addWeight}>세트 추가하기</AddSetButton>
      </form>
    </div>
  );
};

export default WeightForm;

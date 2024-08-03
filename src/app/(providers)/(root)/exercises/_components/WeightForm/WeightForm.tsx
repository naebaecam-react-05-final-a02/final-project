import { useWeightInputStore } from '@/stores/useExerciseStore';
import { WeightInput } from '@/types/exercises';
import { useEffect } from 'react';
import AddSetButton from '../AddSetButton';
import FormItem from '../FormItem';
import InputLabel from '../InputLabel';

type WeightFormProps = {
  onChange: (data: WeightInput[]) => void;
};
const WeightForm = ({ onChange }: WeightFormProps) => {
  const weightList = useWeightInputStore((state) => state.weightInputs);
  const setWeightList = useWeightInputStore((state) => state.setWeightInputs);
  const addWeight = useWeightInputStore((state) => state.addInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = weightList.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: Number(value) };
      }
      return item;
    });

    setWeightList(list);
    if (weightList.length === 0) {
      console.error('무게 리스트가 비어 있습니다.');
    } else {
      console.log('@@호출');
      onChange(list);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-4 justify-items-center h-12">
          <InputLabel>세트</InputLabel>
          <InputLabel>kg</InputLabel>
          <InputLabel>회</InputLabel>
          <InputLabel>-</InputLabel>
        </div>
        {weightList.map((item, index) => (
          <FormItem
            type={'weight'}
            onChange={handleChange}
            key={index}
            index={index}
            firstProp={item.weight}
            secondProp={item.reps}
          />
        ))}
        <AddSetButton onClick={addWeight}>세트 추가하기 +</AddSetButton>
      </form>
    </div>
  );
};

export default WeightForm;

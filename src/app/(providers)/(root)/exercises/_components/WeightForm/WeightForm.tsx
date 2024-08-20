import { useExerciseStore } from '@/stores/exercise.store';
import { ExerciseRecord, WeightInput } from '@/types/exercises';
import AddSetButton from '../AddSetButton';
import FormItem from '../FormItem';
import InputLabel from '../InputLabel';

const WeightForm = () => {
  const { weightInputs, setWeightInputs, addInput, setRecord } = useExerciseStore();

  const updateWeightRecord = (updatedInputs: WeightInput[]) => {
    setRecord({
      exerciseType: 'weight',
      record: updatedInputs,
    } as ExerciseRecord & { exerciseType: 'weight'; record: WeightInput[] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedInputs = weightInputs.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: Number(value) };
      }
      return item;
    });

    setWeightInputs(updatedInputs);
    updateWeightRecord(updatedInputs);
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
        {weightInputs.map((item, index) => (
          <FormItem
            type="weight"
            key={index}
            index={index}
            firstProp={item.weight}
            secondProp={item.reps}
            onChange={handleChange}
          />
        ))}
        <AddSetButton onClick={addInput}>세트 추가하기 +</AddSetButton>
      </form>
    </div>
  );
};

export default WeightForm;

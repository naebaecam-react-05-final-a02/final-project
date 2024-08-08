import { useExerciseStore } from '@/stores/exercise.store';
import { CardioInput, ExerciseRecord } from '@/types/exercises';
import AddSetButton from '../AddSetButton';
import FormItem from '../FormItem';
import InputLabel from '../InputLabel';

const CardioForm = () => {
  const { cardioInputs, setCardioInputs, addInput, setRecord } = useExerciseStore();

  const updateCardioRecord = (updatedInputs: CardioInput[]) => {
    setRecord({
      exerciseType: 'cardio',
      record: updatedInputs,
    } as ExerciseRecord & { exerciseType: 'cardio'; record: CardioInput[] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedInputs = cardioInputs.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: Number(value) };
      }
      return item;
    });
    setCardioInputs(updatedInputs);
    updateCardioRecord(updatedInputs);
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-4 justify-items-center h-12 ">
          <InputLabel>세트</InputLabel>
          <InputLabel>분</InputLabel>
          <InputLabel>km</InputLabel>
          <InputLabel>-</InputLabel>
        </div>
        {cardioInputs.map((item, index) => (
          <FormItem
            type="cardio"
            key={index}
            index={index}
            firstProp={item.minutes}
            secondProp={item.distance}
            onChange={handleChange}
          />
        ))}
        <AddSetButton onClick={addInput}>세트 추가하기 +</AddSetButton>
      </form>
    </div>
  );
};

export default CardioForm;

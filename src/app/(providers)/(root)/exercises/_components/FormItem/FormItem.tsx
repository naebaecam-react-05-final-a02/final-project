import { useCardioInputStore, useWeightInputStore } from '@/stores/useExerciseStore';
import DeleteButton from './DeleteButton';
import Input from './Input';

interface FormItemProps {
  index: number;
  firstProp: number;
  secondProp: number;
  type: 'cardio' | 'weight';
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const FormItem = ({ onChange, type, index, firstProp, secondProp }: FormItemProps) => {
  const deleteCardio = useCardioInputStore((state) => state.deleteInput);
  const deleteWeight = useWeightInputStore((state) => state.deleteInput);
  const deleteInput = () => {
    if (type === 'cardio') {
      deleteCardio(index);
    } else {
      deleteWeight(index);
    }
  };
  return (
    <div className="grid grid-cols-4 justify-items-center">
      <div
        className="flex justify-center items-center w-12 h-10 rounded-xl border-2 border-[#504f55] exerciseInput input-bg
      text-semibold"
      >
        {index + 1}
      </div>
      <Input onChange={(e) => onChange(e, index)} name={type === 'cardio' ? 'hours' : 'weight'} value={firstProp} />

      <Input onChange={(e) => onChange(e, index)} name={type === 'cardio' ? 'minutes' : 'reps'} value={secondProp} />

      <DeleteButton onClick={deleteInput} />
    </div>
  );
};

export default FormItem;

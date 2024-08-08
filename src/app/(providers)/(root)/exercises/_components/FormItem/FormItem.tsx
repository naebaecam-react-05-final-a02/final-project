import { useExerciseStore } from '@/stores/exercise.store';
import DeleteButton from './DeleteButton';
import Input from './Input';

interface FormItemProps {
  index: number;
  type: 'cardio' | 'weight';
  firstProp: number | null;
  secondProp: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const FormItem = ({ type, index, firstProp, secondProp, onChange }: FormItemProps) => {
  const { deleteInput } = useExerciseStore();

  return (
    <div className="grid grid-cols-4 justify-items-center">
      <div className="flex justify-center items-center w-12 h-10 rounded-xl border-2 border-[#504f55] exerciseInput input-bg text-semibold text-white text-opacity-50">
        {index + 1}
      </div>
      <Input onChange={(e) => onChange(e, index)} name={type === 'cardio' ? 'minutes' : 'weight'} value={firstProp} />
      <Input onChange={(e) => onChange(e, index)} name={type === 'cardio' ? 'distance' : 'reps'} value={secondProp} />
      <DeleteButton onClick={() => deleteInput(index)} />
    </div>
  );
};

export default FormItem;

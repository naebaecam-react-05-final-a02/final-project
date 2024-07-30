import { useCardioInputStore, useWeightInputStore } from '@/stores/useExerciseStore';

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
      <div className="flex justify-center items-center w-12 h-10 border-2 border-black">{index + 1}</div>
      <input
        onChange={(e) => onChange(e, index)}
        className="flex justify-center items-center w-12 h-10 border-2 border-black exerciseInput"
        name={type === 'cardio' ? 'hours' : 'weight'}
        type="number"
        value={firstProp}
      />
      <input
        onChange={(e) => onChange(e, index)}
        className="flex justify-center items-center w-12 h-10 border-2 border-black exerciseInput"
        name={type === 'cardio' ? 'minutes' : 'reps'}
        type="number"
        value={secondProp}
      />
      <button
        type="button"
        className="flex justify-center items-center w-12 h-10 border-2 border-black"
        onClick={deleteInput}
      >
        삭제
      </button>
    </div>
  );
};

export default FormItem;

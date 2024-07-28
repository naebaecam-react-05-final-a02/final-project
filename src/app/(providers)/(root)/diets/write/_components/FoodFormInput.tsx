import { ComponentProps } from 'react';
import TextInput from './TextInput';

interface FoodFormInputProps {
  title: string;
  name: string;
  unit?: string;
}

const FoodFormInput = ({ title, name, unit, ...props }: FoodFormInputProps & ComponentProps<'input'>) => {
  return (
    <div className="w-full">
      <h2 className="opacity-70 text-sm">{title}</h2>
      <div>
        <TextInput unit={unit} {...props} />
      </div>
    </div>
  );
};

export default FoodFormInput;

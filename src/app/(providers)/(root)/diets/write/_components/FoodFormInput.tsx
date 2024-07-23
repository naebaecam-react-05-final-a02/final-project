import { ComponentProps } from 'react';
import TextInput from './TextInput';

interface FoodFormInputProps {
  title: string;
  name: string;
  unit?: string;
}

const FoodFormInput = ({ title, name, unit, ...props }: FoodFormInputProps & ComponentProps<'input'>) => {
  return (
    <div>
      <h2 className="font-bold">{title}</h2>
      <div>
        <TextInput {...props} />
        {unit}
      </div>
    </div>
  );
};

export default FoodFormInput;

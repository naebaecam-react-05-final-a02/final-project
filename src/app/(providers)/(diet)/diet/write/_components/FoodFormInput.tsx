import { ComponentProps } from 'react';
import TextInput from './TextInput';

interface FoodFormInputProps {
  title: string;
  name: string;
}

const FoodFormInput = ({ title, name, ...props }: FoodFormInputProps & ComponentProps<'input'>) => {
  return (
    <div>
      <h2 className="font-bold">{title}</h2>
      <div>
        <TextInput {...props} />
        {props?.type === 'number' && 'kcal'}
      </div>
    </div>
  );
};

export default FoodFormInput;

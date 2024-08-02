import { ReactNode } from 'react';
import InputSelect from './InputSelect';
import { InputSelectProps } from './InputSelect/InputSelect';
import InputText from './InputText';
import { InputTextProps } from './InputText/InputText';

export type BaseInputProps = {
  label?: string;
  error?: string | null;
  icon?: ReactNode;
  unit?: string;
  className?: string;
  placeholder?: string;
};

type InputProps =
  | (InputTextProps & { inputType?: 'text' })
  | (Omit<InputSelectProps, 'dropdownOptions'> & {
      inputType: 'select';
      dropdownOptions: InputSelectProps['dropdownOptions'];
    });

const Input = (props: InputProps) => {
  const { inputType, ...restProps } = props;

  if (inputType === 'select') {
    return <InputSelect {...(restProps as InputSelectProps)} />;
  }

  return <InputText {...(restProps as InputTextProps)} />;
};

export default Input;

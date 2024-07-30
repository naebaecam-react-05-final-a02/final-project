import { ReactNode } from 'react';
import InputSelect from './InputSelect';
import { InputSelectProps } from './InputSelect/InputSelect';
import InputText, { InputTextProps } from './InputText/InputText';

export type BaseInputProps = {
  label?: string;
  error?: string | null;
  icon?: ReactNode;
  unit?: string;
  className?: string;
};

type InputProps = (InputTextProps & { isDropdown?: false }) | (InputSelectProps & { isDropdown: true });

const Input = (props: InputProps) => {
  if (props.isDropdown) {
    return <InputSelect {...(props as InputSelectProps)} />;
  }
  return <InputText {...(props as InputTextProps)} />;
};

export default Input;

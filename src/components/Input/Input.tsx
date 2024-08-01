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
  placeholder?: string;
};

type InputProps =
  | (Omit<InputTextProps, 'isDropdown'> & { isDropdown?: false })
  | (Omit<InputSelectProps, 'isDropdown'> & { isDropdown: true });

const Input = (props: InputProps) => {
  const { isDropdown, ...restProps } = props;

  if (isDropdown) {
    return <InputSelect {...(restProps as InputSelectProps)} />;
  }
  return <InputText {...(restProps as InputTextProps)} />;
};

export default Input;

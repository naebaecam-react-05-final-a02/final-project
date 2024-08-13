//Input.tsx
import { ReactNode } from 'react';
import InputDate from './InputDate';
import { InputDateProps } from './InputDate/InputDate';
import InputSelect from './InputSelect';
import { InputSelectProps } from './InputSelect/InputSelect';
import InputText from './InputText';
import { InputTextProps } from './InputText/InputText';

export type BaseInputProps = {
  label?: string;
  error?: string | null;
  success?: string | null;
  icon?: ReactNode;
  unit?: string;
  className?: string;
  placeholder?: string;
  noBackground?: boolean;
};

type InputTextTypeProps =
  | (Omit<InputTextProps<'input'>, 'inputType'> & { inputType?: 'text' })
  | (Omit<InputTextProps<'textarea'>, 'inputType'> & { inputType: 'textarea' });

type InputProps =
  | InputTextTypeProps
  | (Omit<InputSelectProps, 'dropdownOptions'> & {
      inputType: 'select';
      dropdownOptions: InputSelectProps['dropdownOptions'];
    })
  | (Omit<InputDateProps, 'inputType'> & { inputType: 'date' });

const Input = (props: InputProps) => {
  const { inputType, ...restProps } = props;

  if (inputType === 'select') {
    return <InputSelect {...(restProps as InputSelectProps)} />;
  }

  if (inputType === 'date') {
    return <InputDate {...(restProps as InputDateProps)} />;
  }

  return (
    <InputText
      inputType={inputType === 'textarea' ? 'textarea' : 'input'}
      {...(restProps as InputTextProps<typeof inputType extends 'textarea' ? 'textarea' : 'input'>)}
    />
  );
};

export default Input;

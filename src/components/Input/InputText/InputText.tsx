'use client';

import { ComponentProps, useId, useRef } from 'react';
import { BaseInputProps } from '../Input';

type InputElementType = 'input' | 'textarea';

export type InputTextProps<T extends InputElementType> = BaseInputProps &
  (T extends 'input' ? ComponentProps<'input'> : ComponentProps<'textarea'>) & {
    inputType?: T;
    rows?: number;
    readOnly?: boolean;
  };

function InputText<T extends InputElementType = 'input'>({
  label,
  id,
  success,
  error,
  icon,
  unit,
  className = '',
  inputType = 'input' as T,
  rows = 3,
  ...props
}: InputTextProps<T>) {
  const inputUid = useId();
  const inputId = id || inputUid;
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const InputComponent = inputType === 'textarea' ? 'textarea' : 'input';

  const baseClasses = `w-full rounded-lg text-white placeholder-white/40
  focus:outline-none transition text-sm
  ${
    props.readOnly
      ? ''
      : `focus:border-b-[2px] border-gradient-light ${error ? 'border-error-gradient' : 'focus:border-gradient'}`
  }
  ${className}
  ${icon ? 'pl-11' : 'pl-4'} 
  ${unit ? 'pr-12' : 'pr-3'} 
  py-[13.5px]`;
  const inputSpecificClasses =
    inputType === 'textarea'
      ? 'resize-none bg-transparent backdrop-blur-[10px] bg-input-gradient'
      : 'appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

  const inputClasses = `${baseClasses} ${inputSpecificClasses}`;

  const renderInput = () => (
    <InputComponent
      ref={inputRef}
      id={inputId}
      className={inputClasses}
      {...(inputType === 'textarea' ? { rows } : {})}
      {...(props as any)}
    />
  );

  return (
    <div className="flex flex-col w-full justify-between">
      {label && (
        <label htmlFor={inputId} className="text-white/70 pl-1 pb-1 text-sm">
          <span>{label}</span>
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3.5 z-10 text-white/40 text-xl">{icon}</div>}
        {inputType === 'input' ? (
          <div className="input-wrapper backdrop-blur-[10px] bg-input-gradient w-full rounded-lg">{renderInput()}</div>
        ) : (
          renderInput()
        )}
        {unit && <span className="absolute right-4 text-white/40 text-sm">{unit}</span>}
      </div>
      {success && <div className="text-primary-100 text-sm mt-1 ml-1 w-full">{success}</div>}
      {error && <div className="text-red-500 text-sm mt-1 ml-1 w-full">{error}</div>}
    </div>
  );
}

export default InputText;

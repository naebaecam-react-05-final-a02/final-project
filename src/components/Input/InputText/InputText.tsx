'use client';

import { ComponentProps, useId } from 'react';
import { BaseInputProps } from '../Input';

type InputElementType = 'input' | 'textarea';

export type InputTextProps<T extends InputElementType> = BaseInputProps &
  (T extends 'input' ? ComponentProps<'input'> : ComponentProps<'textarea'>) & {
    inputType?: T;
    rows?: number;
  };

function InputText<T extends InputElementType = 'input'>({
  label,
  id,
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

  const InputComponent = inputType === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="flex flex-col w-full gap-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-white/70 pl-1 pb-1 text-[12px]">
          <span>{label}</span>
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3.5 z-10 text-white/40 text-xl">{icon}</div>}
        <InputComponent
          id={inputId}
          className={`w-full bg-transparent rounded-lg text-white placeholder-white/40 
            bg-input-gradient backdrop-blur-[10px] focus:outline-none transition 
            focus:border-b-[2px] ${error ? 'border-error-gradient' : 'focus:border-gradient'} ${className}
            ${icon ? 'pl-11' : 'pl-4'} 
            ${unit ? 'pr-12' : 'pr-3'} 
            py-3.5 ${inputType === 'textarea' ? 'resize-none' : ''}`}
          {...(inputType === 'textarea' ? { rows } : {})}
          {...(props as any)}
        />
        {unit && <span className="absolute right-4 text-white/40 text-sm">{unit}</span>}
      </div>
      {error && <div className="text-red-500 text-sm mt-1 ml-1 w-full">{error}</div>}
    </div>
  );
}

export default InputText;

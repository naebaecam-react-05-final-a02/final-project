'use client';

import { ComponentProps, useId } from 'react';
import { BaseInputProps } from '../Input';

export type InputTextProps = BaseInputProps & ComponentProps<'input'>;

const InputText = ({ label, id, error, icon, unit, className = '', ...props }: InputTextProps) => {
  const inputUid = useId();
  const inputId = id || inputUid;

  return (
    <div className="flex flex-col w-full gap-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-white/70 pl-1 pb-1 text-[12px]">
          <span>{label}</span>
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3.5 z-10 text-white/40 text-xl">{icon}</div>}
        <input
          id={inputId}
          className={`w-full bg-transparent rounded-lg text-white placeholder-white/40 
            bg-input-gradient backdrop-blur-[10px] focus:outline-none transition 
            focus:border-b-[2px] ${error ? 'border-error-gradient' : 'focus:border-gradient'} ${className}
            ${icon ? 'pl-11' : 'pl-4'} 
            ${unit ? 'pr-12' : 'pr-3'} 
            py-3.5`}
          {...props}
        />
        {unit && <span className="absolute right-4 text-white/40 text-sm">{unit}</span>}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputText;

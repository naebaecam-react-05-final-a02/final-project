'use client';

import ArrowDropDown from '@/icons/ArrowDropDown';
import { ComponentProps, useEffect, useId, useRef, useState } from 'react';
import { BaseInputProps } from '../Input';

export type InputSelectProps = Omit<BaseInputProps & ComponentProps<'button'>, 'onChange'> & {
  dropdownOptions: string[];
  onChange?: (event: { target: { value: string } }) => void;
};

const InputSelect = ({
  label,
  id,
  error,
  icon,
  dropdownOptions,
  onChange,
  className = '',
  ...props
}: InputSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputUid = useId();
  const inputId = id || inputUid;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      const event = {
        target: { value: option },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-1.5 [&+&]:mt-4">
      {label && (
        <label htmlFor={inputId} className="text-white/70 pl-1 pb-1 text-[12px]">
          <span>{label}</span>
        </label>
      )}
      <div className="relative flex items-center" ref={dropdownRef}>
        {icon && <div className="absolute left-3.5 z-10 text-white/40 text-xl">{icon}</div>}
        <button
          type="button"
          id={inputId}
          className={`w-full bg-transparent rounded-lg text-white placeholder-white/40 
            bg-input-gradient backdrop-blur-[10px] focus:outline-none transition 
            focus:border-b-[2px] ${error ? 'border-error-gradient' : 'focus:border-gradient'} ${className}
            ${icon ? 'pl-11' : 'pl-3'} 
            pr-10 py-3.5 text-right`}
          onClick={() => setIsOpen(!isOpen)}
          {...props}
        >
          {selectedOption}
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                        flex flex-col justify-center items-center 
                        p-[2px] gap-[10px] rounded-[4px] 
                        bg-[rgba(255,255,255,0.05)]"
          >
            <ArrowDropDown />
          </div>
        </button>
        {isOpen && (
          <ul className="absolute top-full left-0 w-full mt-1 bg-input-gradient backdrop-blur-[10px] rounded-lg shadow-lg z-20">
            {dropdownOptions.map((option, index) => (
              <li
                key={index}
                className="px-3 py-3 hover:bg-white/20 cursor-pointer text-right pr-[38px] border-gradient border-b border-white/10 last:border-b-0"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputSelect;

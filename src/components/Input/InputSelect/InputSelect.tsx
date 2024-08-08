'use client';

import ArrowDropDown from '@/icons/ArrowDropDown';
import { ComponentProps, ReactNode, useEffect, useId, useRef, useState } from 'react';
import { BaseInputProps } from '../Input';

type DropdownOption = {
  id?: string | number;
  value: string;
  icon?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

export type InputSelectProps = Omit<BaseInputProps & ComponentProps<'input'>, 'inputType'> & {
  dropdownOptions: DropdownOption[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textAlign?: 'left' | 'right';
  listIcon?: ReactNode;
  placeholder?: string;
};

const InputSelect = ({
  label,
  id,
  error,
  icon,
  listIcon,
  dropdownOptions,
  onChange,
  className = '',
  textAlign = 'left',
  placeholder = '운동 이름을 입력해주세요.',
  readOnly,
  ...props
}: InputSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
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
  }, [isOpen]);

  useEffect(() => {
    if (!dropdownOptions || dropdownOptions.length === 0) {
      setIsOpen(false);
    }
  }, [dropdownOptions]);

  const handleOptionSelect = (value: string, id?: string | number) => {
    setInputValue(value);
    setIsOpen(false);
    if (onChange) {
      const event = {
        target: { value, id: id || value },
      } as React.ChangeEvent<HTMLInputElement> & { target: { id: string | number } };
      onChange(event);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const toggleDropdown = () => {
    if (dropdownOptions && dropdownOptions.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={inputId} className={`text-white/70 pl-1 pb-1 text-[12px] ${isOpen ? 'z-20' : ''}`}>
          <span>{label}</span>
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <div className="relative flex items-center">
          <input
            type="text"
            id={inputId}
            className={`w-full bg-transparent rounded-lg text-white placeholder-white/40 
              bg-input-gradient backdrop-blur-[10px] focus:outline-none transition border-b-2 pr-10 py-3
              ${isOpen ? 'z-20' : ''}
              ${error ? 'border-error-gradient' : 'border-gradient'} 
              ${className}
              ${icon ? 'pl-11' : 'pl-3'} 
              ${textAlign === 'left' ? 'text-left' : 'text-right'}
              ${readOnly ? 'cursor-pointer' : ''}`}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            readOnly={readOnly}
            onClick={readOnly ? toggleDropdown : undefined}
            {...props}
          />
          {icon && (
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-xl ${isOpen ? 'z-20' : ''}`}>
              {icon}
            </div>
          )}
          <button
            type="button"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 
              flex flex-col justify-center items-center ${isOpen ? 'z-20' : ''}
              p-[2px] gap-[10px] rounded-[4px] 
              transition-all duration-300 ease-in-out
              ${isOpen ? 'bg-primary-10 rotate-180' : 'bg-[rgba(255,255,255,0.05)]'}`}
            onClick={toggleDropdown}
            disabled={!dropdownOptions || dropdownOptions.length === 0}
          >
            <ArrowDropDown isActive={isOpen} />
          </button>
        </div>
        {isOpen && dropdownOptions && dropdownOptions.length > 0 && (
          <>
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-10" onClick={() => setIsOpen(false)} />
            <ul className="absolute left-0 flex flex-col gap-3 w-full mt-1 p-1.5 bg-white/10 backdrop-blur-[20px] rounded-lg border-2 border-primary-50 shadow-lg z-20 overflow-hidden">
              {dropdownOptions.map((option, index) => (
                <li
                  key={index}
                  className={`relative w-full rounded-md bg-transparent p-[6px]
                  hover:bg-primary-10 hover:text-primary-100 cursor-pointer transition
                  ${icon ? 'pl-9' : ''} 
                  ${textAlign === 'left' ? 'text-left' : 'text-right pr-8'}
                  ${inputValue === option.value ? 'bg-primary-20 text-primary-100' : 'text-white/50'}`}
                  onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                    handleOptionSelect(option.value, option.id);
                    if (option.onClick) {
                      option.onClick(e);
                    }
                  }}
                >
                  {option.icon && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40 text-xl">{option.icon}</div>
                  )}
                  {option.value}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputSelect;

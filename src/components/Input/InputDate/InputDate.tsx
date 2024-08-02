'use client';

import ArrowDropDown from '@/icons/ArrowDropDown';
import Calendar from '@/icons/Calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ComponentProps, useEffect, useId, useRef, useState } from 'react';
import { BaseInputProps } from '../Input';
import InputCalendar from './InputCalendar';

export type InputDateProps = Omit<BaseInputProps & ComponentProps<'input'>, 'inputType' | 'onChange'> & {
  onChange?: (date: Date) => void;
  value?: string | number | Date | null;
};

const InputDate = ({ label, id, error, onChange, className = '', value, ...props }: InputDateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const dateInputRef = useRef<HTMLDivElement>(null);
  const inputUid = useId();
  const inputId = id || inputUid;
  dayjs.locale('ko');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateInputRef.current && !dateInputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-1.5 [&+&]:mt-4">
      {label && (
        <label htmlFor={inputId} className="text-white/70 pl-1 pb-1 text-[12px] z-20">
          <span>{label}</span>
        </label>
      )}
      <div className="relative" ref={dateInputRef}>
        <div className="relative flex items-center">
          <input
            type="text"
            id={inputId}
            className={`w-full bg-transparent rounded-lg text-right text-[14px] font-medium 
              bg-input-gradient backdrop-blur-[10px] focus:outline-none transition z-[15] pr-10 py-[14px] pl-11
              border-b-2 
              ${isOpen ? 'text-white' : 'text-whiteT-50 '}
              ${error ? 'border-error-gradient' : 'border-gradient'} 
              ${className}
              `}
            value={
              selectedDate ? dayjs(selectedDate).format('YYYY. MM. DD (ddd)') : dayjs().format('YYYY. MM. DD (ddd)')
            }
            readOnly
            {...props}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-[16] text-white/40 text-xl">
            <Calendar />
          </div>
          <button
            type="button"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 
              flex flex-col justify-center items-center z-[16]
              p-[2px] gap-[10px] rounded-[4px] 
              transition-all duration-300 ease-in-out
              ${isOpen ? 'bg-primary-10 rotate-180' : 'bg-[rgba(255,255,255,0.05)]'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ArrowDropDown isActive={isOpen} />
          </button>
        </div>
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute left-0 w-full mt-1 bg-white/10 backdrop-blur-[20px] rounded-lg border-2 border-primary-50 shadow-lg z-20 overflow-hidden">
              <InputCalendar onSelectDate={handleDateSelect} selectedDate={selectedDate || new Date()} />
            </div>
          </>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputDate;

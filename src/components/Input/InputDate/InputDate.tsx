'use client';

import ArrowDropDown from '@/icons/ArrowDropDown';
import Calendar from '@/icons/Calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ComponentProps, useEffect, useId, useRef, useState } from 'react';
import { BaseInputProps } from '../Input';
import InputCalendar from './InputCalendar';

export type InputDateProps = Omit<BaseInputProps & ComponentProps<'input'>, 'inputType' | 'onChange' | 'value'> & {
  onChange?: (date: Date) => void;
  value?: Date | null;
  position?: 'right' | 'left';
  showMonth?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
};

const parseDate = (dateString: string) => {
  const [datePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  return new Date(year, month - 1, day);
};
const InputDate = ({
  label,
  id,
  error,
  onChange,
  className = '',
  value,
  position = 'right',
  showMonth = true,
  minDate,
  maxDate,
  ...props
}: InputDateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    if (typeof value === 'string') {
      return parseDate(value);
    } else if (value instanceof Date) {
      return value;
    } else {
      return new Date();
    }
  });
  const dateInputRef = useRef<HTMLDivElement>(null);
  const inputUid = useId();
  const inputId = id || inputUid;
  dayjs.locale('ko');

  const min = minDate ? (typeof minDate === 'string' ? new Date(minDate) : minDate) : undefined;
  const max = maxDate ? (typeof maxDate === 'string' ? new Date(maxDate) : maxDate) : undefined;

  const formatDate = (date: Date) => {
    return showMonth ? dayjs(date).format('MM. DD (ddd)') : dayjs(date).format('YYYY. MM. DD (ddd)');
  };
  useEffect(() => {
    if (typeof value === 'string') {
      setSelectedDate(parseDate(value));
    } else if (value instanceof Date) {
      setSelectedDate(value);
    }
  }, [value]);

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
    if ((min && date < min) || (max && date > max)) {
      console.log('선택 불가능한 날짜입니다.');
      return;
    }
    setSelectedDate(date);
    setIsOpen(false);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-1.5">
      {label && (
        <label htmlFor={inputId} className={`text-white/70 pl-1 pb-1 text-[12px] ${isOpen ? 'z-20' : ''}`}>
          <span>{label}</span>
        </label>
      )}
      <div className="relative" ref={dateInputRef}>
        <div className="relative flex items-center">
          <input
            type="text"
            id={inputId}
            className={`w-full bg-transparent rounded-lg text-right text-[15px] font-medium
              bg-input-gradient backdrop-blur-[10px] focus:outline-none transition  pr-10 py-[14px] pl-11
              border-b-2
              ${isOpen ? 'z-20' : ''}
              ${isOpen ? 'text-white' : 'text-whiteT-50 '}
              ${error ? 'border-error-gradient' : 'border-gradient'} 
              ${className}
              `}
            value={selectedDate ? formatDate(selectedDate) : formatDate(new Date())}
            readOnly
            {...props}
          />
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-xl ${isOpen ? 'z-20' : ''}`}>
            <Calendar />
          </div>
          <button
            type="button"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 
              flex flex-col justify-center items-center 
              p-[2px] gap-[10px] rounded-[4px] 
              transition-all duration-300 ease-in-out
              ${isOpen ? 'bg-primary-10 rotate-180 z-20' : 'bg-[rgba(255,255,255,0.05)]'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ArrowDropDown isActive={isOpen} />
          </button>
        </div>
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-10" onClick={() => setIsOpen(false)} />
            <div
              className={`absolute w-[320px] mt-1 bg-white/10 backdrop-blur-[20px] rounded-lg border-2 border-primary-50 shadow-lg z-20 overflow-hidden ${
                position === 'left' ? 'left-0' : 'right-0'
              }`}
            >
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

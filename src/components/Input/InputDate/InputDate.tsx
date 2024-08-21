'use client';

import ArrowDropDown from '@/icons/ArrowDropDown';
import Calendar from '@/icons/Calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
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
  textAlign?: 'left' | 'right';
};

const parseDate = (dateString: string) => {
  const [datePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// dayjs 플러그인 설정
dayjs.extend(utc);
dayjs.extend(timezone);

// 한국 로케일 설정
dayjs.locale('ko');

// 한국 시간대 설정
dayjs.tz.setDefault('Asia/Seoul');

const InputDate = ({
  label,
  id,
  error,
  onChange,
  className = '',
  value,
  position = 'right',
  showMonth = false,
  minDate,
  maxDate,
  textAlign = 'left',
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

  const min = minDate ? (typeof minDate === 'string' ? new Date(minDate) : minDate) : undefined;
  const max = maxDate ? (typeof maxDate === 'string' ? new Date(maxDate) : maxDate) : undefined;

  const formatDate = (date: Date) => {
    return showMonth ? dayjs(date).tz().format('MM. DD (ddd)') : dayjs(date).tz().format('YYYY. MM. DD (ddd)');
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
      return;
    }
    const koreanDate = dayjs(date).tz().toDate();
    setSelectedDate(koreanDate);
    setIsOpen(false);
    if (onChange) {
      onChange(koreanDate);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={inputId} className={`text-white/70 pl-1 pb-1 text-sm ${isOpen ? 'z-20' : ''}`}>
          <span>{label}</span>
        </label>
      )}
      <div className="relative" ref={dateInputRef}>
        <div className="relative flex items-center">
          <input
            type="text"
            id={inputId}
            className={`w-full bg-transparent rounded-lg text-[15px] font-medium cursor-pointer
              bg-input-gradient backdrop-blur-[10px] focus:outline-none transition  pr-10 py-[13.5px] pl-11
              hover:border-gradient border-b-2
               ${isOpen ? 'z-20 text-white border-gradient' : 'text-whiteT-50 border-gradient-light'}              
               ${textAlign === 'right' ? 'text-right' : 'text-left'}
              ${className}
              `}
            value={selectedDate ? formatDate(selectedDate) : formatDate(new Date())}
            readOnly
            onClick={() => setIsOpen(!isOpen)}
            {...props}
          />
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-xl ${isOpen ? 'z-20' : ''}`}>
            <Calendar />
          </div>
          <button
            type="button"
            aria-label="dropdown-calender-button"
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

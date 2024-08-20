'use client';

import ChevronLeft from '@/icons/ChevronLeft';
import ChevronRight from '@/icons/ChevronRight';
import { useCallback, useEffect, useState } from 'react';
import 'swiper/css';
import MonthCalendar from './MonthCalendar';

interface InputCalendarProps {
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

const InputCalendar = ({ onSelectDate, selectedDate }: InputCalendarProps) => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState<Date>(() => new Date());

  const [prevMonth, setPrevMonth] = useState<() => void>(() => {});
  const [nextMonth, setNextMonth] = useState<() => void>(() => {});

  const handleDateSelect = (date: Date) => {
    onSelectDate(date);
  };

  const getMonthYear = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
  };

  const handlePrevMonth = () => {
    prevMonth();
  };

  const handleNextMonth = () => {
    nextMonth();
  };

  const handleSetPrevMonth = useCallback((callback: () => void) => {
    setPrevMonth(() => callback);
  }, []);

  const handleSetNextMonth = useCallback((callback: () => void) => {
    setNextMonth(() => callback);
  }, []);

  const handleChangeMonth = useCallback((date: Date) => {
    setCurrentDisplayDate(date);
  }, []);

  useEffect(() => {}, [currentDisplayDate]);

  return (
    <div className="w-full p-4">
      <header className="flex gap-2 justify-between ">
        <div className="flex items-center">
          <h2 className="font-medium text-[16px]">{getMonthYear(currentDisplayDate)}</h2>
          {/* TODO 드롭다운 리스트 MVP 이후 추가 */}
          {/* <ChevronRight className="text-primary-100" /> */}
        </div>
        <div className="flex gap-4">
          <ChevronLeft className="text-primary-100 cursor-pointer" onClick={handlePrevMonth} />
          <ChevronRight className="text-primary-100 cursor-pointer" onClick={handleNextMonth} />
        </div>
      </header>

      <MonthCalendar
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
        onChangeMonth={handleChangeMonth}
        onPrevMonth={handleSetPrevMonth}
        onNextMonth={handleSetNextMonth}
      />
    </div>
  );
};

export default InputCalendar;

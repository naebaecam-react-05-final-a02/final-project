'use client';

import Input from '@/components/Input';
import { format, isAfter, subDays } from 'date-fns';
import { useState } from 'react';

type FormCalendarType = {
  s?: Date;
  e?: Date;
};

const FormCalendar = ({ s, e }: FormCalendarType) => {
  const today = new Date();
  const [start, setStart] = useState<Date>(s ?? today);
  const [end, setEnd] = useState<Date>(e ?? today);

  const handleStartDateChange = (newDate: Date) => {
    setStart(newDate);
    if (isAfter(newDate, end)) {
      setEnd(newDate);
    }
  };

  return (
    <div className="flex flex-col gap-y-1 w-full select-none">
      <label className="text-white/70 pl-1 text-[12px]" htmlFor="startDate">
        날짜 선택
      </label>
      <div className="flex gap-x-2 h-12 w-full items-center justify-center">
        <Input
          inputType="date"
          position="left"
          showMonth
          minDate={subDays(today, 1)}
          value={new Date(start)}
          onChange={(newDate: Date) => handleStartDateChange(newDate)}
        />
        <input
          className="hidden"
          type="date"
          name="startDate"
          value={format(start, 'yyyy-MM-dd')}
          onChange={() => {}}
        />
        <span className="text-white/70 flex items-center">~</span>
        <Input
          inputType="date"
          position="right"
          minDate={start}
          showMonth
          value={new Date(end)}
          onChange={(newDate: Date) => setEnd(newDate)}
        />
        <input className="hidden" type="date" name="endDate" value={format(end, 'yyyy-MM-dd')} onChange={() => {}} />
      </div>
    </div>
  );
};

export default FormCalendar;

'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';

type FormCalendarType = {
  s?: string;
  e?: string;
};

const FormCalendar = ({ s, e }: FormCalendarType) => {
  const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);
  const [start, setStart] = useState<string>(s ?? today);
  const [end, setEnd] = useState<string>(e ?? today);

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStart(newStartDate);
    if (newStartDate > end) {
      setEnd(newStartDate);
    }
  };
  return (
    <div className="flex flex-col gap-y-1 w-full select-none">
      <label className="text-white/70 pl-1 text-[12px]" htmlFor="startDate">
        날짜 선택
      </label>
      <div className="flex gap-x-2 h-12 w-full">
        <input
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
          className="
          bg-transparent rounded-lg  text-white/40
          p-3 bg-input-gradient
          placeholder:text-sm focus:outline-none outline-none
          w-40
          focus:border-b-[2px] focus:border-gradient text-sm"
          name="startDate"
          type="date"
          min={today}
          value={start}
          onChange={handleStartDateChange}
        />
        <span className="text-white/70 flex items-center">~</span>
        <input
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
          className="bg-transparent rounded-lg  text-white/40
          p-3 bg-input-gradient
          placeholder:text-sm focus:outline-none outline-none
          w-40
          focus:border-b-[2px] focus:border-gradient text-sm"
          name="endDate"
          type="date"
          min={start}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FormCalendar;

'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';

const FormCalendar = () => {
  const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);
  const [start, setStart] = useState<string>(today);
  const [end, setEnd] = useState<string>(today);

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStart(newStartDate);
    if (newStartDate > end) {
      setEnd(newStartDate);
    }
  };
  return (
    <div className="flex flex-col gap-y-2 w-full select-none">
      <label className="text-xs font-bold" htmlFor="startDate">
        챌린지 기간
      </label>
      <div className="flex gap-x-1">
        <input
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
          className="flex-1 bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
          name="startDate"
          type="date"
          min={start}
          value={start}
          onChange={handleStartDateChange}
        />
        <span>~</span>
        <input
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
          className="flex-1 bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
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

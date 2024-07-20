'use client';

import React, { KeyboardEvent, useId } from 'react';

const FormCalendar = () => {
  const id = useId();
  const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-y-2 w-full select-none">
      <label className="text-xs font-bold" htmlFor="startDate">
        챌린지 기간
      </label>
      <div className="flex gap-x-1">
        <input
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
          className="flex-1 bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
          id={id}
          name="startDate"
          type="date"
          min={today}
          defaultValue={today}
        />
        <span>~</span>
        <input
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
          className="flex-1 bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
          name="endDate"
          type="date"
          min={today}
        />
      </div>
    </div>
  );
};

export default FormCalendar;

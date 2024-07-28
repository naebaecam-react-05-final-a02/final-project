'use client';
import { useState } from 'react';
import Calendar from './_components/Calendar/Calendar';
import DietList from './_components/DietList';

const DietManagePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const date = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;

  const changeDate = (date: number, gap: number = 0) => {
    const newDate = new Date();
    newDate.setDate(date + gap);
    setSelectedDate(newDate);
  };

  return (
    <div className="flex flex-col gap-3">
      <Calendar selectedDate={selectedDate} changeDate={changeDate} />
      <DietList date={date} />
      {/* 수정 폼 */}
      <div></div>
    </div>
  );
};

export default DietManagePage;

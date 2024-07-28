'use client';
import { DateType } from '@/types/date';
import { useState } from 'react';
import Calendar from './_components/Calendar/Calendar';
import DietList from './_components/DietList';

const DietManagePage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<DateType>({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  });

  const date = `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`;

  const changeDate = (newDate: number) => {
    setSelectedDate({ ...selectedDate, date: newDate });
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

'use client';
import { useGetDiets } from '@/hooks/diet/useDiets';
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

  const {
    data: diets,
    isPending,
    isError,
  } = useGetDiets(selectedDate.year + '-' + selectedDate.month + '-' + selectedDate.date);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!!!!</div>;

  const changeDate = (newDate: number) => {
    setSelectedDate({ ...selectedDate, date: newDate });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 달력 */}
      <Calendar selectedDate={selectedDate} changeDate={changeDate} />
      {/* 식단 */}
      <DietList diets={diets} />
      {/* 수정 폼 */}
      <div></div>
    </div>
  );
};

export default DietManagePage;

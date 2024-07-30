'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Week from './_components/Calendar/Week';
import DietList from './_components/DietList';
import DownIcon from '/public/icons/chevron-down.svg';
import LeftIcon from '/public/icons/chevron-left.svg';
import PlusIcon from '/public/icons/plus.svg';

const DietManagePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const date = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;

  const changeDate = (date: number, gap: number = 0) => {
    const newDate = new Date();
    newDate.setDate(date + gap);
    setSelectedDate(newDate);
  };

  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 bg-[url('/bg.svg')] text-white">
      <header className="flex justify-between items-center">
        <button
          className="flex w-10 h-10 justify-center items-center rounded-xl backdrop-blur-[5px] shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_hsla(0, 0%, 100%, 0.1)]"
          onClick={() => {
            router.back();
          }}
        >
          <LeftIcon />
        </button>
        <div className="flex gap-1">
          <h1 className="text-center text-sm font-medium">
            {selectedDate.getFullYear()}월 {selectedDate.getMonth() + 1}월
          </h1>
          <button
            onClick={() => {
              // <Month selectedDate={selectedDate} changeDate={changeDate} />
            }}
          >
            <DownIcon />
          </button>
        </div>
        <button
          className="flex w-10 h-10 justify-center items-center rounded-xl backdrop-blur-[5px] shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_hsla(0, 0%, 100%, 0.1)]"
          onClick={() => {
            router.push('/diets/write');
          }}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </header>
      <Week selectedDate={selectedDate} changeDate={changeDate} />
      <DietList date={date} />
    </div>
  );
};

export default DietManagePage;

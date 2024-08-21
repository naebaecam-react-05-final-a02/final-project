'use client';
import Header from '@/components/Header';
import InputCalendar from '@/components/Input/InputDate/InputCalendar';
import Week from '@/components/Week';
import Mobile from '@/layouts/Mobile';
import useDateStore from '@/stores/date.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ExerciseList from './_components/ExerciseList';
import DownIcon from '/public/icons/chevron-down.svg';
import PlusIcon from '/public/icons/plus.svg';

const ExercisePage = () => {
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const selectedDate = useDateStore((store) => store.date);
  const setSelectedDate = useDateStore((store) => store.setDate);

  const handleAddButtonClick = () => {
    router.push('/exercises/record');
  };

  const handleDownButtonClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <Mobile
      headerLayout={
        <Header
          title={`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월`}
          icon={<PlusIcon className="w-6 h-6" onClick={handleAddButtonClick} />}
          titleIcon={
            <DownIcon
              aria-label="dropdown-button"
              className={`transition-transform ${isCalendarOpen && 'rotate-180'}`}
              onClick={handleDownButtonClick}
            />
          }
        />
      }
    >
      {isCalendarOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 z-10" onClick={() => setIsCalendarOpen(false)} />
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[280px] mt-1 bg-white/10 backdrop-blur-[20px] rounded-lg border-2 border-primary-50 shadow-lg z-20 overflow-hidden`}
          >
            <InputCalendar selectedDate={selectedDate} onSelectDate={handleDateSelected} />
          </div>
        </>
      )}
      <div className="flex flex-col gap-2 -mt-4">
        <div className="sticky -top-4 z-10 bg-blackT-10 py-2 rounded-b-2xl backdrop-blur-lg">
          <Week />
        </div>
        <ExerciseList />
      </div>
    </Mobile>
  );
};

export default ExercisePage;

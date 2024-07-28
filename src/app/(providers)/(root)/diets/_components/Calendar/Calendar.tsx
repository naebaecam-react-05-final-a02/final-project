import { DateType } from '@/types/date';
import { useState } from 'react';
import Month from './Month';
import Week from './Week';

interface CalendarProps {
  selectedDate: DateType;
  changeDate: (newDate: number) => void;
}
const Calendar = ({ selectedDate, changeDate }: CalendarProps) => {
  const [isOpen, setIsOpen] = useState(false); // open: 월 단위 | close: 주 단위

  const toggleView = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="bg-stone-200 px-2 py-1 hover:brightness-95" onClick={toggleView}>
        {isOpen ? '주별로 보기' : '월별로 보기'}
      </button>
      <div className="mt-3">
        <div className="text-center my-2">
          {selectedDate.year}년 {selectedDate.month}월
        </div>
        {isOpen ? (
          <Month selectedDate={selectedDate} changeDate={changeDate} />
        ) : (
          <Week selectedDate={selectedDate} changeDate={changeDate} />
        )}
      </div>
    </div>
  );
};

export default Calendar;

import InputCalendar from '@/components/Input/InputDate/InputCalendar';
import ModalPortalLayout from '@/components/ModalPortal/ModalPortalLayout';
import { addDays, format, subDays } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

interface CalendarControllerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}
const CalendarController = ({ date, setDate }: CalendarControllerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [position, setPosition] = useState<number>(0);

  const handleCalendar = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition(e.clientY);
    setIsCalendarOpen((prev) => !prev);
  };

  const handleNextDay = () => {
    setDate((prev) => addDays(prev, 1));
  };

  const handlePrevDay = () => {
    setDate((prev) => subDays(prev, 1));
  };

  const handleDateSelected = (date: Date) => {
    setDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className="relative text-xs flex items-center gap-x-1">
      <div className="text-base cursor-pointer" onClick={handlePrevDay}>
        <IoMdArrowDropleft color="white" />
      </div>

      <div onClick={(e) => handleCalendar(e)} className="cursor-pointer w-8 text-center text-white">
        {format(date, 'M/dd')}
      </div>
      {isCalendarOpen && (
        <ModalPortalLayout onClose={() => setIsCalendarOpen(false)}>
          <div
            className={`absolute w-[280px] left-1/2 -translate-x-1/2 top-[45%] text-white mt-1 bg-white/10 backdrop-blur-[20px] rounded-lg border-2 border-primary-50 shadow-lg z-20 overflow-hidden`}
          >
            <InputCalendar selectedDate={date} onSelectDate={handleDateSelected} />
          </div>
        </ModalPortalLayout>
      )}

      <div className="text-base cursor-pointer" onClick={handleNextDay}>
        <IoMdArrowDropright color="white" />
      </div>
    </div>
  );
};

export default CalendarController;

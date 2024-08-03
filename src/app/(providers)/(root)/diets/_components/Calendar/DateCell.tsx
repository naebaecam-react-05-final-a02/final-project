import { ComponentProps, PropsWithChildren } from 'react';

interface DayProps {
  isToday?: boolean;
}

const DateCell = ({ isToday, children: date, ...props }: ComponentProps<'td'> & PropsWithChildren<DayProps>) => {
  return (
    <div className={`w-full py-4 text-center ${isToday && 'bg-[#FFFFFF4D] rounded-b-full'}`} {...props}>
      {date}
    </div>
  );
};

export default DateCell;

import { ComponentProps, PropsWithChildren } from 'react';

interface DayProps {
  isToday?: boolean;
}

const DateCell = ({ isToday, children: date, ...props }: ComponentProps<'td'> & PropsWithChildren<DayProps>) => {
  return (
    <div className={`w-full py-4 text-center rounded-b-full ${isToday && 'text-primary-100'}`} {...props}>
      {date}
    </div>
  );
};

export default DateCell;

import { ComponentProps, PropsWithChildren } from 'react';

interface DayProps {
  isToday: boolean;
}

const DateCell = ({ isToday, children: date, ...props }: ComponentProps<'td'> & PropsWithChildren<DayProps>) => {
  return (
    <td className={`text-center ${isToday ? 'bg-[#3ecf8e66]' : 'bg-white'} hover:brightness-90`} {...props}>
      {date}
    </td>
  );
};

export default DateCell;

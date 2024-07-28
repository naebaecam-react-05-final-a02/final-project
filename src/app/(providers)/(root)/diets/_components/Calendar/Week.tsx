import { DateType } from '@/types/date';
import DateCell from './DateCell';

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
const weekIterateArray: number[] = [-3, -2, -1, 0, 1, 2, 3];

interface WeekProps {
  selectedDate: DateType;
  changeDate: (newDate: number) => void;
}

const Week = ({ selectedDate, changeDate }: WeekProps) => {
  const today = new Date();
  const date = today.getDate();
  const day = today.getDay();

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          {weekIterateArray.map((i) => {
            const dayName = dayNames[(day + i + 7) % 7];
            return <th key={dayName}>{dayName}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {weekIterateArray.map((i) => (
            <DateCell key={`date-${date + i}`} isToday={i === 0} onClick={() => changeDate(selectedDate.date + i)}>
              {selectedDate.date + i}
            </DateCell>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Week;

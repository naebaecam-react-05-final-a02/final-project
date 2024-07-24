import { DateType } from '@/types/date';
import DateCell from './DateCell';

interface MonthProps {
  selectedDate: DateType;
  changeDate: (newDate: number) => void;
}
const Month = ({ selectedDate, changeDate }: MonthProps) => {
  const firstDay = new Date(Date.UTC(selectedDate.year, selectedDate.month - 1, 1)).getDay();
  const lastDate = new Date(Date.UTC(selectedDate.year, selectedDate.month, 0)).getDate();

  const weeks = [];
  let dates = [];

  for (let i = 0; i < firstDay; i++) {
    dates.push(<td key={`empty-${i}`}></td>);
  }

  for (let day = 1; day <= lastDate; day++) {
    dates.push(
      <DateCell isToday={selectedDate.date === day} onClick={() => changeDate(day)}>
        {day}
      </DateCell>,
    );
    if (dates.length === 7) {
      weeks.push(<tr key={`week-${weeks.length}`}>{dates}</tr>);
      dates = [];
    }
  }
  if (dates.length !== 0) {
    weeks.push(<tr key={`week-${weeks.length}`}>{dates}</tr>);
  }

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody>{weeks}</tbody>
    </table>
  );
};

export default Month;

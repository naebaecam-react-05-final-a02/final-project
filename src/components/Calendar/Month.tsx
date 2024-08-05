import DateCell from './DateCell';

interface MonthProps {
  selectedDate: Date;
  changeDate: (newDate: number) => void;
}
const Month = ({ selectedDate, changeDate }: MonthProps) => {
  const firstDay = getFirstDate(selectedDate).getDay();
  const lastDate = getLastDate(selectedDate).getDate();

  const weeks = [];
  let dates = [];

  for (let i = 0; i < firstDay; i++) {
    dates.push(<td key={`empty-${i}`}></td>);
  }

  for (let date = 1; date <= lastDate; date++) {
    dates.push(
      <DateCell isToday={selectedDate.getDate() === date} onClick={() => changeDate(date)}>
        {date}
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

const getFirstDate = (date: Date) => {
  const firstDate = new Date(date);
  firstDate.setDate(1);
  return firstDate;
};

const getLastDate = (date: Date) => {
  const lastDate = new Date(date);
  lastDate.setDate(0);
  return lastDate;
};

export default Month;

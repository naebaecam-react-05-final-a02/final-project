import DateCell from './DateCell';

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
const weekIterateArray: number[] = [-3, -2, -1, 0, 1, 2, 3];

interface WeekProps {
  selectedDate: Date;
  changeDate: (date: number, gap: number) => void;
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
          {weekIterateArray.map((gap) => (
            <DateCell
              key={`date-${date + gap}`}
              isToday={gap === 0}
              onClick={() => changeDate(selectedDate.getDate(), gap)}
            >
              {getCalculatedDate(selectedDate, gap)}
            </DateCell>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const getCalculatedDate = (selectedDate: Date, gap: number) => {
  const calDate = new Date(selectedDate);
  calDate.setDate(selectedDate.getDate() + gap);
  return calDate.getDate();
};

export default Week;

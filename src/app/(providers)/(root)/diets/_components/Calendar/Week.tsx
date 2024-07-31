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
    <div className="w-full grid grid-cols-7 justify-items-center">
      {weekIterateArray.map((gap) => {
        const calcDate = new Date(selectedDate);
        calcDate.setDate(selectedDate.getDate() + gap);
        return (
          <div
            key={`date-${date + gap}`}
            className={`w-full flex flex-col justify-between items-center ${
              gap === 0 && 'bg-[#FFFFFF0D] rounded-full'
            }`}
          >
            <div className="w-full text-center pt-4 text-[#FFFFFF4D] text-xs">{dayNames[calcDate.getDay()]}</div>
            <DateCell onClick={() => changeDate(selectedDate.getDate(), gap)}>{calcDate.getDate()}</DateCell>
          </div>
        );
      })}
    </div>
  );
};

export default Week;

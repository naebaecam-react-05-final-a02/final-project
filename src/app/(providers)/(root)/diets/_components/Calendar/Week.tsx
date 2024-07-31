import useDateStore from '@/stores/date.store';
import { getNextDate } from '@/utils/dateFormatter';
import DateCell from './DateCell';

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
const weekIterateArray: number[] = [-3, -2, -1, 0, 1, 2, 3];

const Week = () => {
  const selectedDate = useDateStore((store) => store.date);
  const setDate = useDateStore((store) => store.setDate);

  return (
    <div className="w-full grid grid-cols-7 justify-items-center">
      {weekIterateArray.map((gap) => {
        const cellDate = getNextDate(selectedDate, gap);
        const date = cellDate.getDate();
        const day = cellDate.getDay();
        return (
          <div
            key={`date-${date}`}
            className={`w-full flex flex-col justify-between items-center ${
              gap === 0 && 'bg-[#FFFFFF0D] rounded-full'
            }`}
          >
            <div className="w-full text-center pt-4 text-[#FFFFFF4D] text-xs">{dayNames[day]}</div>
            <DateCell onClick={() => setDate(getNextDate(selectedDate, gap))}>{date}</DateCell>
          </div>
        );
      })}
    </div>
  );
};

export default Week;

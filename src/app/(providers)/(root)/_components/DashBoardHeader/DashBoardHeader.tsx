'use client';

import { addDays, format, subDays } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';

type DashBoardHeaderType = {
  date: Date;
  setState: Dispatch<SetStateAction<Date>>;
};

const DashBoardHeader = ({ date, setState }: DashBoardHeaderType) => {
  const handleNextDay = () => {
    setState((prev) => addDays(prev, 1));
  };

  const handlePrevDay = () => {
    setState((prev) => subDays(prev, 1));
  };

  return (
    <div className="relative flex text-white items-center justify-between w-full">
      <div className="text-xs flex items-center gap-x-1">
        <div className="text-base cursor-pointer" onClick={handlePrevDay}>
          <IoMdArrowDropleft />
        </div>

        <div className="cursor-pointer w-6 text-center">{format(date, 'M/d')}</div>

        <div className="text-base cursor-pointer" onClick={handleNextDay}>
          <IoMdArrowDropright />
        </div>
      </div>

      <div className="absolute opacity-50 text-base left-1/2 transform -translate-x-1/2">투두</div>

      <div className="cursor-pointer text-xl">
        <IoCreateOutline />
      </div>
    </div>
  );
};

export default DashBoardHeader;

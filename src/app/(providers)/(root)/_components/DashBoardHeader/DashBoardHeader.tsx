'use client';

import { addDays, format, subDays } from 'date-fns';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { FaListUl } from 'react-icons/fa6';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
type DashBoardHeaderType = {
  date: Date;
  setState: Dispatch<SetStateAction<Date>>;
  url: string;
  title: string;
};

const DashBoardHeader = ({ date, setState, url, title }: DashBoardHeaderType) => {
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
      <div className="absolute opacity-50 text-base left-1/2 transform -translate-x-1/2">{title}</div>

      <div className="cursor-pointer text-xl opacity-70">
        <Link href={url}>
          {/* <IoCreateOutline /> */}
          <FaListUl className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default DashBoardHeader;

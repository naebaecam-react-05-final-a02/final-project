'use client';

import { useId, useState } from 'react';

const ExerciseTodoItem = () => {
  const id = useId();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <div className="select-none bg-gradient-to-r from-[#292436] via-[#2e6e56] p-[2px] pt-0">
      <div className="flex gap-x-4 items-center size-full bg-[#292436]">
        <div className="size-10 rounded-md bg-[#252b30] p-[2px] relative">
          <label
            htmlFor={id}
            className={`border-2 border-[#36bd73] rounded-md size-full flex items-center justify-center ${
              isChecked ? 'bg-[#23dd74]' : 'bg-[#292436]'
            }`}
          >
            {isChecked && <p className="text-white text-3xl">{'✔'}</p>}
            <input type="checkbox" id={id} className="hidden" onChange={() => setIsChecked((prev) => !prev)} />
          </label>
        </div>
        <div className="flex-1">
          <div className="text-[#c9c6cb]">웜업 스트레칭</div>
          <div className="text-[#585363]">15분</div>
        </div>
        <div className="text-[#7d7984]">{'->'}</div>
      </div>
    </div>
  );
};

export default ExerciseTodoItem;

'use client';

import { useId, useState } from 'react';

const ExerciseTodoItem = () => {
  const id = useId();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <div className="select-none bg-gradient-to-r from-[#292436] via-[#2e6e56] p-[2px] pt-0">
      <div className="flex items-center size-full bg-[#292436]">
        <label className="flex flex-1 gap-x-4 items-center" htmlFor={id}>
          <div className="size-8 rounded-md bg-[#252b30] p-[2px] relative">
            <div
              className={`border-2 border-[#36bd73] rounded-md size-full flex items-center justify-center ${
                isChecked ? 'bg-[#23dd74]' : 'bg-[#292436]'
              }`}
            >
              {isChecked && <p className="text-white text-lg">{'✔'}</p>}
              <input type="checkbox" id={id} className="hidden" onChange={() => setIsChecked((prev) => !prev)} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[#c9c6cb]">웜업 스트레칭</div>
            <div className="text-[#585363]">15분</div>
          </div>
        </label>
        <div className="text-[#7d7984]">{'->'}</div>
      </div>
    </div>
  );
};

export default ExerciseTodoItem;

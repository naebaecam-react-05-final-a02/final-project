'use client';

import { Tables } from '@/types/supabase';
import { useId, useState } from 'react';

//TODO type에 따라 무,유산소 나뉘고 name이 운동이름인지? 알아낸다음 작업해야함..
const ExerciseTodoItem = ({ exercise }: { exercise: Tables<'exercises'> }) => {
  const id = useId();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  console.log('EXERCISE', exercise);

  let str = '';
  // if (exercise.sets) str += `${exercise.sets}세트 `;
  // if (exercise.weight) str += `${exercise.weight}kg `;
  // if (exercise.reps) str += `${exercise.reps}회 `;
  // if (exercise.duration) str += `${exercise.duration}분`;

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
            <div className="text-[#c9c6cb]">{exercise.exeriseType}</div>
            <div className="text-[#585363]">{str}</div>
          </div>
        </label>
        <div className="text-[#7d7984]">{'->'}</div>
      </div>
    </div>
  );
};

export default ExerciseTodoItem;

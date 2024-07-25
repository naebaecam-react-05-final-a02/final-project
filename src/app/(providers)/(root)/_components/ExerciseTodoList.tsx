'use client';

import ExerciseTodoItem from './ExerciseTodoItem';

const ExerciseTodoList = () => {
  return (
    <div className="size-full">
      <div>헤더헤더</div>
      <ul className="size-full bg-[#292436] p-4 grid gap-y-5">
        {Array.from({ length: 3 }, () => '0').map((_, i) => (
          <li key={i}>
            <ExerciseTodoItem />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseTodoList;

'use client';

import ExerciseTodoItem from './ExerciseTodoItem';

const ExerciseTodoList = () => {
  return (
    <div className="size-full bg-[#292436]">
      <h6 className="text-white flex justify-between px-2">
        <div className="text-sm">{`< 7/27 >`}</div>
        <div className="flex-1 flex justify-center">Todo</div>
        <div>???</div>
      </h6>
      <ul className="size-full p-4 grid gap-y-5">
        {Array.from({ length: 5 }, () => '0').map((_, i) => (
          <li key={i}>
            <ExerciseTodoItem />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseTodoList;

import { Tables } from '@/types/supabase';
import ExerciseTodoItem from './ExerciseTodoItem';

//TODO 투두 달력으로 선택할수있어야함?
const ExerciseTodoList = async ({ exercises }: { exercises: Tables<'exercises'>[] }) => {
  return (
    <div className="size-full min-h-[140px] bg-[#292436]">
      <h6 className="text-white flex items-center px-2 relative justify-between">
        <div className="text-sm">{'< 7/27 >'}</div>
        <div>작성</div>
        <div className="absolute left-1/2 transform -translate-x-1/2">Todo</div>
      </h6>
      {!exercises.length && <div className="text-white text-center mt-10">오늘은 에어컨 켜고 이불덮고 쉬어야겠지?</div>}
      {exercises.length > 0 && (
        <ul className="size-full p-4 grid gap-y-5">
          {exercises.map((exercise, i) => (
            <li key={i}>
              <ExerciseTodoItem exercise={exercise} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExerciseTodoList;

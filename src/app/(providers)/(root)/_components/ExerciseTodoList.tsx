import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import { getEndOfDayISO, getStartOfDayISO } from '@/utils/dateFormatter';
import ExerciseTodoItem from './ExerciseTodoItem';

const getExerciseTodoData = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const response = await supabase
    .from('exercises')
    .select('*')
    .eq('userId', user?.id)
    .gte('date', getStartOfDayISO())
    .lte('date', getEndOfDayISO())
    .order('date');

  return response.data;
};
const ExerciseTodoList = async ({ exercises }: { exercises: Tables<'exercises'>[] }) => {
  return (
    <div className="size-full bg-[#292436]">
      <h6 className="text-white flex items-center px-2 relative justify-between">
        <div className="text-sm">{'< 7/27 >'}</div>
        <div>작성</div>
        <div className="absolute left-1/2 transform -translate-x-1/2">Todo</div>
      </h6>
      <ul className="size-full p-4 grid gap-y-5">
        {exercises.map((exercise, i) => (
          <li key={i}>
            <ExerciseTodoItem exercise={exercise} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseTodoList;

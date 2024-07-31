'use client';
import { useGetUser } from '@/hooks/auth/useUsers';
import { getExercises } from '@/hooks/dashboard/useDashBoard';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import DashBoardHeader from './DashBoardHeader';
import ExerciseTodoItem from './ExerciseTodoItem';

const ExerciseTodoList = () => {
  const supabase = createClient();
  const [date, setDate] = useState<Date>(new Date());
  const { data: user } = useGetUser();
  const { data: exercises, isFetching } = useQuery({
    queryKey: ['exercises', { date: format(date, 'yyyy-MM-dd') }],
    queryFn: async () => getExercises(supabase, date),
    enabled: !!user,
  });

  if (!exercises || isFetching) {
    return (
      <>
        <DashBoardHeader date={date} setState={setDate} />
        <div className="text-white text-center w-full mt-6">{`${format(date, 'M')}월 ${format(
          date,
          'd',
        )}일 데이터를 로딩 중입니다.`}</div>
      </>
    );
  }

  if (exercises.error) {
    return (
      <>
        <DashBoardHeader date={date} setState={setDate} />
        <div className="text-white text-center w-full mt-6">
          <div>{`${format(date, 'M')}월 ${format(date, 'd')}일 데이터를 가져오지 못했습니다...`}</div>
          <div className="text-xs text-red-300">{exercises.details}</div>
        </div>
      </>
    );
  }

  if (!exercises.data || !exercises.data.length) {
    return (
      <>
        <DashBoardHeader date={date} setState={setDate} />
        <div className="text-white text-center w-full mt-6">{`${format(date, 'M')}월 ${format(
          date,
          'd',
        )}일에는 등록된 운동이 없습니다.`}</div>
      </>
    );
  }

  return (
    <>
      <DashBoardHeader date={date} setState={setDate} />
      <ul className="size-full p-4 grid gap-y-5">
        {exercises.data.map((exercise, i) => (
          <li key={i}>
            <ExerciseTodoItem exercise={exercise} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExerciseTodoList;

'use client';
import { useGetUser } from '@/hooks/auth/useUsers';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import api from '@/service/service';
import { createClient } from '@/supabase/client';
import { getFormattedDate } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import DashBoardHeader from '../DashBoardHeader';
import ExerciseTodoItem from '../ExerciseTodoItem';

const ExerciseTodoList = () => {
  const supabase = createClient();
  const [date, setDate] = useState<Date>(new Date());
  const { data: user } = useGetUser();
  const { data: exercises } = useQuery({
    queryKey: ExercisesQueryKeys.detail(getFormattedDate(date)),
    queryFn: () => api.dashboard.getExercises(supabase, date),
    enabled: !!user,
  });

  if (!exercises) {
    return (
      <>
        <DashBoardHeader date={date} setState={setDate} url={'/exercises'} title={'투두'} />
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
        <DashBoardHeader date={date} setState={setDate} url={'/exercises'} title={'투두'} />
        <div className="text-white text-center w-full mt-6">
          <div>{`${format(date, 'M')}월 ${format(date, 'd')}일 데이터를 가져오지 못했습니다...`}</div>
          {exercises.details && <p className="text-xs text-red-300">상세 정보:{exercises.details}</p>}
        </div>
      </>
    );
  }

  if (!exercises.data || !exercises.data.length) {
    return (
      <>
        <DashBoardHeader date={date} setState={setDate} url={'/exercises'} title={'투두'} />
        <div className="text-white text-center w-full mt-6">{`${format(date, 'M')}월 ${format(
          date,
          'd',
        )}일에는 등록된 운동이 없습니다.`}</div>
      </>
    );
  }

  return (
    <>
      <DashBoardHeader date={date} setState={setDate} url={'/exercises'} title={'투두'} />
      <ul className="size-full grid gap-y-5">
        {exercises.data.slice(0, 5).map((exercise) => (
          <li key={exercise.id}>
            <ExerciseTodoItem exercise={exercise} date={date} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExerciseTodoList;

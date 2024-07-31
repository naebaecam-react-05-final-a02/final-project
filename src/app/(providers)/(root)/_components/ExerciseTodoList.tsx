'use client';
import Card from '@/components/Card';
import { useGetUser } from '@/hooks/auth/useUsers';
import { getExercises } from '@/hooks/dashboard/useDashBoard';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { addDays, format, subDays } from 'date-fns';
import { useState } from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import ExerciseTodoItem from './ExerciseTodoItem';

const ExerciseTodoList = () => {
  const supabase = createClient();
  const [date, setDate] = useState<Date>(new Date());
  const { data: user } = useGetUser();
  const { data: exercises } = useQuery({
    queryKey: ['exercises', { date: format(date, 'yyyy-MM-dd') }],
    queryFn: async () => getExercises(supabase, date),
    enabled: !!user,
  });

  if (!exercises) {
    return <div className="text-white text-center mt-10">로딩 중...</div>;
  }

  // 에러 처리
  if (exercises.error) {
    return <div className="text-white text-center mt-10">데이터를 불러오지 못했습니다.</div>;
  }
  const handleNextDay = () => {
    setDate((prev) => addDays(prev, 1));
  };

  const handlePrevDay = () => {
    setDate((prev) => subDays(prev, 1));
  };
  // 데이터가 없는 경우
  if (!exercises.data || exercises.data.length === 0) {
    return (
      <Card className="size-full min-h-[140px] bg-[#292436] select-none">
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

          <div className="absolute opacity-50 text-base left-1/2 transform -translate-x-1/2">투두</div>

          <div className="cursor-pointer text-xl">
            <IoCreateOutline />
          </div>
        </div>
        <div className="text-white text-center mt-10">오늘은 에어컨 켜고 이불 덮고 쉬어야겠지?</div>
      </Card>
    );
  }

  return (
    <div className="size-full min-h-[140px] bg-[#292436]">
      <h6 className="text-white flex items-center px-2 relative justify-between">
        <div className="text-sm">{'< 7/27 >'}</div>
        <div>작성</div>
        <div className="absolute left-1/2 transform -translate-x-1/2">Todo</div>
      </h6>
      {!exercises.data!.length && (
        <div className="text-white text-center mt-10">오늘은 에어컨 켜고 이불덮고 쉬어야겠지?</div>
      )}
      {exercises && exercises.data.length > 0 && (
        <ul className="size-full p-4 grid gap-y-5">
          {exercises.data!.map((exercise, i) => (
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

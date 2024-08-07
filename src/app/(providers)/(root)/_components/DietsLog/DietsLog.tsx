'use client';
import Chip from '@/components/Chip';
import { useGetUser } from '@/hooks/auth/useUsers';
import api from '@/service/service';
import { createClient } from '@/supabase/client';
import { getDietsCalories, getFoods } from '@/utils/calculateDiet';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import DashBoardHeader from '../DashBoardHeader';

const DietsLog = () => {
  const supabase = createClient();
  const { data: user } = useGetUser();
  const [date, setDate] = useState<Date>(new Date());

  const { data: diets } = useQuery({
    queryKey: ['diets', { date: format(date, 'yyyy-MM-dd') }],
    queryFn: () => api.dashboard.getDiets(supabase, date),
    enabled: !!user,
  });

  const calories = getDietsCalories(diets?.data);
  const foods = getFoods(diets?.data);

  return (
    <>
      <DashBoardHeader date={date} setState={setDate} url={'/diets'} title={'식단'} />

      <div className="w-full">
        <div className="flex justify-between items-center h-[44px] relative">
          <div className="border-l-4 border-[#03C717]/80 w-1/2 absolute top-0 -left-4 bottom-0 right-0 bg-gradient-to-r from-[#12f287]/10  to-white/0" />
          <p className="font-bold text-sm text-[#12F287]">칼로리</p>
          <div className="flex gap-x-1 items-end">
            <p className="text-white font-bold text-lg">{calories.kcal.toLocaleString()}</p>
            <p className="text-white/30 text-[12px]">Kcal</p>
          </div>
        </div>

        <div className="flex justify-between  items-center h-[44px]">
          <p className="font-bold text-sm text-white/30">탄수화물</p>
          <div className="flex gap-x-1 items-center">
            <p className="text-white font-bold text-lg">{calories.carbohydrate}</p>
            <p className="text-white/30 text-[12px]">g</p>
          </div>
        </div>

        <div className="flex justify-between  items-center h-[44px]">
          <p className="font-bold text-sm text-white/30">단백질</p>
          <div className="flex gap-x-1 items-center">
            <p className="text-white font-bold text-lg">{calories.protein}</p>
            <p className="text-white/30 text-[12px]">g</p>
          </div>
        </div>

        <div className="flex justify-between  items-center h-[44px] ">
          <p className="font-bold text-sm text-white/30">지방</p>
          <div className="flex gap-x-1 items-center">
            <p className="text-white font-bold text-lg">{calories.fat}</p>
            <p className="text-white/30 text-[12px]">g</p>
          </div>
        </div>
      </div>

      {foods && foods.length > 0 && (
        <div className="w-full py-4 flex gap-x-4 overflow-x-scroll border-t border-white/10">
          {foods.map((food) => (
            <Chip key={food.id} food={food} />
          ))}
        </div>
      )}
    </>
  );
};

export default DietsLog;

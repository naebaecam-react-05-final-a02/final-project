import { createClient } from '@/supabase/server';
import { DietsLogType } from '@/types/diet';
import { Tables } from '@/types/supabase';
import { getEndOfDayISO, getRangeOption, getStartOfDayISO, RANGE_OPTIONS } from '@/utils/dateFormatter';

//TODO 에러처리 해야댐
const useDashBoard = async (query: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const getWeightQuery = getRangeOption(query)?.startDate ?? RANGE_OPTIONS.last_7_days.startDate;
  const getWeights = async (query: string) => {
    const response = await supabase.from('weights').select('*').eq('userId', user?.id).gte('date', query).order('date');
    return response.data as Tables<'weights'>[];
  };

  const getDiets = async () => {
    const response = await supabase
      .from('diets')
      .select('*')
      .eq('userId', user?.id)
      .gte('date', getStartOfDayISO())
      .lte('date', getEndOfDayISO())
      .order('date');

    return response.data as DietsLogType;
  };

  const getExercise = async () => {
    const response = await supabase
      .from('exercises')
      .select('*')
      .eq('userId', user?.id)
      .gte('date', getStartOfDayISO())
      .lte('date', getEndOfDayISO())
      .order('date');

    return response.data as Tables<'exercises'>[];
  };

  const [weights, diets, exercises] = await Promise.all([getWeights(getWeightQuery), getDiets(), getExercise()]);

  return {
    user,
    weights,
    diets,
    exercises,
  };
};

export default useDashBoard;

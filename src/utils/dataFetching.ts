import { verificationsType } from '@/types/challenge';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

const DATA_PER_PAGE = 5;

export const fetchDataByInfinityQuery = async (client: SupabaseClient<Database>, id: string, offset?: number) => {
  const query = client
    .from('challengeVerify')
    .select('*,users (id, nickname, email,profileURL)')
    .eq('challengeId', id)
    .order('date', { ascending: false });

  if (offset) {
    const from = offset * DATA_PER_PAGE;
    const to = from + DATA_PER_PAGE - 1;

    query.range(from, to);
  } else {
    query.limit(5);
  }

  const response = await query;

  return response.data as verificationsType[];
};

import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const fetchData = async (client: SupabaseClient<Database>, from?: number, to?: number) => {
  const response = await client.from('challengeVerify').select('*').order('date', { ascending: false }).range(0, 3);

  return response;
};

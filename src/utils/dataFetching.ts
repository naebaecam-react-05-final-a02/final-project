import { verificationsType } from '@/types/challenge';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { getEndOfDayISO, getStartOfDayISO } from './dateFormatter';

const DATA_PER_PAGE = 5;

export const fetchDataByInfinityQuery = async (client: SupabaseClient<Database>, id: string, offset?: number) => {
  const query = client
    .from('challengeVerify')
    .select('*,users (id, nickname, email,profileURL)')
    .eq('challengeId', id)
    .gte('date', getStartOfDayISO()) // 인증 오늘꺼만 가져오게?
    .lte('date', getEndOfDayISO())
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

export const fetchVerificationTotalData = async (client: SupabaseClient<Database>, id: string) => {
  const response = await client.from('challengeVerify').select('*').eq('challengeId', id);

  const data = {
    totalVerifications: response.data?.length,
    totalUsers: new Set(response.data?.map((d) => d.userId)).size,
  };

  return data;
};

export const getVerification = async (
  client: SupabaseClient<Database>,
  challengeId: string,
  verificationId: string,
) => {
  try {
    const { data: verification, error } = await client
      .from('challengeVerify')
      .select('*,users (id, nickname, email,profileURL)')
      .match({ challengeId, id: verificationId });

    if (error) {
      throw new Error('getVerification Error');
    }

    if (!verification || !verification.length) {
      throw new Error('No data');
    }

    return verification[0] as verificationsType;
  } catch (error) {
    console.error('Error');
    throw error;
  }
};

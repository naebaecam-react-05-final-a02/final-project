import { verificationsType } from '@/types/challenge';
import { Database, Tables } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { getEndOfDayISO, getStartOfDayISO } from '../../../../../../../utils/dateFormatter';

const DATA_PER_PAGE = 10;

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
    query.limit(10);
  }

  const response = await query;
  console.log(response);

  return response.data as verificationsType[];
};

export const fetchVerificationTotalData = async (client: SupabaseClient<Database>, id: string) => {
  const response = await client
    .from('challengeVerify')
    .select('*,user:users(id)')
    .eq('challengeId', id)
    .gte('date', getStartOfDayISO(new Date()))
    .lte('date', getEndOfDayISO(new Date()))
    .returns<(Tables<'challengeVerify'> & { user: { id: string } })[]>();

  const data = {
    verifications: response.data,
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
      console.error('Database query error:', error);
      return {
        data: null,
        error: 'Database query failed',
        details: error.message,
      };
    }

    if (!verification || verification.length === 0) {
      console.error('No data found:', error);
      return {
        data: null,
        error: 'No data found',
        details: `No verification data found for challengeId ${challengeId} and verificationId ${verificationId}`,
      };
    }

    return { data: verification[0] as verificationsType, error: null, details: null };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { data: null, error: 'Unexpected error occurred', details: (error as Error).message };
  }
};

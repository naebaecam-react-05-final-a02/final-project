import { verificationsType } from '@/types/challenge';
import { Database, Tables } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import _ from 'lodash';
import { getEndOfDayISO, getStartOfDayISO } from '../../../../../../../utils/dateFormatter';

const DATA_PER_PAGE = 6;

export const fetchDataByInfinityQuery = async (client: SupabaseClient<Database>, id: string, offset?: number) => {
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  const query = client
    .from('challengeVerify')
    .select(
      '*,users (id, nickname, email,profileURL),likes:challengeVerificationLikes(userId, verificationId), likes_count:challengeVerificationLikes(count)',
    )
    .eq('challengeId', id)
    // .gte('date', getStartOfDayISO()) // 인증 오늘꺼만 가져오게?
    // .lte('date', getEndOfDayISO())
    .order('date', { ascending: false });

  if (offset) {
    const from = offset * DATA_PER_PAGE;
    const to = from + DATA_PER_PAGE - 1;

    query.range(from, to);
  } else {
    query.limit(6);
  }

  const response = await query;

  const data = response.data;

  const verifications = data?.map((item) => {
    // Ensure likes is an array and has the expected structure
    const isLiked = Array.isArray(item.likes)
      ? !_.isEmpty(item.likes.find((like: any) => like.userId === user?.id))
      : [];

    return {
      ...item,
      likes_count: item.likes_count.length !== 0 ? item.likes_count[0]?.count : 0,
      isLiked,
    };
  });

  return verifications as verificationsType[];
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

export const getChallengeWithParticipants = async (client: SupabaseClient<Database>, challengeId: string) => {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    console.error('user not found');
    return;
  }

  const { data, error } = await client
    .from('challenges')
    .select(`title,content,isProgress,participants:challengeParticipants(userId)`, { count: 'exact' })
    .eq('id', challengeId)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  return { ...data, isParticipant: Boolean(data.participants.find((participant) => participant.userId === user.id)) };
};

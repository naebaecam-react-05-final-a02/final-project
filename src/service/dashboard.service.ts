import { DietTableType } from '@/types/diet';
import { ExerciseTodoItemType } from '@/types/exercises';
import { Database, Tables } from '@/types/supabase';
import { getEndOfDayISO, getRangeOption, getStartOfDayISO, RANGE_OPTIONS } from '@/utils/dateFormatter';
import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';

class DashBoardAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/dashboard') {
    this.baseURL = baseURL;
  }

  // 식단 데이터
  getDiets = async (client: SupabaseClient<Database>, date: Date) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        return {
          data: null,
          error: 'User not found',
          details: 'User not found',
        };
      }

      const { data: diets, error } = await client
        .from('diets')
        .select('*')
        .eq('userId', user.id)
        .gte('date', getStartOfDayISO(date))
        .lte('date', getEndOfDayISO(date))
        .order('date');

      if (error) {
        console.error('Diets Database query error:', error);
        return {
          data: null,
          error: 'Diets Database query failed',
          details: error.message,
        };
      }

      return { data: diets as DietTableType[], error: null, details: null };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { data: null, error: 'Unexpected error occurred', details: (error as Error).message };
    }
  };

  // 체중 데이터
  getWeights = async (client: SupabaseClient<Database>, query: string) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        return {
          data: null,
          error: 'User not found',
          details: 'User not found',
        };
      }

      const getWeightQuery = getRangeOption(query)?.startDate ?? RANGE_OPTIONS.last_7_days.startDate;
      const { data: weights, error } = await client
        .from('weights')
        .select('*')
        .eq('userId', user?.id)
        .gte('date', getWeightQuery)
        .order('date');

      if (error) {
        console.error('Weights Database query error:', error);
        return {
          data: null,
          error: 'Weights Database query failed',
          details: error.message,
        };
      }

      return { data: weights as Tables<'weights'>[], error: null, details: null };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { data: null, error: 'Unexpected error occurred', details: (error as Error).message };
    }
  };

  // 운동 투두 데이터
  getExercises = async (client: SupabaseClient<Database>, date: Date) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        return {
          data: null,
          error: 'User not found',
          details: 'User not found',
        };
      }

      const { data: exercises, error } = await client
        .from('exercises')
        .select('*')
        .eq('userId', user?.id)
        .gte('date', getStartOfDayISO(date))
        .lte('date', getEndOfDayISO(date))
        .order('id');

      // console.log('exercises___', exercises);
      if (error) {
        console.error('Exercises Database query error:', error);
        return {
          data: null,
          error: 'Exercises Database query failed',
          details: error.message,
        };
      }

      return { data: exercises as any as ExerciseTodoItemType[], error: null, details: null };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { data: null, error: 'Unexpected error occurred', details: (error as Error).message };
    }
  };

  // 참여중인 챌린지 데이터
  getJoinedChallenges = async (client: SupabaseClient<Database>) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        return {
          data: null,
          error: 'User not found',
          details: 'User not found',
        };
      }

      const { data: challenges, error } = await client
        .from('challengeParticipants')
        .select('*,challenges(title, isProgress)')
        .eq('userId', user?.id);

      if (error) {
        console.error('Challenge Participants Database query error:', error);
        return {
          data: null,
          error: 'Challenge Participants Database query failed',
          details: error.message,
        };
      }

      return { data: challenges, error: null, details: null };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { data: null, error: 'Unexpected error occurred', details: (error as Error).message };
    }
  };

  getJoinedMyChallenges = async (client: SupabaseClient<Database>) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        return {
          data: null,
          error: 'User not found',
          details: 'User not found',
        };
      }

      const { data: challenges, error } = await client
        .from('challengeParticipants')
        .select('*,challenges(*)')
        .neq('challenges.isProgress', 'END')
        .order('startDate', { referencedTable: 'challenges', ascending: true })
        .eq('userId', user?.id);

      if (error) {
        console.error('Challenge Participants Database query error:', error);
        return {
          data: null,
          error: 'Challenge Participants Database query failed',
          details: error.message,
        };
      }

      return { data: challenges, error: null, details: null };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { data: null, error: 'Unexpected error occurred', details: (error as Error).message };
    }
  };
  postUserWeight = async ({ formData }: { formData: FormData }) => {
    const response = await axios.post(`${this.baseURL}/weights`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
}

export default DashBoardAPI;

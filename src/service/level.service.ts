import { ExpInfoType } from '@/types/level';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';

class LevelAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = `/api/level`;
  }

  getExperience = async (client: SupabaseClient<Database>) => {
    const response = await client.from('level').select('*');
    return response.data;
  };

  getLevel = async (client: SupabaseClient<Database>) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        console.error('User not found');
        return;
      }
      const response = await client
        .from('users')
        .select('level,experience,expInfo:level(experience)')
        .eq('id', user.id)
        .single<ExpInfoType>();

      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error('ERROR___', err);
      throw err;
    }
  };

  levelUp = async (levelData: { uid?: string; exp: number }) => {
    try {
      const response = await axios.patch(`${this.baseURL}`, levelData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default LevelAPI;

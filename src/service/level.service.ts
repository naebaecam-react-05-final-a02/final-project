import { LevelType } from '@/types/level';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

class LevelAPI {
  constructor() {}

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
      const response = await client.from('userLevel').select('*,level(*)').eq('userId', user.id).single<LevelType>();

      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error('ERROR___', err);
      throw err;
    }
  };

  levelUp = async ({
    client,
    level,
    experience,
  }: {
    client: SupabaseClient<Database>;
    level: number;
    experience: number;
  }) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        console.error('User not found');
        return;
      }

      const response = await client.from('userLevel').update({ level, experience }).eq('userId', user.id);

      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error('ERROR___', err);
      throw err;
    }
  };
}

export default LevelAPI;

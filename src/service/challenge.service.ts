import { Tables } from '@/types/supabase';
import axios from 'axios';

class ChallengeAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/challenge') {
    this.baseURL = baseURL;
  }

  register = async (challengeData: Omit<Tables<'challenges'>, 'id'>) => {
    try {
      const response = await axios.post(`${this.baseURL}/register`, challengeData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default ChallengeAPI;

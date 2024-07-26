import { Tables } from '@/types/supabase';
import axios from 'axios';

class ChallengeAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/challenges') {
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

  verify = async (verifyData: Omit<Tables<'challengeVerify'>, 'id' | 'date'>) => {
    try {
      const response = await axios.post(`${this.baseURL}/verify`, verifyData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getChallengeDetail = async (id: number) => {
    try {
      const response = await axios.get(`${this.baseURL}/detail?id=${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
  postChallenge = async ({ formData }: { formData: any }) => {
    const response = await axios.post(`${this.baseURL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    return response;
  };

  getPopularChallenges = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${this.baseURL}/popular`);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default ChallengeAPI;

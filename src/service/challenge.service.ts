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

  getPopularChallenges = async ({ category }: { category: string }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${this.baseURL}/coming?category=${category}`,
      );
      const data = await response.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
  getPaginationChallenges = async ({ category, page, limit }: { category: string; page: number; limit: number }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/challenges/all?category=${category}&page=${page}&limit=${limit}`,
      );
      console.log(response);
      const data = await response.data;
      return data;
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
}

export default ChallengeAPI;

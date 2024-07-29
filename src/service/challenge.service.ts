import { Tables } from '@/types/supabase';
import axios from 'axios';

class ChallengeAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/challenges') {
    this.baseURL = baseURL;
  }

  registerChallenge = async (challengeData: Omit<Tables<'challenges'>, 'id'>) => {
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

  registerVerification = async (verifyData: Omit<Tables<'challengeVerify'>, 'id' | 'date'>) => {
    try {
      const response = await axios.post(`${this.baseURL}/verification`, verifyData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  updateVerification = async ({
    updateData,
    cid,
    vid,
  }: {
    updateData: Omit<Tables<'challengeVerify'>, 'id' | 'date'>;
    cid: string;
    vid: string;
  }) => {
    try {
      const response = await axios.patch(`${this.baseURL}/verification?cid=${cid}&vid=${vid}`, updateData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  deleteVerification = async ({ cid, vid }: { cid: string; vid: string }) => {
    try {
      const response = await axios.delete(`${this.baseURL}/verification?cid=${cid}&vid=${vid}`);
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
      console.log(1);
      const response = await axios.get(`${this.baseURL}/popular`);
      console.log('response___', response);
      return response.data;
    } catch (error) {
      console.log(2);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      console.log(3);
      throw error;
    }
  };
}

export default ChallengeAPI;

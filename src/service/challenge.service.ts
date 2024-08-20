import { ChallengeFilterTypes } from '@/types/challenge';
import { Tables } from '@/types/supabase';
import axios from 'axios';

class ChallengeAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/challenges') {
    this.baseURL = baseURL;
  }

  getVerifications = async ({ challengeId }: { challengeId: number }) => {
    const response = await axios.get(`${this.baseURL}/verification/${challengeId}`);
    const data = response.data;
    return data;
  };

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

  updateChallenge = async ({ updateData, cid }: { updateData: Omit<Tables<'challenges'>, 'id'>; cid: number }) => {
    try {
      const response = await axios.patch(`${this.baseURL}/register?cid=${cid}`, updateData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  deleteChallenge = async (cid: number) => {
    try {
      const response = await axios.delete(`${this.baseURL}/register?cid=${cid}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  joinChallenge = async (cid: number) => {
    try {
      const response = await axios.post(`${this.baseURL}/join?cid=${cid}`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  leaveChallenge = async (cid: number) => {
    try {
      const response = await axios.delete(`${this.baseURL}/join?cid=${cid}`);

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

  getPopularChallenges = async ({ category }: { category: string }) => {
    try {
      const response = await axios.get(`${this.baseURL}/coming?category=all`);
      const data = await response.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
  getPaginationChallenges = async ({
    filter,
    page,
    limit,
  }: {
    filter: ChallengeFilterTypes;
    page: number;
    limit: number;
  }) => {
    try {
      const response = await axios.get(
        `${this.baseURL}/all?categories=${filter.categories.join(',')}&status=${filter.status.join(
          ',',
        )}&order=${filter.order.join(',')}&searchValue=${filter.searchValue}&page=${page}&limit=${limit}`,
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

    return response;
  };
  getChallengeCount = async ({ filter }: { filter: ChallengeFilterTypes }) => {
    try {
      const response = await axios.get(
        `${this.baseURL}/all/count?categories=${filter.categories.join(',')}&status=${filter.status.join(
          ',',
        )}&order=${filter.order.join(',')}&searchValue=${filter.searchValue}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
  toggleLike = async ({ verificationId, isLiked }: { verificationId: number; isLiked: boolean }) => {
    const response = isLiked
      ? await axios.delete(`${this.baseURL}/verification/likes?verificationId=${verificationId}`)
      : await axios.post(`${this.baseURL}/verification/likes?verificationId=${verificationId}`);
    const data = response.data;
    return data;
  };

  getPaginatedMyChallenges = async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(`${this.baseURL}/me?page=${page}&limit=${limit}`);
    return response.data;
  };
  getPaginatedOwnerChallenges = async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(`${this.baseURL}/owner?page=${page}&limit=${limit}`);
    return response.data;
  };
}

export default ChallengeAPI;

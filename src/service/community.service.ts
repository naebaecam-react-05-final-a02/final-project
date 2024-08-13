import { CommunityPostCreateData, CommunityPostData } from '@/types/community';
import axios from 'axios';

class CommunityAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/community') {
    this.baseURL = baseURL;
  }

  write = async (data: CommunityPostCreateData) => {
    try {
      const response = await axios.post(`${this.baseURL}/write`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getPosts = async ({
    pageParam = 1,
    category = '전체',
  }: {
    pageParam?: number;
    category?: string;
  }): Promise<{ data: CommunityPostData[]; page: number; limit: number }> => {
    const response = await axios.get(`${this.baseURL}/posts`, {
      params: { page: pageParam, limit: 10, category },
    });
    return response.data;
  };

  getPostDetail = async (id: string): Promise<CommunityPostData> => {
    const response = await axios.get(`${this.baseURL}/posts/${id}`);
    return response.data;
  };
}

export default CommunityAPI;

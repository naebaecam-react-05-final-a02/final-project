import { CommunityPostData } from '@/types/community';
import axios from 'axios';

class CommunityAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/community') {
    this.baseURL = baseURL;
  }

  write = async (data: CommunityPostData) => {
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
}

export default CommunityAPI;

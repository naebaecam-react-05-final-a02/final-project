import { Tables } from '@/types/supabase';
import axios from 'axios';

class DashBoardAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/dashboard') {
    this.baseUrl = baseUrl;
  }

  getWeightsData = async () => {
    try {
      const response = await axios.get<Tables<'weight'>>(`${this.baseUrl}`);
      if (response.status === 204) {
        throw new Error('User not found');
      }
      console.log('GET WEIGHTS DATA___', response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default DashBoardAPI;

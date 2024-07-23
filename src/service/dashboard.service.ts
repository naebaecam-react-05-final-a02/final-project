import { Tables } from '@/types/supabase';
import { getRangeOption, RANGE_OPTIONS } from '@/utils/chartRange';
import axios from 'axios';

class DashBoardAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/dashboard') {
    this.baseUrl = baseUrl;
  }

  getWeights = async (query: string) => {
    try {
      const opt = getRangeOption(query) ?? RANGE_OPTIONS.last_7_days;
      const response = await axios.get<Tables<'weights'>[]>(`${this.baseUrl}/weights`, {
        params: { query: opt?.startDate },
      });

      if (response.status === 204) {
        throw new Error('No content available for the requested query.');
      }

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

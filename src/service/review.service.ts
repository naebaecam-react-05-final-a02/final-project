import { Tables } from '@/types/supabase';
import axios from 'axios';

class ReviewAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/challenges/review') {
    this.baseUrl = baseUrl;
  }
  register = async (reviewData: FormData) => {
    try {
      const response = await axios.post(`${this.baseUrl}`, reviewData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
  getReviews = async (id: number): Promise<Tables<'challengeReviews'>[]> => {
    try {
      const response = await axios.get(`${this.baseUrl}?id=${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default ReviewAPI;

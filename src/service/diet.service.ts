import { DietTableType, DietType } from '@/types/diet';
import axios from 'axios';

class DietAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/diets') {
    this.baseUrl = baseUrl;
  }

  getDietsByDate = async (date: string): Promise<DietTableType[]> => {
    try {
      const response = await axios.get(`${this.baseUrl}?date=${date}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  postDiet = async ({ date, dietType, foods }: DietType): Promise<{ message: string }> => {
    try {
      const response = await axios.post(`${this.baseUrl}`, { date, dietType, foods });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default DietAPI;

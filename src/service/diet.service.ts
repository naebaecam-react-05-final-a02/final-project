import { DietTableType, DietType, FoodTableType } from '@/types/diet';
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

  putDiet = async ({ id, date, dietType, foods }: DietType): Promise<{ message: string }> => {
    try {
      const response = await axios.put(`${this.baseUrl}`, { id, date, dietType, foods });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  deleteDiet = async ({ id }: Pick<DietTableType, 'id'>): Promise<{ message: string }> => {
    try {
      const response = await axios.delete(`${this.baseUrl}?id=${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getFoodInfoByFoodName = async (foodName: string): Promise<FoodTableType[]> => {
    try {
      const response = await axios.get(`${this.baseUrl}/foods?foodName=${foodName}`);
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

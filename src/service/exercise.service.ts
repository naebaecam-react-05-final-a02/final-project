import { RecordData } from '@/types/exercises';
import { Tables } from '@/types/supabase';
import axios from 'axios';

export type 운동북마크반환데이터 = Tables<'exercisesBookmarks'> &
  {
    exercises: {
      name: string;
      id: number;
    };
  }[];

class ExerciseAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/exercises') {
    this.baseUrl = baseUrl;
  }
  register = async (exerciseData: RecordData) => {
    try {
      const response = await axios.post(`${this.baseUrl}/record`, exerciseData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
  getBookmarks = async (): Promise<운동북마크반환데이터> => {
    try {
      const response = await axios.get(`${this.baseUrl}/bookmarks`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  toggleBookmark = async (exerciseId: number): Promise<{ isBookmarked: boolean }> => {
    try {
      const response = await axios.patch(`${this.baseUrl}/bookmarks/toggle`, { exerciseId });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default ExerciseAPI;

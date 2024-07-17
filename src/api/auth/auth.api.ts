import { Tables } from '@/types/supabase';
import { Provider, User } from '@supabase/supabase-js';
import axios from 'axios';

class AuthAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/auth') {
    this.baseUrl = baseUrl;
  }

  // 회원가입
  signUp = async (email: string, password: string, nickname: string): Promise<Tables<'users'>> => {
    console.log(email, password, nickname);
    try {
      const response = await axios.post(
        `${this.baseUrl}/sign-up`,
        {
          email,
          password,
          nickname,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 로그인
  signIn = async (email: string, password: string): Promise<User> => {
    try {
      const response = await axios.post(
        `${this.baseUrl}/log-in`,
        {
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 로그아웃
  signOut = async () => {
    try {
      await axios.delete(`${this.baseUrl}/log-out`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 유저 정보 확인
  getUserInfo = async (): Promise<User> => {
    try {
      const response = await axios.get(`${this.baseUrl}/info`);
      if (response.status === 204) {
        throw new Error('User not found');
      }
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 소셜 로그인
  signInWithOAuth = async (provider: Provider): Promise<any> => {
    try {
      const response = await axios.get(`${this.baseUrl}/social/${provider}`, {
        params: { provider },
      });
      window.location.href = response.data.url;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default AuthAPI;

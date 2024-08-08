import { Tables } from '@/types/supabase';
import { Provider, User } from '@supabase/supabase-js';
import axios from 'axios';

type UserInfo = User & Tables<'users'>;

class AuthAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/auth') {
    this.baseUrl = baseUrl;
  }

  // 회원가입
  signUp = async (data: FormData): Promise<UserInfo> => {
    try {
      const response = await axios.post(`${this.baseUrl}/sign-up`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 로그인
  signIn = async (email: string, password: string, keepLoggedIn: boolean): Promise<UserInfo> => {
    try {
      const response = await axios.post(
        `${this.baseUrl}/session/log-in`,
        { email, password, keepLoggedIn },
        { withCredentials: true },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // 로그아웃
  signOut = async () => {
    try {
      await axios.delete(`${this.baseUrl}/session/log-out`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 유저 정보 확인
  getUserInfo = async (): Promise<UserInfo> => {
    try {
      const response = await axios.get(`${this.baseUrl}/account/info`);
      if (response.status === 204) {
        throw new Error('User not found');
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 이메일 또는 닉네임 중복 확인
  checkDuplicate = async (field: 'email' | 'nickname', value: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${this.baseUrl}/sign-up/check-duplicate`, { field, value });
      return response.data.available;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 소셜 로그인
  signInWithOAuth = async (provider: Provider): Promise<void> => {
    try {
      const response = await axios.get(`${this.baseUrl}/session/social/?provider=${provider}`);

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('No URL returned from server');
      }
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };

  // 비밀번호 재설정 요청 (비밀번호 찾기)
  requestPasswordReset = async (email: string): Promise<void> => {
    try {
      await axios.post(`${this.baseUrl}/password/reset-password`, { email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 인증 번호 확인
  verifyResetCode = async (email: string, code: string): Promise<void> => {
    try {
      await axios.post(`${this.baseUrl}/password/verify-otp`, { email, code });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 새 비밀번호 설정 (비밀번호 변경)
  resetPassword = async (newPassword: string): Promise<void> => {
    try {
      await axios.post(`${this.baseUrl}/password/update-password`, {
        newPassword,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 회원탈퇴
  deleteAccount = async (): Promise<void> => {
    try {
      await axios.delete(`${this.baseUrl}/account/delete-account`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default AuthAPI;

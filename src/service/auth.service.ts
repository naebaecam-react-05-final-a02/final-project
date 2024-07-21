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
  signUp = async (email: string, password: string, nickname: string): Promise<UserInfo> => {
    console.log(email, password, nickname);
    try {
      const response = await axios.post(`${this.baseUrl}/sign-up`, {
        email,
        password,
        nickname,
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
  signIn = async (email: string, password: string): Promise<UserInfo> => {
    try {
      const response = await axios.post(
        `${this.baseUrl}/log-in`,
        {
          email,
          password,
        },
        {
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
  getUserInfo = async (): Promise<UserInfo> => {
    try {
      const response = await axios.get(`${this.baseUrl}/info`);
      if (response.status === 204) {
        throw new Error('User not found');
      }
      console.log(response);
      return response.data;
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
      window.location.href = `${this.baseUrl}/social/?provider=${provider}`;
    } catch (error) {
      throw error;
    }
  };

  // 이메일 인증 코드 생성
  generateVerificationEmail = async (email: string): Promise<string> => {
    try {
      const response = await axios.post(`${this.baseUrl}/generate-verification-code`, { email });
      console.log(response);
      return response.data.message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  };

  // 이메일 인증 코드 확인
  verifyCode = async (email: string, code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.post(`${this.baseUrl}/verify-code`, {
        email,
        code,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false, message: error.response?.data?.error || error.message };
      }
      throw error;
    }
  };

  // 비밀번호 재설정 요청 (비밀번호 찾기)
  requestPasswordReset = async (email: string): Promise<void> => {
    try {
      await axios.post(`${this.baseUrl}/reset-password`, { email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // 새 비밀번호 설정 (비밀번호 변경)
  resetPassword = async (newPassword: string, token: string, email: string): Promise<void> => {
    try {
      await axios.post(`${this.baseUrl}/update-password`, {
        newPassword,
        token,
        email,
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
      await axios.delete(`${this.baseUrl}/delete-account`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default AuthAPI;

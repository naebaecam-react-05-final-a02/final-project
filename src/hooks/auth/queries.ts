import { Provider } from '@supabase/supabase-js';
import api from '../../service/service';

export const usersQueryKeys = {
  all: ['user'] as const,
};

export const queryOptions = {
  user: () => ({
    queryKey: usersQueryKeys.all,
    queryFn: async () => {
      const user = await api.auth.getUserInfo();

      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
  }),
};

export const mutationOptions = {
  signUp: {
    mutationFn: (data: { email: string; password: string; nickname: string }) =>
      api.auth.signUp(data.email, data.password, data.nickname),
  },
  signIn: {
    mutationFn: (data: { email: string; password: string }) => api.auth.signIn(data.email, data.password),
  },
  signOut: {
    mutationFn: () => api.auth.signOut(),
  },
  socialSignIn: () => ({
    mutationFn: (provider: Provider) => api.auth.signInWithOAuth(provider),
  }),
  requestPasswordReset: {
    mutationFn: (email: string) => api.auth.requestPasswordReset(email),
  },
  resetPassword: {
    mutationFn: ({ newPassword, token }: { newPassword: string; token: string }) =>
      api.auth.resetPassword(newPassword, token),
  },
  deleteAccount: {
    mutationFn: () => api.auth.deleteAccount(),
  },
};

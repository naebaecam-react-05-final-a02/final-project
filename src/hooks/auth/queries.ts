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
    mutationFn: (data: FormData) => api.auth.signUp(data),
  },
  signIn: {
    mutationFn: (data: { email: string; password: string; keepLoggedIn: boolean }) =>
      api.auth.signIn(data.email, data.password, data.keepLoggedIn),
  },
  signOut: {
    mutationFn: () => api.auth.signOut(),
  },
  socialSignIn: () => ({
    mutationFn: (provider: Provider) => api.auth.signInWithOAuth(provider),
  }),
  checkDuplicate: {
    mutationFn: (data: { field: 'email' | 'nickname'; value: string }) =>
      api.auth.checkDuplicate(data.field, data.value),
  },
  requestPasswordReset: {
    mutationFn: (email: string) => api.auth.requestPasswordReset(email),
  },
  verifyResetCode: {
    mutationFn: (data: { email: string; code: string }) => api.auth.verifyResetCode(data.email, data.code),
  },
  resetPassword: {
    mutationFn: ({ newPassword }: { newPassword: string }) => api.auth.resetPassword(newPassword),
  },
  deleteAccount: {
    mutationFn: () => api.auth.deleteAccount(),
  },
};

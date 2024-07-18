import { Provider, User } from '@supabase/supabase-js';
import api from '../../service/service';

export const usersQueryKeys = {
  all: ['user'] as const,
};

export const queryOptions = {
  user: () => ({
    queryKey: usersQueryKeys.all,
    queryFn: api.auth.getUserInfo,
    select: (user: User) => user.id,
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
};

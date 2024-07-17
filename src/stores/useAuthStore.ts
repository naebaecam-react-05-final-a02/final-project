import { Tables } from '@/types/supabase';
import { create } from 'zustand';

interface AuthState {
  user: Tables<'users'> | null;
  isLoding: boolean;
  error: string | null;
  setUser: (user: Tables<'users'> | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoding: false,
  error: null,

  setUser: (user) => set({ user }),
}));

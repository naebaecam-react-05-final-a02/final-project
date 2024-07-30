import { Tables } from './supabase';

export type verificationsType = Tables<'challengeVerify'> & { users: Tables<'users'> };
export type verificationsCountType = {
  totalVerifications: number | undefined;
  totalUsers: number;
};

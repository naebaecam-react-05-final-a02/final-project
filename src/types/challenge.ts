import { Tables } from './supabase';

export type verificationsType = Tables<'challengeVerify'> & { users: Tables<'users'> };

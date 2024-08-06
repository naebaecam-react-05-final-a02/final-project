import { Tables } from './supabase';

export type verificationsType = Tables<'challengeVerify'> & { users: Tables<'users'>; imageURLs: string[] };
export type verificationsCountType = {
  totalVerifications: number | undefined;
  totalUsers: number;
};

export type joinedChallengesDataType =
  | { data: null; error: string; details: string }
  | {
      data: {
        challengeId: number;
        id: number;
        userId: string;
        challenges: {
          title: string;
          isProgress: boolean;
        } | null;
      }[];
      error: null;
      details: null;
    };

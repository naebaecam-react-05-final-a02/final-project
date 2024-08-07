import { Tables } from './supabase';

export type verificationsType = Tables<'challengeVerify'> & { users: Tables<'users'> };
export type verificationsCountType = {
  totalVerifications: number | undefined;
  totalUsers: number;
};

type challengesTypes = Tables<'challenges'>;

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

export type joinedMyChallengesDataType =
  | { data: null; error: string; details: string }
  | {
      data: {
        challengeId: number;
        id: number;
        userId: string;
        challenges: challengesTypes | null;
      }[];
      error: null;
      details: null;
    };

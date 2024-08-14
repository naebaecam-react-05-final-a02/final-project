import { Tables } from './supabase';

export type verificationsType = Tables<'challengeVerify'> & {
  users: Tables<'users'>;
  imageURLs: string[];
  likes: { verificationId: number; userId: string }[] | [];
  likes_count: number;
  isLiked: boolean;
};
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
          isProgress: 'LF' | 'RUN' | 'END';
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

export type ChallengeStatusTypes = 'all' | 'LF' | 'RUN' | 'END';
export type ChallengeOrderTypes = 'startDate' | 'endDate' | 'participants' | 'verifications';
export type ChallengeCategoryTypes = 'all' | 'exercise' | 'diet' | 'lifestyle' | 'etc';

export interface ChallengeFilterTypes {
  searchValue: string;
  categories: ChallengeCategoryTypes[];
  status: ChallengeStatusTypes[];
  order: ChallengeOrderTypes[];
}

export type ChallengeFilterStandardTypes = 'categories' | 'status' | 'order';

export type ChallengeFilterInputTypes = ChallengeStatusTypes | ChallengeOrderTypes | ChallengeCategoryTypes;

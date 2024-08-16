import { Tables } from '@/types/supabase';

export type TChallenge = Tables<'challenges'>;

export type PopularChallengesTypes = TChallenge & {
  participantsCount: number;
  verificationsCount: number;
  challengeParticipants: { count: number }[];
  challengeVerify: { count: number }[];
};

export type challengeFormFields = 'title' | 'content' | 'startDate' | 'endDate' | 'category';

export type FormFields = {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  category: string;
};

import { Tables } from '@/types/supabase';

export type TChallenge = Tables<'challenges'>;

export type challengeFormFields = 'title' | 'content' | 'startDate' | 'endDate' | 'category';

export type FormFields = {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  category: string;
};

export type PopularChallengesTypes = TChallenge & {};

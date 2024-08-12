import { Tables } from '@/types/supabase';

export type TChallenge = Tables<'challenges'>;

export type PopularChallengesTypes = TChallenge & {
  participantsCount: number;
  verificationsCount: number;
  challengeParticipants: { count: number }[];
  challengeVerify: { count: number }[];
};

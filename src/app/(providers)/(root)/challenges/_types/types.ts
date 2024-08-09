import { Tables } from '@/types/supabase';

export type TChallenge = Tables<'challenges'>;

export type PopularChallengesTypes = Tables<'challenges'> & { challengeParticipants: { count: number }[] };

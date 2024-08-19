import { Tables } from './supabase';

export type LevelType = Tables<'userLevel'> & { level: { level: number; experience: number } };
export type ExperienceType = { level: number; experience: number };

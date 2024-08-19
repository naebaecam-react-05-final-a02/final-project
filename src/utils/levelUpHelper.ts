'use client';
import { queryClient } from '@/providers/QueryProvider';
import { ExperienceType, LevelType } from '@/types/level';

export const levelUpHelper = (gainedExp: number) => {
  const data = queryClient.getQueryData<LevelType>(['level'])!;
  const experiences = queryClient.getQueryData<ExperienceType[]>(['experience'])!;

  let curExp = data.experience;
  let { level: curLevel } = data.level;
  let newExp = curExp + gainedExp;
  let requiredExp = experiences[curLevel - 1].experience;

  while (newExp >= requiredExp) {
    newExp -= requiredExp;
    curLevel += 1;
    requiredExp = experiences[curLevel - 1].experience;
  }

  curExp = newExp;

  return {
    level: curLevel,
    experience: curExp,
  };
};

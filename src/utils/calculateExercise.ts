import { cardio, weight } from '@/types/exercises';

export const getAverageWeightAndTotalReps = (record: weight[]) => {
  const averageWeight = record.reduce((acc, cur) => (acc += cur.weight), 0) / record.length;
  const totalReps = record.reduce((acc, cur) => (acc += cur.reps), 0);
  return { averageWeight, totalReps };
};

export const getTotalTime = (record: cardio[]) => {
  const totalTime = 0;
  return { totalTime };
};

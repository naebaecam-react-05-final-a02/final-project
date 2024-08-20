import { Cardio, Weight } from '@/types/exercises';

export const getAverageWeightAndTotalReps = (record: Weight[]) => {
  const averageWeight = record.reduce((acc, cur) => (acc += cur.weight), 0) / record.length;
  const totalReps = record.reduce((acc, cur) => (acc += cur.reps), 0);
  return { averageWeight, totalReps };
};

export const getTotalTime = (record: Cardio[]) => {
  const totalTime = 0;
  return { totalTime };
};

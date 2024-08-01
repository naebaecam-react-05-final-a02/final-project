import { ExerciseTodoItemType } from '@/types/exercises';

export const calculateTodoData = (exercise: ExerciseTodoItemType) => {
  if (exercise.exerciseType === 'cardio') {
    const data = exercise.record.reduce(
      (acc, cur) => {
        acc.hours += cur.hours ?? 0;
        acc.minutes += cur.minutes ?? 0;

        return acc;
      },
      { hours: 0, minutes: 0 },
    );

    data.hours += Math.floor(data.minutes / 60);
    data.minutes = data.minutes % 60;

    return `${data.hours > 0 ? data.hours + '시간 ' : ''}${data.minutes}분`;
  } else {
    const data = exercise.record.reduce(
      (acc, cur) => {
        acc.reps += cur.reps;
        acc.weight += cur.weight;
        return acc;
      },
      { reps: 0, weight: 0 },
    );

    return `${data.reps}회 ${data.weight}kg`;
  }
};

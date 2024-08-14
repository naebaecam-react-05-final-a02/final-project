import { ExerciseTodoItemType } from '@/types/exercises';

export const calculateTodoData = (exercise: ExerciseTodoItemType) => {
  if (exercise.exerciseType === 'cardio') {
    const data = exercise.record.reduce(
      (acc, cur) => {
        acc.distance += cur.distance ?? 0;
        acc.minutes += cur.minutes ?? 0;

        return acc;
      },
      { distance: 0, minutes: 0 },
    );

    const setsString = `${exercise.record.length}세트 `;
    const minutesString = data.minutes > 0 ? `${data.minutes}분 ` : '';
    const distanceString = data.distance > 0 ? `${data.distance}km ` : '';

    return [setsString, minutesString, distanceString];
  } else {
    const data = exercise.record.reduce(
      (acc, cur) => {
        acc.reps += cur.reps;
        acc.weight += cur.weight;
        return acc;
      },
      { reps: 0, weight: 0 },
    );

    const setsString = `${exercise.record.length}세트 `;
    const weightString = data.weight > 0 ? `${data.weight / exercise.record.length}kg ` : '';
    const repsString = data.reps > 0 ? `${data.reps}회 ` : '';
    return [setsString, weightString, repsString];
  }
};

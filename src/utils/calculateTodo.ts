import { ExerciseTodoItemType } from '@/types/exercises';

export const calculateTodoData = (exercise: ExerciseTodoItemType) => {
  if (exercise.exerciseType === 'cardio') {
    const data = exercise.record.reduce(
      (acc, cur) => {
        acc.sets += cur.sets ?? 0;
        acc.distance += cur.distance ?? 0;
        acc.minutes += cur.minutes ?? 0;

        return acc;
      },
      { sets: 0, distance: 0, minutes: 0 },
    );

    const setsString = data.sets > 0 ? `${data.sets}세트 ` : '';
    //TODO 60분 넘어가도 분으로표시? ex) 70분 vs 1시간 10분
    const minutesString = data.minutes > 0 ? `${data.minutes}분 ` : '';
    const distanceString = data.distance > 0 ? `${data.distance}km ` : '';

    return `${setsString}${minutesString}${distanceString}`;
  } else {
    const data = exercise.record.reduce(
      (acc, cur) => {
        acc.sets += cur.sets ?? 0;
        acc.reps += cur.reps;
        acc.weight += cur.weight;
        return acc;
      },
      { sets: 0, reps: 0, weight: 0 },
    );

    const setsString = data.sets > 0 ? `${data.sets}세트 ` : '';
    const weightString = data.weight > 0 ? `${data.weight}kg ` : '';
    const repsString = data.reps > 0 ? `${data.reps}회 ` : '';
    return `${setsString}${weightString}${repsString}`;
  }
};

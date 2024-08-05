import { useDeleteExercises, useGetExercises } from '@/hooks/exercises/useExercise';
import useDateStore from '@/stores/date.store';
import { getFormattedDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/navigation';
import Exercise from './Exercise';

const ExerciseList = () => {
  const router = useRouter();
  const selectedDate = useDateStore((store) => store.date);

  const {
    data: exercises,
    isPending: isFetching,
    isError: isFetchError,
  } = useGetExercises(getFormattedDate(selectedDate));
  const { mutate: deleteExercise, isPending: isDeleting } = useDeleteExercises();

  if (isFetching) return <div className="text-center">데이터를 불러오고 있습니다...</div>;
  if (isDeleting) return <div className="text-center">데이터를 삭제하고 있습니다...</div>;
  if (isFetchError) return <div className="text-center">데이터를 불러오는 도중 에러가 발생했습니다!</div>;

  const handleAddButtonClick = () => {
    router.push('/exercises/record');
  };

  return (
    <>
      {exercises?.length === 0 ? (
        <div className="flex flex-col items-center gap-3">
          <span>운동 기록이 없습니다</span>
          <button className="text-sm" onClick={handleAddButtonClick}>
            추가하러 가기
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {exercises?.map((exercise) => (
            <Exercise key={`exercise-${exercise.id}`} exercise={exercise} deleteExercise={deleteExercise} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ExerciseList;

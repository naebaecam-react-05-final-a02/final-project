import Loading from '@/components/Loading/Loading';
import { useGetExercises } from '@/hooks/exercises/useExercise';
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

  if (isFetching) return <Loading />;
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
        <ul className="flex flex-col gap-4 px-4">
          {exercises?.map((exercise) => (
            <Exercise key={`exercise-${exercise.id}`} exercise={exercise} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ExerciseList;

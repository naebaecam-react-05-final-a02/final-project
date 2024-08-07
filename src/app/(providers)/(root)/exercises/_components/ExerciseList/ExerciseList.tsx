import Loading from '@/components/Loading/Loading';
import api from '@/service/service';
import useDateStore from '@/stores/date.store';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import Exercise from './Exercise';

const ExerciseList = () => {
  const router = useRouter();
  const selectedDate = useDateStore((store) => store.date);
  const supabase = createClient();

  // const {
  //   data: exercises,
  //   isPending: isFetching,
  //   isError: isFetchError,
  // } = useGetExercises(getFormattedDate(selectedDate));

  const {
    data: exercises,
    isPending: isFetching,
    isError: isFetchError,
  } = useQuery({
    queryKey: ['exercises', { date: format(selectedDate, 'yyyy-MM-dd') }],
    queryFn: () => api.dashboard.getExercises(supabase, selectedDate),
  });

  if (isFetching) return <Loading />;

  if (!exercises || isFetchError) {
    return (
      <div className="flex flex-col items-center gap-3">
        <span>데이터를 불러오는 도중 에러가 발생했습니다!</span>
      </div>
    );
  }

  const handleAddButtonClick = () => {
    router.push('/exercises/record');
  };

  if (!exercises.data || !exercises.data.length) {
    return (
      <div className="flex flex-col items-center gap-3">
        <span>운동 기록이 없습니다</span>
        <button className="text-sm" onClick={handleAddButtonClick}>
          추가하러 가기
        </button>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4 px-4">
      {exercises?.data.map((exercise) => (
        <Exercise key={`exercise-${exercise.id}`} exercise={exercise} />
      ))}
    </ul>
  );
};

export default ExerciseList;

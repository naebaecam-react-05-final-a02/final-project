import Checkbox from '@/components/Checkbox';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import { useDeleteExercises, useGetExercises } from '@/hooks/exercises/useExercise';
import Star from '@/icons/Star';
import { queryClient } from '@/providers/QueryProvider';
import useExerciseStore from '@/stores/exercise.store';
import { ExerciseTodoItemType } from '@/types/exercises';
import { calculateTodoData } from '@/utils/calculateTodo';
import { getFormattedDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/navigation';
import EditIcon from '/public/icons/edit.svg';
import DeleteIcon from '/public/icons/x.svg';

interface ExerciseListProps {
  selectedDate: Date;
}

const ExerciseList = ({ selectedDate }: ExerciseListProps) => {
  const router = useRouter();

  const setExercise = useExerciseStore((state) => state.setExercise);
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
    setExercise(null);
    router.push('/exercises/record');
  };

  const handleEditButtonClick = (exercise: ExerciseTodoItemType) => {
    setExercise(exercise);
    router.push('/exercises/record?mode=edit'); // TODO: 수정 url
  };

  const handleDeleteButtonClick = (exerciseId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setExercise(null);
    deleteExercise(
      { id: exerciseId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ExercisesQueryKeys.detail(getFormattedDate(selectedDate)) });
        },
        onError: (e) => {
          alert(e);
        },
      },
    );
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
          {exercises?.map((exercise) => {
            const [set, data1, data2] = calculateTodoData(exercise);
            return (
              <li
                key={`exercise-${exercise.id}`}
                className="flex flex-col gap-4 bg-[#FFFFFF0D] border border-[#FFFFFF33] shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)] rounded-[20px] p-4"
              >
                <div>
                  <div className="flex justify-between pb-4">
                    <Checkbox
                      checked={exercise.isCompleted}
                      label=""
                      onChange={() => {
                        // TODO: 완료한 운동으로 변경
                      }}
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          // TODO: 즐겨찾기 등록
                        }}
                      >
                        <Star
                          style={{
                            fill: true ? '#F2F212' : 'none',
                            stroke: true ? '#F2F212' : 'none',
                          }}
                          width={20}
                          height={20}
                          onClick={() => {}}
                        />
                      </button>
                      <button onClick={() => handleEditButtonClick(exercise)}>
                        <EditIcon width={20} height={20} />
                      </button>
                      <button onClick={() => handleDeleteButtonClick(exercise.id)}>
                        <DeleteIcon width={20} height={20} stroke="#FFF" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-semibold">{exercise.name}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>{set}</span>
                        <span className="inline-block w-[1px] h-2 bg-whiteT-10"></span>
                        <span>{data1}</span>
                        <span className="inline-block w-[1px] h-2 bg-whiteT-10"></span>
                        <span>{data2}</span>
                      </div>
                    </div>
                    {/* TODO: exerciseType에 따라 icon 보여주기 */}
                    <div className="flex justify-center items-center w-12 h-12 text-whiteT-50">icon</div>
                  </div>
                </div>
                <div className="bg-[#FFFFFF1A] w-full h-[1px]"></div>
                <div className="text-whiteT-50 text-xs">{exercise.memo || '-'}</div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ExerciseList;

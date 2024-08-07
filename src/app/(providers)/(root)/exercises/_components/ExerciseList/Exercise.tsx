import Checkbox from '@/components/Checkbox';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import { useToggleComplete } from '@/hooks/exercises/useExercise';
import { queryClient } from '@/providers/QueryProvider';
import useDateStore from '@/stores/date.store';
import { ExerciseTodoItemType } from '@/types/exercises';
import { calculateTodoData } from '@/utils/calculateTodo';
import { getFormattedDate } from '@/utils/dateFormatter';
import { UseMutateFunction } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import EditIcon from '/public/icons/edit.svg';
import DeleteIcon from '/public/icons/x.svg';

const Exercise = ({
  exercise,
  deleteExercise,
}: {
  exercise: ExerciseTodoItemType;
  deleteExercise: UseMutateFunction<{ message: string }, Error, Pick<ExerciseTodoItemType, 'id'>, unknown>;
}) => {
  const router = useRouter();

  const formattedDate = getFormattedDate(useDateStore((store) => store.date));

  const [set, data1, data2] = calculateTodoData(exercise);

  const { mutate: changeComplete, isPending } = useToggleComplete();

  // TODO: OPTIMISTIC UPDATE
  const handleCompleteChange = () => {
    changeComplete(
      { exerciseId: exercise.id, isCompleted: exercise.isCompleted },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ExercisesQueryKeys.detail(formattedDate) });
        },
        onError: (error) => {
          console.error('운동 상태 토글 실패:', error);
        },
      },
    );
  };

  const handleEditButtonClick = (exercise: ExerciseTodoItemType) => {
    router.push(`/exercises/${exercise.id}/edit`); // TODO: 수정 url
  };

  const handleDeleteButtonClick = (exerciseId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    deleteExercise(
      { id: exerciseId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ExercisesQueryKeys.detail(formattedDate) });
        },
        onError: (e) => {
          alert(e);
        },
      },
    );
  };

  return (
    <li className="flex flex-col gap-4 bg-[#FFFFFF0D] border border-[#FFFFFF33] shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)] rounded-[20px] p-4">
      <div>
        <div className="flex justify-between pb-4">
          <Checkbox checked={exercise.isCompleted} label="" onChange={handleCompleteChange} />
          <div className="flex gap-4">
            {/* <button
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
            </button> */}
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
          {/* <div className="flex justify-center items-center w-12 h-12 text-whiteT-50">icon</div> */}
        </div>
      </div>
      <div className="bg-[#FFFFFF1A] w-full h-[1px]"></div>
      <div className="text-whiteT-50 text-xs line-clamp-2 overflow-hidden">{exercise.memo || '-'}</div>
    </li>
  );
};

export default Exercise;

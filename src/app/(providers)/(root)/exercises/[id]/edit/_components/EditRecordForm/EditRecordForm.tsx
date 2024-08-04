'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { exerciseInitialState } from '@/data/exerciseInitialState';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import {
  useGetExerciseBookmarks,
  useGetExerciseRecord,
  useToggleBookmark,
  useUpdateExercise,
} from '@/hooks/exercises/useExercise';
import Star from '@/icons/Star';
import { useCardioInputStore, useExerciseTabStore, useWeightInputStore } from '@/stores/useExerciseStore';
import { CardioInput, ExerciseRecord, ExerciseType, WeightInput } from '@/types/exercises';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ExerciseRecordForm from '../../../../record/_components/exerciseRecordForm/ExerciseRecordForm';

type EditRecordFormProps = {
  exerciseId: string;
};

const EditRecordForm = ({ exerciseId }: EditRecordFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedExercises, setBookmarkedExercises] = useState<number[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [customWorkout, setCustomWorkout] = useState('');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<string[]>([]);

  const [isBookMark, setIsBookMark] = useState(false);

  const { mutate: update } = useUpdateExercise(); // TODO: 수정 API로 변경
  const { mutate: toggleBookmark } = useToggleBookmark();
  const { data: bookmarkData } = useGetExerciseBookmarks();
  const { data: exerciseData, isLoading } = useGetExerciseRecord(exerciseId);
  const [isFirstChange, setIsFirstChange] = useState(false);
  const [record, setRecord] = useState<ExerciseRecord>(exerciseInitialState);
  const setExerciseType = useExerciseTabStore((state) => state.setExerciseType);
  const setCardioList = useCardioInputStore((state) => state.setCardioInputs);
  const setWeightList = useWeightInputStore((state) => state.setWeightInputs);

  useEffect(() => {
    if (!isLoading && exerciseData) {
      const formattedRecord = {
        date: exerciseData.date,
        name: exerciseData.name,
        memo: exerciseData.memo,
        record: exerciseData.record as CardioInput[] | WeightInput[],
        exerciseType: exerciseData.exerciseType as ExerciseType,
      };
      setRecord(formattedRecord);
      setExerciseType(exerciseData.exerciseType);
      if (exerciseData.exerciseType === 'weight') {
        setWeightList(exerciseData.record as WeightInput[]);
      } else {
        setCardioList(exerciseData.record as CardioInput[]);
      }
    }
  }, [exerciseData]);

  useEffect(() => {
    if (record && record.record) console.log('@@RECORD.', record.record);
  }, [record]);

  useEffect(() => {
    if (bookmarkData) {
      setBookmarkedExercises(bookmarkData.map((item) => item.exercises.id));
    }
  }, [bookmarkData]);

  useEffect(() => {
    if (isBookMark) {
      console.log('@@isBookMark', isBookMark);
    }
  }, [isBookMark]);

  const filteredWorkouts = favoriteWorkouts.filter((workout) =>
    workout.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleWorkoutSelect = (workout: string) => {
    setSelectedWorkout(workout);
    setCustomWorkout(''); // 선택된 운동이 있으므로 사용자 입력 초기화
    setSearchTerm(workout); // 선택한 운동을 검색창에 표시
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord((prev) => ({
      ...prev,
      date: event.target.value,
    }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord((prev) => ({
      ...prev,
      name: event.target.value,
    }));
    setCustomWorkout(event.target.value);
    console.log('@@isFirstChange', isFirstChange);
    if (isFirstChange) {
      setIsBookMark(false);
      setIsFirstChange(false);
    }
  };

  const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord((prev) => ({
      ...prev,
      memo: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const workoutToSave = selectedWorkout || customWorkout;

    // 데이터가 없는 경우 빠르게 반환
    if (!record.date || record.record.length === 0) {
      console.error('필수 입력 사항 누락:', { workoutToSave, date: record.date, recordLength: record.record.length });
      alert('운동 이름, 날짜, 세트는 필수 입력 사항~~');
      return;
    }

    const exerciseData = {
      date: record.date,
      exerciseType: record.exerciseType,
      // name: workoutToSave,
      record: record.record,
      memo: record.memo,
      name: record.name,
      isBookMark: isBookMark,
    };
    try {
      update(
        { exerciseData, exerciseId },
        {
          onSuccess: () => {
            alert('수정 성공했다!!!!!!!!!!!');
            router.push('/exercises');
          },
          onError: (error: any) => {
            console.error('수정중 에러발생쓰', error);
          },
        },
      );
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };
  const handleChange = (data: CardioInput[] | WeightInput[], type: ExerciseType) => {
    setRecord((prev) => ({
      ...prev,
      record: data,
      // record: [{ weight: 30, reps: 10 }],
      exerciseType: type,
    }));
    console.log('@@Record', record.record);
  };

  const handleToggleBookmark = (exerciseId?: number) => {
    if (exerciseId) {
      toggleBookmark(exerciseId, {
        onSuccess: () => {
          setBookmarkedExercises((prev) => {
            if (prev.includes(exerciseId)) {
              return prev.filter((id) => id !== exerciseId);
            } else {
              return [...prev, exerciseId];
            }
          });
          queryClient.invalidateQueries(ExercisesQueryKeys.bookmark() as any);
        },
        onError: (error) => {
          console.error('북마크 토글 실패:', error);
        },
      });
    } else {
      setIsBookMark((prev) => !prev);
    }
  };

  const bookmarkListOptions = bookmarkData?.map((item) => ({
    id: item.exercises.id,
    value: item.exercises.name,

    icon: (
      <Star
        width={24}
        height={24}
        style={{
          fill: bookmarkedExercises.includes(item.exercises.id) ? '#12F287' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleBookmark(item.exercises.id);
        }}
      />
    ),
    onClick: (e: React.MouseEvent) => {
      setIsBookMark(true);
      setIsFirstChange(true);
    },
  }));

  return (
    <div className="min-h-screen flex flex-col gap-5 p-5">
      <h3 className="text-white">운동 이름</h3>
      <Input
        label="운동 이름"
        placeholder="운동 이름을 입력해 주세요."
        value={record?.name}
        onChange={handleNameChange}
        inputType="select"
        dropdownOptions={bookmarkListOptions}
        icon={
          <Star
            style={{
              fill: isBookMark ? '#12F287' : 'none',
            }}
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleBookmark();
            }}
          />
        }
      />
      {searchTerm && filteredWorkouts.length > 0 && (
        <ul className="bg-white rounded p-2">
          {filteredWorkouts.map((workout, index) => (
            <li
              key={index}
              onClick={() => handleWorkoutSelect(workout)}
              className="cursor-pointer p-1 hover:bg-gray-200"
            >
              {workout}
            </li>
          ))}
        </ul>
      )}
      {(selectedWorkout || customWorkout) && (
        <p className="text-white">선택된 운동: {selectedWorkout || customWorkout}</p>
      )}
      <h3 className="text-white">날짜 선택</h3>
      <Input type="date" value={record?.date.split('T')[0]} onChange={handleDateChange} className="p-2 rounded" />
      <Input
        placeholder="주의사항, 다짐 등을 작성해 주세요"
        value={record?.memo}
        onChange={handleMemoChange}
        className="p-4 rounded-lg"
        icon={<Star width={24} height={24} />}
      />
      <ExerciseRecordForm onChange={handleChange} />
      <Button type="submit" onClick={handleSubmit}>
        수정하기
      </Button>
    </div>
  );
};

export default EditRecordForm;

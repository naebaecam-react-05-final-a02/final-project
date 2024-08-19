'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { exerciseInitialState } from '@/data/exerciseInitialState';
import { useGetExerciseBookmarks, useRegisterExercise, useToggleBookmark } from '@/hooks/exercises/useExercise';
import Memo from '@/icons/Memo';
import Star from '@/icons/Star';
import Mobile from '@/layouts/Mobile';
import { useExerciseStore } from '@/stores/exercise.store';
import { useQueryClient } from '@tanstack/react-query';

import { useModal } from '@/contexts/modal.context/modal.context';
import { CardioInput, RecordData, WeightInput } from '@/types/exercises';
import { getFormattedDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import ExerciseRecordForm from './_components/exerciseRecordForm/ExerciseRecordForm';

const ExerciseRecordPage = () => {
  const queryClient = useQueryClient();
  const { record, setRecord, clearRecord } = useExerciseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(null);
  const [bookmarkedExercises, setBookmarkedExercises] = useState<string[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [customWorkout, setCustomWorkout] = useState('');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<string[]>([]);
  const router = useRouter();
  const modal = useModal();
  const [localBookmarkedExercises, setLocalBookmarkedExercises] = useState<RecordData[]>([]);

  const { mutate: register, isPending } = useRegisterExercise();
  const { data: bookmarkData } = useGetExerciseBookmarks();
  const { mutate: toggleBookmark, isPending: BookBarkPending } = useToggleBookmark();

  const [isFirstChange, setIsFirstChange] = useState(false);

  useEffect(() => {}, [record.record]);

  useEffect(() => {
    if (bookmarkData) {
      setLocalBookmarkedExercises(bookmarkData);
    }
  }, [bookmarkData]);

  const memoizedClearRecord = useCallback(() => {
    clearRecord();
  }, [clearRecord]);

  useEffect(() => {
    memoizedClearRecord();

    return () => {
      memoizedClearRecord();
    };
  }, [memoizedClearRecord]);

  const filteredWorkouts = favoriteWorkouts.filter((workout) =>
    workout.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleWorkoutSelect = (workout: string) => {
    setSelectedWorkout(workout);
    setCustomWorkout('');
    setSearchTerm(workout);
  };

  const handleDateChange = (date: Date) => {
    setRecord({ date });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setRecord({ name: newName });
    setCustomWorkout(newName);
    const isBookmarked = bookmarkedExercises.includes(newName);
    if (isFirstChange) {
      setIsFirstChange(false);
    }
  };

  const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ memo: event.target.value });
  };

  const handleSubmit = async () => {
    const workoutToSave = selectedWorkout || customWorkout;

    const isCardioInput = (input: CardioInput | WeightInput): input is CardioInput => {
      return 'minutes' in input || 'distance' in input;
    };

    const isWeightInput = (input: CardioInput | WeightInput): input is WeightInput => {
      return 'weight' in input || 'reps' in input;
    };

    const isValidRecord = record.record.some((set) => {
      if (isCardioInput(set)) {
        return (set.minutes && set.minutes > 0) || (set.distance && set.distance > 0);
      } else if (isWeightInput(set)) {
        return (set.weight && set.weight > 0) || (set.reps && set.reps > 0);
      }
      return false;
    });

    // 데이터가 없는 경우 빠르게 반환
    if (!record.date || !isValidRecord) {
      console.error('필수 입력 사항 누락:', { workoutToSave, date: record.date, recordLength: record.record.length });
      modal.alert(['운동 이름, 날짜, 세트는 필수 입력 사항입니다.']);
      return;
    }

    const exerciseData = {
      date: new Date(getFormattedDate(record.date)),
      exerciseType: record.exerciseType,
      // name: workoutToSave,
      record: record.record,
      memo: record.memo,
      name: record.name,
    };
    // 상태 초기화

    try {
      register(exerciseData, {
        onSuccess: () => {
          setRecord(exerciseInitialState);
          setSearchTerm('');
          setSelectedWorkout('');
          setCustomWorkout('');
          modal.alert(['작성이 완료되었습니다']);
          //TODO: 추후 수정 반영

          router.push('/exercises');
        },
        onError: (error: any) => {
          console.error('등록중 에러발생쓰', error);
        },
      });
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };
  const handleToggleBookmark = (recordToToggle: RecordData) => {
    toggleBookmark(recordToToggle, {
      onSuccess: (data) => {
        setLocalBookmarkedExercises((prev) => {
          if (data.isBookmarked) {
            return [...prev, recordToToggle];
          } else {
            return prev.filter((item) => item.name !== recordToToggle.name);
          }
        });
      },
      onError: (error) => {
        console.error('북마크 토글 실패:', error);
      },
    });
  };

  const bookmarkListOptions = bookmarkData?.map((item) => ({
    value: item.name,
    icon: (
      <Star
        width={20}
        height={20}
        className="cursor-pointer"
        style={{
          fill: localBookmarkedExercises.some((bookmark) => bookmark.name === item.name) ? '#12F287' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleBookmark(item);
        }}
      />
    ),
    onClick: (e: React.MouseEvent) => {
      clearRecord();
      setRecord(item);
      setIsFirstChange(true);
    },
  }));

  return (
    <Mobile headerLayout={<Header title={`투두 추가하기`} />}>
      <div className="max-h-screen flex flex-col gap-4 p-5">
        <Input
          label="운동 이름"
          placeholder="운동 이름을 입력해 주세요."
          value={record.name}
          onChange={handleNameChange}
          inputType="select"
          dropdownOptions={bookmarkListOptions}
          autoComplete="off"
          icon={
            <Star
              style={{
                fill: localBookmarkedExercises.some((bookmark) => bookmark.name === record.name) ? '#12F287' : 'none',
              }}
              className="cursor-pointer"
              width={20}
              height={20}
              onClick={(e) => {
                e.stopPropagation();
                if (record.name) {
                  handleToggleBookmark(record);
                }
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
        <Input
          label="날짜 선택"
          inputType="date"
          value={record.date}
          onChange={handleDateChange}
          className="p-2 rounded"
        />
        <Input
          label="메모"
          placeholder="주의사항, 다짐 등을 작성해 주세요"
          value={record.memo}
          onChange={handleMemoChange}
          className="p-4 rounded-lg"
          icon={<Memo width={20} height={20} />}
        />
        <ExerciseRecordForm />
        <Button className="mt-4" type="submit" disabled={isPending} onClick={handleSubmit}>
          등록하기
        </Button>
      </div>
    </Mobile>
  );
};

export default ExerciseRecordPage;

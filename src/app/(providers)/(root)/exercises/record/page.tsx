'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { exerciseInitialState } from '@/data/exerciseInitialState';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import { useGetExerciseBookmarks, useRegisterExercise, useToggleBookmark } from '@/hooks/exercises/useExercise';
import Star from '@/icons/Star';
import Mobile from '@/layouts/Mobile';
import { useExerciseStore } from '@/stores/exercise.store';
import { useQueryClient } from '@tanstack/react-query';

import Header from '@/components/Header';
import Memo from '@/icons/Memo';
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

  const { mutate: register } = useRegisterExercise();
  const { data: bookmarkData } = useGetExerciseBookmarks();
  const { mutate: toggleBookmark } = useToggleBookmark();

  const [isFirstChange, setIsFirstChange] = useState(false);

  useEffect(() => {}, [record.record]);

  const memoizedClearRecord = useCallback(() => {
    clearRecord();
  }, [clearRecord]);

  useEffect(() => {
    memoizedClearRecord();

    return () => {
      memoizedClearRecord();
    };
  }, [memoizedClearRecord]);

  useEffect(() => {
    if (bookmarkData) {
      setBookmarkedExercises(bookmarkData.map((item) => item.exerciseName));
    }
  }, [bookmarkData]);

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
    console.log('선택한 운동 이름:', workoutToSave);
    console.log(new Date(getFormattedDate(record.date)));
    console.log('선택한 날짜:', record.date);
    console.log('메모:', record.name);
    console.log('기록:', record.record);

    // 데이터가 없는 경우 빠르게 반환
    if (!record.date || record.record.length === 0) {
      console.error('필수 입력 사항 누락:', { workoutToSave, date: record.date, recordLength: record.record.length });
      alert('운동 이름, 날짜, 세트는 필수 입력 사항~~');
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
          alert('성공했다!!!!!!!!!!!');
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

  const handleToggleBookmark = (exerciseName: string) => {
    toggleBookmark(exerciseName, {
      onSuccess: () => {
        queryClient.invalidateQueries(ExercisesQueryKeys.bookmark() as any);
      },
      onError: (error) => {
        console.error('북마크 토글 실패:', error);
      },
    });
  };
  const bookmarkListOptions = bookmarkData?.map((item) => {
    return {
      value: item.exerciseName,
      icon: (
        <Star
          width={24}
          height={24}
          className="cursor-pointer"
          style={{
            fill: bookmarkedExercises.includes(item.exerciseName) ? '#12F287' : 'none',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleBookmark(item.exerciseName);
          }}
        />
      ),
      onClick: (e: React.MouseEvent) => {
        setRecord({ name: item.exerciseName });
        setIsFirstChange(true);
      },
    };
  });

  return (
    <Mobile
      headerLayout={
        <Header
          title={`투두 추가하기`}
          // titleIcon={<DownIcon />}
        />
      }
    >
      <div className="max-h-screen flex flex-col gap-4 p-5">
        <Input
          label="운동 이름"
          placeholder="운동 이름을 입력해 주세요."
          value={record.name}
          onChange={handleNameChange}
          inputType="select"
          dropdownOptions={bookmarkListOptions}
          icon={
            <Star
              style={{
                fill: bookmarkedExercises.includes(record.name) ? '#12F287' : 'none',
              }}
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={(e) => {
                e.stopPropagation();
                if (record.name) {
                  handleToggleBookmark(record.name);
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
          icon={<Memo />}
        />
        <ExerciseRecordForm />
        <Button type="submit" onClick={handleSubmit}>
          등록하기
        </Button>
      </div>
    </Mobile>
  );
};

export default ExerciseRecordPage;

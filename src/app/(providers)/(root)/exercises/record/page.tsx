'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { exerciseInitialState } from '@/data/exerciseInitialState';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import { useGetExerciseBookmarks, useRegisterExercise, useToggleBookmark } from '@/hooks/exercises/useExercise';
import Star from '@/icons/Star';
import Mobile from '@/layouts/Mobile';
import { CardioInput, ExerciseRecord, ExerciseType, WeightInput } from '@/types/exercises';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ExerciseRecordForm from './_components/exerciseRecordForm/ExerciseRecordForm';

const ExerciseRecordPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(null);
  const [bookmarkedExercises, setBookmarkedExercises] = useState<number[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [customWorkout, setCustomWorkout] = useState('');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('');
  const [name, setName] = useState('');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<string[]>([]);
  const [record, setRecord] = useState<ExerciseRecord>(exerciseInitialState);
  const [isBookMark, setIsBookMark] = useState(false);

  const { mutate: register } = useRegisterExercise();
  const { data: bookmarkData } = useGetExerciseBookmarks();
  const { mutate: toggleBookmark } = useToggleBookmark();

  const [isFirstChange, setIsFirstChange] = useState(false);
  console.log('@@bookmarkData', bookmarkData);
  useEffect(() => {
    console.log('@@RECORD.', record.record);
  }, [record.record]);

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

  const handleDateChange = (date: Date) => {
    setRecord((prev) => ({
      ...prev,
      date: date,
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
    console.log('선택한 운동 이름:', workoutToSave);
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
      date: record.date,
      exerciseType: record.exerciseType,
      // name: workoutToSave,
      record: record.record,
      memo: record.memo,
      name: record.name,
      isBookMark: isBookMark,
    };
    // 상태 초기화
    setSearchTerm('');
    setSelectedWorkout('');
    setCustomWorkout('');
    setDate('');
    setName('');
    setMemo('');
    console.log('@@RECORD', record);
    setRecord(exerciseInitialState);
    setIsBookMark(false);
    try {
      register(exerciseData, {
        onSuccess: () => {
          alert('성공했다!!!!!!!!!!!');
          //TODO: 추후 수정 반영
          location.reload();
        },
        onError: (error: any) => {
          console.error('등록중 에러발생쓰', error);
        },
      });
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
    <Mobile>
      <div className="min-h-screen flex flex-col gap-5 p-5">
        <h3 className="text-white">운동 이름</h3>
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
        <Input inputType="date" value={record.date} onChange={handleDateChange} className="p-2 rounded" />
        <Input
          placeholder="주의사항, 다짐 등을 작성해 주세요"
          value={record.memo}
          onChange={handleMemoChange}
          className="p-4 rounded-lg"
          icon={<Star width={24} height={24} />}
        />
        <ExerciseRecordForm onChange={handleChange} />
        <Button type="submit" onClick={handleSubmit}>
          등록하기
        </Button>
      </div>
    </Mobile>
  );
};

export default ExerciseRecordPage;

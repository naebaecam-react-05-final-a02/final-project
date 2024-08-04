'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import {
  useGetExerciseBookmarks,
  useGetExerciseRecord,
  useRegisterExercise,
  useToggleBookmark,
} from '@/hooks/exercises/useExercise';
import Star from '@/icons/Star';
import Mobile from '@/layouts/Mobile';
import { useExerciseStore } from '@/stores/exercise.store';
import { ExerciseType } from '@/types/exercises';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ExerciseRecordForm from '../../../../record/_components/exerciseRecordForm/ExerciseRecordForm';

type EditRecordFormProps = {
  exerciseId: string;
};

const EditRecordForm = ({ exerciseId }: EditRecordFormProps) => {
  const queryClient = useQueryClient();
  const { record, setRecord, isBookMark, setIsBookMark } = useExerciseStore();
  const [bookmarkedExercises, setBookmarkedExercises] = useState<number[]>([]);

  const { mutate: register } = useRegisterExercise();
  const { mutate: toggleBookmark } = useToggleBookmark();
  const { data: bookmarkData } = useGetExerciseBookmarks();
  const { data: exerciseData, isLoading } = useGetExerciseRecord(exerciseId);

  useEffect(() => {
    if (bookmarkData) {
      setBookmarkedExercises(bookmarkData.map((item) => item.exercises.id));
    }
  }, [bookmarkData]);

  useEffect(() => {
    if (!isLoading && exerciseData) {
      setRecord({
        date: exerciseData.date,
        name: exerciseData.name,
        memo: exerciseData.memo,
        exerciseType: exerciseData.exerciseType as ExerciseType,
        record: exerciseData.record ? exerciseData.record : [],
      });
    }
  }, [exerciseData, isLoading, setRecord, setIsBookMark]);

  console.log(exerciseData);

  const handleDateChange = (date: Date) => {
    setRecord({ date });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ name: event.target.value });
  };

  const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ memo: event.target.value });
  };

  const handleSubmit = async () => {
    if (!record.date || record.record.length === 0) {
      alert('운동 이름, 날짜, 세트는 필수 입력 사항입니다.');
      return;
    }

    const exerciseData = {
      ...record,
      isBookMark,
    };

    try {
      register(exerciseData, {
        onSuccess: () => {
          alert('수정 성공했습니다!');
          location.reload();
        },
        onError: (error: any) => {
          console.error('수정 중 에러 발생:', error);
        },
      });
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
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
        <h3 className="text-white">날짜 선택</h3>
        <Input inputType="date" value={record.date} onChange={handleDateChange} className="p-2 rounded" />
        <Input
          placeholder="주의사항, 다짐 등을 작성해 주세요"
          value={record.memo}
          onChange={handleMemoChange}
          className="p-4 rounded-lg"
          icon={<Star width={24} height={24} />}
        />
        <ExerciseRecordForm />
        <Button type="submit" onClick={handleSubmit}>
          수정하기
        </Button>
      </div>
    </Mobile>
  );
};

export default EditRecordForm;

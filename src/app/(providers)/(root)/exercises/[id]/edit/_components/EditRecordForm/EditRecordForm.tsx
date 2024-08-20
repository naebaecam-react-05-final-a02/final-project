'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useModal } from '@/contexts/modal.context/modal.context';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import {
  useGetExerciseBookmarks,
  useGetExerciseRecord,
  useToggleBookmark,
  useUpdateExercise,
} from '@/hooks/exercises/useExercise';
import Memo from '@/icons/Memo';
import Star from '@/icons/Star';
import { useExerciseStore } from '@/stores/exercise.store';
import { CardioInput, ExerciseType, RecordData, WeightInput } from '@/types/exercises';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ExerciseRecordForm from '../../../../record/_components/exerciseRecordForm/ExerciseRecordForm';

type EditRecordFormProps = {
  exerciseId: string;
};

const EditRecordForm = ({ exerciseId }: EditRecordFormProps) => {
  const router = useRouter();
  const modal = useModal();
  const queryClient = useQueryClient();
  const { record, setRecord } = useExerciseStore();
  const [bookmarkedExercises, setBookmarkedExercises] = useState<RecordData[]>([]);

  const { mutate: update } = useUpdateExercise();
  const { mutate: toggleBookmark } = useToggleBookmark();
  const { data: bookmarkData } = useGetExerciseBookmarks();
  const { data: exerciseData, isLoading } = useGetExerciseRecord(exerciseId);

  useEffect(() => {
    if (bookmarkData) {
      setBookmarkedExercises(bookmarkData);
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
  }, [exerciseData, isLoading, setRecord]);

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
    // 데이터가 없는 경우 빠르게 반환

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

    if (!record.date || !isValidRecord) {
      modal.alert(['운동 이름, 날짜, 세트는 필수 입력 사항입니다.']);
      return;
    }

    const exerciseData = {
      ...record,
    };
    try {
      update(
        { exerciseData, exerciseId },
        {
          onSuccess: () => {
            modal.alert(['수정에 성공했습니다']);
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

  const handleToggleBookmark = (recordToToggle: RecordData) => {
    toggleBookmark(recordToToggle, {
      onSuccess: (data) => {
        if (data.isBookmarked) {
          setBookmarkedExercises((prev) => [...prev, recordToToggle]);
        } else {
          setBookmarkedExercises((prev) => prev.filter((item) => item.name !== recordToToggle.name));
        }
        queryClient.invalidateQueries(ExercisesQueryKeys.bookmark() as any);
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
        style={{
          fill: bookmarkedExercises.some((bookmark) => bookmark.name === item.name) ? '#12F287' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleBookmark(item);
        }}
      />
    ),
    onClick: (e: React.MouseEvent) => {
      setRecord(item);
    },
  }));

  return (
    <div className="flex flex-col gap-4 p-4 pt-6">
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
              fill: bookmarkedExercises.some((bookmark) => bookmark.name === record.name) ? '#12F287' : 'none',
            }}
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
        수정하기
      </Button>
    </div>
  );
};

export default EditRecordForm;

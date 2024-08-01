'use client';
import Input from '@/components/Input';
import { exerciseInitialState } from '@/data/exerciseInitialState';
import { CardioInput, ExerciseRecord, ExerciseType, WeightInput } from '@/types/exercises';
import React, { useEffect, useState } from 'react';
import ExerciseRecordForm from './_components/exerciseRecordForm/ExerciseRecordForm';
import Star from '@/icons/Star';
import Button from '@/components/Button';
import { useGetExerciseBookmarks, useRegisterExercise } from '@/hooks/exercises/useExercise';
import dropDownOptions from '@/utils/dropDownOptions';
import { 운동북마크반환데이터 } from '@/service/exercise.service';
import { values } from 'lodash';

const ExerciseRecordPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [customWorkout, setCustomWorkout] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<string[]>([]);
  const [record, setRecord] = useState<ExerciseRecord>(exerciseInitialState);
  const [isBookMark, setIsBookMark] = useState(false);
  const { mutate: register } = useRegisterExercise();
  const { data: bookmarkData } = useGetExerciseBookmarks();
  const [testT, setTestT] = useState([]);
  console.log('@@bookmarkData', bookmarkData);
  useEffect(() => {
    console.log('@@RECORD.', record.record);
  }, [record.record]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCustomWorkout(event.target.value);
  };

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

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecord((prev) => ({
      ...prev,
      name: event.target.value,
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
      name: record.name,
      isBookMark: isBookMark,
    };

    try {
      register(exerciseData, {
        onSuccess: () => {
          alert('성공했다!!!!!!!!!!!');
        },
        onError: (error: any) => {
          console.error('등록중 에러발생쓰', error);
        },
      });

      // 상태 초기화
      setSearchTerm('');
      setSelectedWorkout('');
      setCustomWorkout('');
      setDate('');
      setName('');
      setRecord(exerciseInitialState);
      setIsBookMark(false);
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

  const handleToggleBookmark = () => {
    setIsBookMark((prev) => !prev);
  };

  const newBookmarkData = bookmarkData?.map((item) => ({ name: item.exercises.name }));
  // const test = newBookmarkData?.map((item) => ({ value: String(item.exerciseId), label: item.name }));
  // if (test) {
  //   const dropDownProps = dropDownOptions({
  //     options: test,
  //     valueKey: 'value',
  //     labelKey: 'label',
  //     icon: (
  //       <Star
  //         width={24}
  //         height={24}
  //         style={{
  //           fill: isBookMark ? '#12F287' : 'none',
  //         }}
  //       />
  //     ),
  //     handleClick: handleToggleBookmark,
  //   });
  // }
  // if (!test) {
  //   return;
  // }
  // const dropDownProps = dropDownOptions({
  //   options: test,
  //   valueKey: 'value',
  //   labelKey: 'label',
  //   icon: (
  //     <Star
  //       width={24}
  //       height={24}
  //       style={{
  //         fill: `#12f287 ${isBookMark ? '#12F287' : 'none'}`,
  //       }}
  //     />
  //   ),
  //   handleClick: handleToggleBookmark,
  // });

  return (
    <div className="min-h-screen flex flex-col gap-5 p-5">
      <h3 className="text-white">운동 이름</h3>
      <Input
        label="운동 이름"
        // placeholder="운동 이름을 입력해 주세요."
        value={searchTerm}
        // onChange={handleSearchChange}
        isDropdown
        dropdownOptions={['test1', 'test2']}
        icon={
          <Star
            style={{
              fill: isBookMark ? '#12F287' : 'none',
            }}
            width={24}
            height={24}
            onClick={handleToggleBookmark}
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
      <input type="date" value={record.date} onChange={handleDateChange} className="p-2 rounded" />
      <textarea
        placeholder="주의사항, 다짐 등을 작성해 주세요"
        value={record.name}
        onChange={handleNameChange}
        className="p-2 rounded"
      />
      <ExerciseRecordForm onChange={handleChange} />
      <Button type="submit" onClick={handleSubmit}>
        등록하기
      </Button>
    </div>
  );
};

export default ExerciseRecordPage;

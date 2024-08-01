'use client';
import Input from '@/components/Input';
import { exerciseInitialState } from '@/data/exerciseInitialState';
import { CardioInput, ExerciseRecord, ExerciseType, WeightInput } from '@/types/exercises';
import React, { useEffect, useState } from 'react';
import ExerciseRecordForm from './_components/exerciseRecordForm/ExerciseRecordForm';
import Star from '@/icons/Star';

const ExerciseRecordPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [customWorkout, setCustomWorkout] = useState('');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<string[]>([
    '스쿼트',
    '벤치 프레스',
    '데드리프트',
    '덤벨 컬',
    '푸시업',
  ]);
  const [record, setRecord] = useState<ExerciseRecord>(exerciseInitialState);

  const [isBookMark, setIsBookMark] = useState(false);

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

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

    const requestBody = {
      date: record.date,
      exerciseType: record.exerciseType,
      // name: workoutToSave,
      record: record.record,
      name: record.name,
      isBookMark: isBookMark,
    };

    try {
      const response = await fetch('/api/exercises/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'errorrrr');
      }

      const result = await response.json();
      console.log('서버 응답:', result);

      // 상태 초기화
      setSearchTerm('');
      setSelectedWorkout('');
      setCustomWorkout('');
      setDate('');
      setMemo('');
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

  useEffect(() => {
    console.log('@@RECORD.', record.record);
  }, [record.record]);

  return (
    <div className="min-h-screen bg-slate-500 flex flex-col gap-5 p-5">
      <h3 className="text-white">운동 이름</h3>
      <Input
        label="운동 이름"
        placeholder="운동 이름을 입력해 주세요."
        value={searchTerm}
        onChange={handleSearchChange}
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
        onChange={handleMemoChange}
        className="p-2 rounded"
      />
      <ExerciseRecordForm onChange={handleChange} />
      <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mt-2">
        등록하기
      </button>
    </div>
  );
};

export default ExerciseRecordPage;

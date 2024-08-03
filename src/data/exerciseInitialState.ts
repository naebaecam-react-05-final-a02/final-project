import { ExerciseRecord } from '@/types/exercises';
import React from 'react';

export const exerciseInitialState: ExerciseRecord = {
  date: '',
  name: '',
  memo: '',
  record: [],
  exerciseType: 'weight',
};

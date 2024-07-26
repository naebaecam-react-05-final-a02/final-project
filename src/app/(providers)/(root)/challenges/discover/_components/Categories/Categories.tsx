'use client';

import { useState } from 'react';
import CategoryButton from '../CategoryButton';

const Categories = () => {
  const [order, setOrder] = useState('all');

  const buttons = [
    { label: '전체', value: 'all' },
    { label: '운동', value: 'exercise' },
    { label: '수면', value: 'sleep' },
  ];
  const handleClickButton = (value: string) => {
    setOrder(value);
  };

  return (
    <ul className="flex gap-4">
      {buttons.map((button, i) => (
        <li key={i}>
          <CategoryButton {...button} order={order} onClick={handleClickButton} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;

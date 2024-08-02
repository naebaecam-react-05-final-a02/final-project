'use client';

import { useChallengeCategoryStore } from '@/stores/stores';

import { CATEGORIES } from '../../_constants/constants';
import CategoryButton from '../CategoryButton';

const Categories = () => {
  const category = useChallengeCategoryStore((state) => state.category);
  const setCategory = useChallengeCategoryStore((state) => state.setCategory);

  const handleClickButton = (value: string) => {
    setCategory(value);
  };

  return (
    <ul className="flex gap-2">
      {CATEGORIES.map((button, i) => (
        <li key={i}>
          <CategoryButton {...button} category={category} onClick={handleClickButton} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;

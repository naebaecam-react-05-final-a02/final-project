'use client';

import { useChallengeCategoryStore } from '@/stores/stores';

import { CATEGORIES, CategoryTypes } from '../../_constants/constants';
import CategoryButton from '../CategoryButton';

const Categories = () => {
  const category = useChallengeCategoryStore((state) => state.category);
  const setCategory = useChallengeCategoryStore((state) => state.setCategory);

  const handleClickButton = (value: CategoryTypes) => {
    setCategory(value);
  };

  return (
    <ul className="flex gap-2">
      {CATEGORIES.map((button, i) => (
        <li key={button.value}>
          <CategoryButton {...button} category={category} onClick={handleClickButton} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;

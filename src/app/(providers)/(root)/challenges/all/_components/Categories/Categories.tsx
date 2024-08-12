'use client';

import { CATEGORY_LIST } from '@/constants/challenges';
import { useChallengeFilterStore } from '@/stores/challengeFilter.store';
import { CategoryTypes } from '../../_constants/constants';
import CategoryButton from '../CategoryButton';

const Categories = () => {
  const filter = useChallengeFilterStore((state) => state.filter);
  const setFilter = useChallengeFilterStore((state) => state.setFilter);

  const handleClickButton = (value: CategoryTypes) => {
    const newFilter = structuredClone(filter);
    newFilter.categories = [value];
    setFilter(newFilter);
  };

  return (
    <ul className="flex gap-2">
      {CATEGORY_LIST.map((button, i) => (
        <li key={button.value}>
          <CategoryButton {...button} category={filter.categories?.[0]} onClick={handleClickButton} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;

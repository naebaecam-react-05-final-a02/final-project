'use client';

import { CATEGORY_LIST } from '@/constants/challenges';
import { useChallengeFilterStore } from '@/stores/challengeFilter.store';
import { ChallengeCategoryTypes } from '@/types/challenge';
import CategoryButton from '../CategoryButton';

const Categories = () => {
  const filter = useChallengeFilterStore((state) => state.filter);
  const setFilter = useChallengeFilterStore((state) => state.setFilter);

  const handleClickButton = (value: ChallengeCategoryTypes) => {
    const prev = structuredClone(filter);
    if (value === 'all') {
      setFilter({
        ...prev,
        categories: ['all'],
      });
    } else {
      const categories: ChallengeCategoryTypes[] = prev.categories.filter((category) => category !== 'all');
      const newCategories = categories.includes(value as ChallengeCategoryTypes)
        ? categories.filter((category) => category !== value)
        : [...categories, value as ChallengeCategoryTypes];
      setFilter({
        ...prev,
        categories: newCategories.length > 0 ? newCategories : ['all'],
      });
    }
  };

  return (
    <ul className="flex gap-2">
      {CATEGORY_LIST.map((button, i) => (
        <li key={button.value}>
          <CategoryButton {...button} categories={filter.categories} onClick={handleClickButton} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;

'use client';

import { useChallengeFilterStore } from '@/stores/challengeFilter.store';
import { ChallengeCategoryTypes } from '@/types/challenge';
import CategoryLabel from '../CategoryLabel/CategoryLabel';

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
    <ul className="flex flex-wrap gap-2">
      {filter.categories
        .filter((item) => item !== 'all')
        .map((item, i) => {
          return (
            <li key={item}>
              <CategoryLabel label={item} />
            </li>
          );
        })}
      {filter.status
        .filter((item) => item !== 'all')
        .map((item, i) => {
          return (
            <li key={item}>
              <CategoryLabel label={item} />
            </li>
          );
        })}
      {filter.order.map((item, i) => {
        return (
          <li key={item}>
            <CategoryLabel label={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;

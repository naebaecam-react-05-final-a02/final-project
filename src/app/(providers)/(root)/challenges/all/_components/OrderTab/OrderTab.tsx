'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { useChallengeFilterStore } from '@/stores/challengeFilter.store';
import Categories from '../Categories';
import FilterIcon from '../FilterIcon';

const OrderTab = () => {
  const setFilter = useChallengeFilterStore((state) => state.setFilter);
  const modal = useModal();
  const handleClickButton = async () => {
    const filter = await modal.custom.filter();
    if (!filter) return;
    setFilter(filter);
  };

  return (
    <section className="flex justify-between">
      <Categories />
      <FilterIcon onClick={handleClickButton} />
    </section>
  );
};

export default OrderTab;

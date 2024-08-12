'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import Categories from '../Categories';
import FilterIcon from '../FilterIcon';

const OrderTab = () => {
  const modal = useModal();
  const handleClickButton = async () => {
    const filter = await modal.custom.filter();
    console.log(filter);
  };

  return (
    <section className="flex justify-between">
      <Categories />
      <FilterIcon onClick={handleClickButton} />
    </section>
  );
};

export default OrderTab;

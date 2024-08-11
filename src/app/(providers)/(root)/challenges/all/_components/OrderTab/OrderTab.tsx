'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import Categories from '../Categories';
import FilterIcon from '../FilterIcon';

const OrderTab = () => {
  const modal = useModal();
  const handleClickButton = () => {
    modal.confirm({ contents: ['테스트용 모달입니다', '이건 작동하지 않습니다'], onNextEvent: () => {} });
  };

  return (
    <section className="flex justify-between">
      <Categories />
      <FilterIcon onClick={handleClickButton} />
    </section>
  );
};

export default OrderTab;

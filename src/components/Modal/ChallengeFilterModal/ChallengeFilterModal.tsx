'use client';
import CancelSVG from '@/assets/modal/cancel.svg';
import OrderButtonList from '@/components/OrderButtonList/OrderButtonList';
import { CATEGORY_LIST, ORDER_LIST, STATUS_LIST } from '@/constants/challenges';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useChallengeFilterStore } from '@/stores/challengeFilter.store';
import {
  ChallengeCategoryTypes,
  ChallengeFilterInputTypes,
  ChallengeFilterTypes,
  ChallengeOrderTypes,
  ChallengeStatusTypes,
} from '@/types/challenge';
import { useEffect, useState } from 'react';
import Button from '../../Button';
import AnimatedModalFrame from '../AnimatedModalFrame';
interface ChallengeFilterModalProps {
  onSuccess: (filter: ChallengeFilterTypes) => void;
  onCancel: () => void;
  id: string;
}

const ChallengeFilterModal = ({ id, onSuccess, onCancel }: ChallengeFilterModalProps) => {
  const modal = useModal();
  const existingFilter = useChallengeFilterStore((state) => state.filter);
  const [filter, setFilter] = useState<ChallengeFilterTypes>({
    searchValue: '',
    categories: ['all'],
    status: ['all'],
    order: ['startDate'],
  });
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseModal = () => {
    onCancel();
    setIsVisible(false);
    setTimeout(() => {
      modal.close(id);
    }, 300);
  };
  const handleClickConfirm = () => {
    onSuccess(filter);
    setIsVisible(false);
    setTimeout(() => {
      modal.close(id);
    }, 300);
  };

  const handleCategoryChange = (value: ChallengeFilterInputTypes) => {
    if (value === 'all') {
      setFilter((prev) => ({
        ...prev,
        categories: ['all'],
      }));
    } else {
      setFilter((prev) => {
        const categories: ChallengeCategoryTypes[] = prev.categories.filter((category) => category !== 'all');
        const newCategories = categories.includes(value as ChallengeCategoryTypes)
          ? categories.filter((category) => category !== value)
          : [...categories, value as ChallengeCategoryTypes];
        return {
          ...prev,
          categories: newCategories.length > 0 ? newCategories : ['all'],
        };
      });
    }
  };

  const handleStatusChange = (value: ChallengeFilterInputTypes) => {
    if (value === 'all') {
      setFilter((prev) => ({
        ...prev,
        status: ['all'],
      }));
    } else {
      setFilter((prev) => {
        const statuses: ChallengeStatusTypes[] = prev.status.filter((status) => status !== 'all');
        const newStatuses = statuses.includes(value as ChallengeStatusTypes)
          ? statuses.filter((status) => status !== value)
          : [...statuses, value as ChallengeStatusTypes];
        return {
          ...prev,
          status: newStatuses.length > 0 ? newStatuses : ['all'],
        };
      });
    }
  };

  const handleOrderChange = (value: ChallengeFilterInputTypes) => {
    setFilter((prev) => ({ ...prev, order: [value as ChallengeOrderTypes] }));
  };

  useEffect(() => {
    setFilter(existingFilter);
  }, [existingFilter]);

  return (
    <AnimatedModalFrame isVisible={isVisible}>
      <div className="w-full h-full flex flex-col gap-8 justify-between">
        <div className="relative w-full flex justify-center items-center">
          <p className="text-white/70 font-semibold">챌린지 필터</p>
          <button className={'absolute right-2'} onClick={handleCloseModal}>
            <CancelSVG />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-end">
            <p className="text-[14px] text-white font-semibold">카테고리</p>
            <p className="text-[11px] text-white/50">복수선택가능</p>
          </div>
          <OrderButtonList filter={filter} list={CATEGORY_LIST} std="categories" onClick={handleCategoryChange} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-end">
            <p className="text-[14px] text-white font-semibold">진행상태</p>
            <p className="text-[11px] text-white/50">복수선택가능</p>
          </div>
          <OrderButtonList filter={filter} list={STATUS_LIST} std="status" onClick={handleStatusChange} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-end">
            <p className="text-[14px] text-white font-semibold">정렬기준</p>
          </div>
          <OrderButtonList filter={filter} list={ORDER_LIST} std="order" onClick={handleOrderChange} />
        </div>

        <Button className={'w-full h-16'} onClick={handleClickConfirm}>
          적용하기
        </Button>
      </div>
    </AnimatedModalFrame>
  );
};

export default ChallengeFilterModal;

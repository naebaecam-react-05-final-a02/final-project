import {
  ChallengeCategoryTypes,
  ChallengeFilterInputTypes,
  ChallengeFilterStandardTypes,
  ChallengeFilterTypes,
  ChallengeOrderTypes,
  ChallengeStatusTypes,
} from '@/types/challenge';
import { cva } from 'class-variance-authority';

interface ButtonProps {
  label: string;
  value: ChallengeFilterInputTypes;
  filter: ChallengeFilterTypes;
  std: ChallengeFilterStandardTypes;
  onClick: (value: ChallengeCategoryTypes | ChallengeOrderTypes | ChallengeStatusTypes) => void;
}

const orderButtonVariants = cva('text-sm px-2 h-7  border rounded-lg', {
  variants: {
    isSelected: {
      true: 'border-primary-100 text-primary-100',
      false: 'border-white/50 text-white/50',
    },
  },
});

const OrderButton = ({ label, value, filter, std, onClick }: ButtonProps) => {
  const currentFilter = filter[std];

  const isSelected = !!currentFilter.find((item) => item === value);
  return (
    <button onClick={() => onClick(value)} className={orderButtonVariants({ isSelected })}>
      {label}
    </button>
  );
};

export default OrderButton;

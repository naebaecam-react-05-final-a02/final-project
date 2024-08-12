import {
  ChallengeCategoryTypes,
  ChallengeFilterInputTypes,
  ChallengeFilterStandardTypes,
  ChallengeFilterTypes,
  ChallengeOrderTypes,
  ChallengeStatusTypes,
} from '@/types/challenge';
import OrderButton from './OrderButton';

interface OrderButtonListProps {
  filter: ChallengeFilterTypes;
  std: ChallengeFilterStandardTypes;
  list: { label: string; value: ChallengeFilterInputTypes }[];
  onClick: (value: ChallengeCategoryTypes | ChallengeOrderTypes | ChallengeStatusTypes) => void;
}

const OrderButtonList = ({ filter, std, list, onClick }: OrderButtonListProps) => {
  return (
    <div className="flex gap-2">
      {list.map((item) => {
        return (
          <OrderButton
            filter={filter}
            std={std}
            label={item.label}
            value={item.value}
            onClick={onClick}
            key={item.value}
          />
        );
      })}
    </div>
  );
};

export default OrderButtonList;

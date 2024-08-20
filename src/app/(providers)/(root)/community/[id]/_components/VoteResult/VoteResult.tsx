import { VoteItem } from '@/types/community';
import VoteItems from '../VoteItems/VoteItems';

interface VoteResultProps {
  totalVotes: number;
  itemsArray: VoteItem[];
  isVotingStarted: boolean;
  selectedOption: string | null;
  handleOptionChange: (option: string) => void;
}

const VoteResult = ({
  totalVotes,
  itemsArray,
  isVotingStarted,
  selectedOption,
  handleOptionChange,
}: VoteResultProps) => {
  return (
    <div className="w-full text-white flex flex-col gap-4">
      {itemsArray.map((item, index) => (
        <VoteItems
          key={index}
          item={item}
          selectedOption={selectedOption}
          onChange={handleOptionChange}
          isVotingStarted={isVotingStarted}
          totalVotes={totalVotes}
        />
      ))}
    </div>
  );
};
export default VoteResult;

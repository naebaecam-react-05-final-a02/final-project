import { VoteItem } from '@/types/community';

interface VoteItemsProps {
  item: VoteItem;
  selectedOption: string | null;
  onChange: (option: string) => void;
  isVotingStarted: boolean;
  totalVotes: number;
}

const VoteItems = ({ item, selectedOption, onChange, isVotingStarted, totalVotes }: VoteItemsProps) => {
  const percentage = totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0;

  return (
    <div className="mb-4">
      <div className="flex flex-row gap-4 items-end">
        {isVotingStarted && (
          <div className="w-[26px] h-[26px] rounded-full" style={{ border: '2px solid rgba(18, 242, 135, 0.20)' }}>
            <input
              type="radio"
              name="voteOption"
              value={item.text}
              checked={selectedOption === item.text}
              onChange={() => onChange(item.text)}
              className={`appearance-none rounded-full w-5 h-5 border-2 border-[#12F287] bg-white/10 checked:border-[5px] checked:border-primary-100 checked:bg-white`}
              style={{
                width: '22px',
                height: '22px',
                cursor: 'pointer',
                borderRadius: '50%',
                backdropFilter: 'blur(4.285714149475098px)',
              }}
            />
          </div>
        )}
        <div className="flex-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="ml-2 text-[14px] font-medium leading-5" style={{ width: 'calc(100% - 34px)' }}>
              {item.text}
            </h3>
            <span className="text-[12px] font-medium w-6">{item.votes}&nbsp;명</span>
          </div>
          <div
            className="w-full bg-gray-700 rounded-md h-6"
            style={{
              background: 'linear-gradient(180deg, rgba(18, 242, 135, 0.30) 0%, rgba(18, 242, 135, 0.15) 100%)',
            }}
          >
            <div
              className="flex items-center justify-end py-0.5 px-1.5 bg-green-500 h-6 rounded-md text-white/70 text-right text-xs transition-all"
              style={{ width: `${Math.max(percentage, 10)}%` }}
            >
              {percentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VoteItems;

import Input from '@/components/Input';
import { VoteItem } from '../VoteRegisterForm';

type voteItemsProps = {
  items: VoteItem[];
  onItemChange: (index: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
};

const VoteItems = ({ items, onItemChange, onAddItem, onRemoveItem }: voteItemsProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">투표 항목</label>
      {items.map((item, index) => (
        <div key={index} className="flex flex-row justify-center gap-2 items-center mb-2  last-of-type:mb-0">
          <Input
            type="text"
            placeholder={`${index + 1}.항목을 입력하세요.`}
            value={item.text}
            onChange={(e) => onItemChange(index, e.target.value)}
            className="flex-grow py-[14px] px-3 rounded-md text-white text-[14px] font-semibold placeholder-white/40"
            style={{
              background:
                'var(--White_GradientDark, linear-gradient(180deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0.06) 100%))',
            }}
          />
          {index >= 2 ? (
            <button
              type="button"
              onClick={() => onRemoveItem(index)}
              className="flex justify-center items-center text-white/50 text-lg  w-12 h-12"
            >
              x
            </button>
          ) : (
            <span className="flex justify-center items-center text-white/50 text-lg w-12 h-12">•</span> // 쩜 표시
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddItem}
        className="mt-6 w-full p-2 border border-white/20 rounded-md text-white text-[14px]"
      >
        항목 추가하기 +
      </button>
    </div>
  );
};

export default VoteItems;

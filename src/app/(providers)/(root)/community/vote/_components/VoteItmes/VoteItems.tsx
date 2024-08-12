import React from 'react';

type voteItemsProps = {
  items: string[];
  onItemChange: (index: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
};

const VoteItems = ({ items, onItemChange, onAddItem, onRemoveItem }: voteItemsProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">투표 항목</label>
      {items.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            placeholder={`${index + 1}. 항목을 입력하세요.`}
            value={item}
            onChange={(e) => onItemChange(index, e.target.value)}
            className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500"
          />
          <button
            type="button"
            onClick={() => onRemoveItem(index)}
            className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            {items.length > 1 ? '삭제' : '–'}
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAddItem}
        className="mt-4 w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
      >
        세트 추가하기 +
      </button>
    </div>
  );
};

export default VoteItems;

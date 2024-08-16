'use client';

import VoteItems from './VoteItems';

export type VoteItem = {
  text: string;
  votes: number;
};

interface VoteRegisterFormProps {
  voteItems: VoteItem[];
  onChange: (items: VoteItem[]) => void;
}

const VoteRegisterForm = ({ voteItems, onChange }: VoteRegisterFormProps) => {
  return (
    <div className="text-white">
      {/* <VoteTitle title={title} onTitleChange={setTitle} /> */}
      <VoteItems
        items={voteItems}
        onItemChange={(index, text) => {
          onChange(voteItems.map((item, i) => (i === index ? { ...item, text } : item)));
        }}
        onAddItem={() => onChange([...voteItems, { text: '', votes: 0 }])}
        onRemoveItem={(index) => onChange(voteItems.filter((_, i) => i !== index))}
      />
      {/* <button type="submit" className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-md text-white">
        투표 등록하기
      </button> */}
    </div>
  );
};

export default VoteRegisterForm;

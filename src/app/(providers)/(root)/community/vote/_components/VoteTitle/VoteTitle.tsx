import React from 'react';

type VoteTitleProps = {
  title: string;
  onTitleChange: (value: string) => void;
};

const VoteTitle = ({ title, onTitleChange }: VoteTitleProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">투표 주제</label>
      <input
        type="text"
        placeholder="투표 주제를 입력해주세요."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500"
      />
    </div>
  );
};

export default VoteTitle;

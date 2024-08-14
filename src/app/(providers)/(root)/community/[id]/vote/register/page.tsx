'use client';
import React, { useState } from 'react';
import VoteItems from '@/app/(providers)/(root)/community/[id]/vote/_components/VoteItems';
import VoteTitle from '@/app/(providers)/(root)/community/[id]/vote/_components/VoteTitle';

export type VoteItem = {
  text: string;
  votes: number;
};

const VoteRegisterPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<VoteItem[]>([
    { text: '', votes: 0 },
    { text: '', votes: 0 },
  ]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      title,
      items,
    };

    try {
      const response = await fetch('/api/community/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('투표 등록 성공:', result);
      } else {
        console.error('투표 등록 실패:', result.message);
      }
    } catch (error) {
      console.error('투표 등록 중 오류 발생:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-xl font-semibold mb-4">투표</h1>
      <VoteTitle title={title} onTitleChange={setTitle} />
      <VoteItems
        items={items}
        onItemChange={(index, text) => {
          setItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[index] = { ...newItems[index], text };
            return newItems;
          });
        }}
        onAddItem={() => setItems([...items, { text: '', votes: 0 }])}
        onRemoveItem={(index) => setItems(items.filter((_, itemIndex) => itemIndex !== index))}
      />
      <button type="submit" className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-md text-white">
        투표 등록하기
      </button>
    </form>
  );
};

export default VoteRegisterPage;

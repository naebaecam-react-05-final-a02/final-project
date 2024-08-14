'use client';
import React, { useState } from 'react';
import VoteItems from '@/app/(providers)/(root)/community/[id]/vote/_components/VoteItems';
import VoteTitle from '@/app/(providers)/(root)/community/[id]/vote/_components/VoteTitle';
import { usePostVote } from '@/hooks/community/useCommunity';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/modal.context/modal.context';

export type VoteItem = {
  text: string;
  votes: number;
};

const VoteRegisterPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { mutate: postVote } = usePostVote();
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<VoteItem[]>([
    { text: '', votes: 0 },
    { text: '', votes: 0 },
  ]);

  const router = useRouter();
  const modal = useModal();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      title,
      items,
    };

    try {
      postVote(formData, {
        onSuccess: () => {
          modal.alert(['등록되었습니다.']);
          router.push('/community');
        },
      });
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

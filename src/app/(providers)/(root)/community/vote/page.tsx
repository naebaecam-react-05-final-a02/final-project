'use client';
import React, { useState } from 'react';
import VoteItems from './_components/VoteItems';

import VoteTitle from './_components/VoteTitle';

const VotePage = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState(['']);

  // const handleSubmit = () => {
  //   const formData = new FormData();

  //   formData.append('title', title);
  //   formData.append('content', content);
  //   formData.append('items', JSON.stringify(items));

  //   if (image) {
  //     formData.append('image', image);
  //   }

  //   console.log('FormData:', Array.from(formData.entries()));
  //   // 서버로 데이터를 전송하는 코드 추가 가능
  // };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 폼 제출 방지

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
        // 성공 처리 (예: 사용자에게 성공 메시지를 보여주거나, 다른 페이지로 리다이렉트)
      } else {
        console.error('투표 등록 실패:', result.message);
        // 실패 처리 (예: 오류 메시지를 사용자에게 보여줌)
      }
    } catch (error) {
      console.error('투표 등록 중 오류 발생:', error);
      // 오류 처리 (예: 네트워크 오류 처리)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-xl font-semibold mb-4">투표</h1>
      <VoteTitle title={title} onTitleChange={setTitle} />
      <VoteItems
        items={items}
        onItemChange={(index, value) => {
          setItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[index] = value;
            return newItems;
          });
        }}
        onAddItem={() => setItems([...items, ''])}
        onRemoveItem={(index) => setItems(items.filter((_, itemIndex) => itemIndex !== index))}
      />
      <button type="submit" className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-md text-white">
        투표 등록하기
      </button>
    </form>
  );
};

export default VotePage;

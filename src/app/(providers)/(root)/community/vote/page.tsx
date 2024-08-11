'use client';
import React, { useState } from 'react';
import VoteTitle from './_components/VoteTitle';

const VotePage = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState(['']);
  const [image, setImage] = useState<File | null>(null);

  const addItem = () => {
    setItems([...items, '']);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, itemIndex) => itemIndex !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // 제목, 내용 등 다른 폼 데이터는 FormData로 수집
    const title = (e.target as any).title.value;
    const content = (e.target as any).content.value;

    formData.append('title', title);
    formData.append('content', content);
    formData.append('items', JSON.stringify(items)); // JSON 형식으로 투표 항목을 담기

    if (image) {
      formData.append('image', image);
    }

    console.log('FormData:', Array.from(formData.entries()));
    // 여기서 서버로 데이터를 전송할 수 있음
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log('Image selected:', e.target.files[0].name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-xl font-semibold mb-4">투표</h1>
      <VoteTitle title={title} onTitleChange={setTitle} />
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">투표 항목</label>
        {items.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`${index + 1}. 항목을 입력하세요.`}
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded text-white"
            >
              {items.length > 1 ? '삭제' : '–'}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="mt-4 w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
        >
          세트 추가하기 +
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">게시글 내용</label>
        <textarea
          name="content"
          placeholder="글 내용을 입력해주세요."
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 h-32 resize-none"
        />
        <div className="text-right text-gray-500 text-sm">0 / 2000</div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">이미지 추가하기</label>
        <div className="w-full h-32 border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center text-gray-500">
          <label className="cursor-pointer flex flex-col items-center">
            <span className="text-lg">+</span>
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
          {image && <span className="ml-2 text-sm text-gray-400">{image.name}</span>}
        </div>
      </div>

      <button type="submit" className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-md text-white">
        투표 등록하기
      </button>
    </form>
  );
};

export default VotePage;

'use client';

import React, { useState } from 'react';

const ChallengeReviewForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [reviewImages, setReviewImages] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newReview = { content, title };

    const response = await fetch('http://localhost:3000/api/challenges/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      alert(errorResponse.message || '후기 등록에 실패했습니다.');
      return;
    }

    const result = await response.json();
    alert(result.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>제목</label>
      <input type="text" placeholder="제목을 입력하시오" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div>
        별점
        {/*<StartRating rating={rating} setRating={setRating} />*/}
      </div>
      {/*<div>*/}
      {/*  썸네일 이미지 등록*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    placeholder="이미지 URL을 입력하시오"*/}
      {/*    value={reviewImages.join(',')}*/}
      {/*    onChange={(e) => setReviewImages(e.target.value.split(','))}*/}
      {/*  />*/}
      {/*</div>*/}
      <textarea
        name="content"
        placeholder="후기를 작성해 주세요"
        className="w-full h-60"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">등록</button>
    </form>
  );
};

export default ChallengeReviewForm;

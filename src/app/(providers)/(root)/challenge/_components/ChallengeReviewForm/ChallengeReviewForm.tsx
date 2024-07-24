'use client';

import React, { useState } from 'react';
import StarRating from '@/app/(providers)/(root)/challenge/_components/StartRating';

const ChallengeReviewForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 폼 데이터 생성
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    files.forEach(file => formData.append('imageFiles', file));
    console.log('Submitting form data:', { title, content, files });

    try {
      const response = await fetch('/api/challenges/review', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse.message || '후기 등록에 실패했습니다.');
        return;
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error uploading review:', error);
      alert('후기 등록에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>제목</label>
      <input
        type="text"
        placeholder="제목을 입력하시오"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        별점
        <StarRating />
      </div>
      <label>이미지 업로드</label>
      <input type="file" onChange={handleFileChange} />
      <div className="image-previews">
        {previewUrls.map((url, index) => (
          <img key={index} src={url} alt={`Preview ${index}`} className="preview-image" />
        ))}
      </div>
      <textarea
        name="content"
        placeholder="추가 내용을 작성해 주세요"
        className="w-full h-60"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">등록</button>
    </form>
  );
};

export default ChallengeReviewForm;

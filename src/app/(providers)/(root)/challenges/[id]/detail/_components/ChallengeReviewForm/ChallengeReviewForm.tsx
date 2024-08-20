'use client';

import Input from '@/components/Input';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useRegisterReview } from '@/hooks/review/useReview';
import { useParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import StarRating from '../StarRating/StarRating';

export type ReviewFormData = {
  content: string;
  challengeId: string;
  reviewImages: string[] | null;
  title: string;
  rating?: number;
};

const ChallengeReviewForm = () => {
  const params = useParams();
  const modal = useModal();
  const challengeId = params.id as string;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [starRating, setStarRating] = useState(0);
  const { mutate: register, isPending } = useRegisterReview();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    }
  };

  //이미지 지우기
  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    // 파일 입력 필드 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 폼 데이터 생성
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('challengeId', challengeId);
    formData.append('rating', starRating.toString());
    files.forEach((file) => formData.append('reviewImages', file));

    register(formData, {
      onSuccess: () => {
        modal.alert(['등록되었습니다!']);
        //router push 추가
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        type="text"
        placeholder="제목을 입력하시오"
        value={title}
        label="제목"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        별점
        <StarRating onRatingChange={setStarRating} />
      </div>
      <label>이미지 업로드</label>
      <Input type="file" onChange={handleFileChange} ref={fileInputRef} />
      <div className="image-previews h-40 w-full overflow-y-auto flex flex-row gap-3">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <img src={url} alt={`Preview ${index}`} className="preview-image object-cover h-full" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              X
            </button>
          </div>
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

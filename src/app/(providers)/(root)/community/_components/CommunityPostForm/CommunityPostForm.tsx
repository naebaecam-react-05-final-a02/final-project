'use client';

import Button from '@/components/Button';
import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import Input from '@/components/Input';
import { ChangeEvent, FormEvent, useState } from 'react';
import CommunityPostEditor from '../CommunityPostEditor';

const CommunityPostForm = () => {
  const [title, setTitle] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = [{ value: '자유 게시판' }, { value: 'Q&A 게시판' }, { value: '정보공유' }];

  const tagOptions = {
    '자유 게시판': ['오운완', '식단', '동기부여'],
    'Q&A 게시판': ['운동방법', '식단', '보충제/영양제', '장비', '바디프로필', '부상'],
    정보공유: ['운동정보', '식단/영양 정보', '보충제정보', '헬스장/시설 정보', '다이어트/벌크업 경험담'],
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 폼 제출 로직
    console.log({ title, selectedCategory, selectedTags });
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedTags([]);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full px-4 gap-4">
      <Input placeholder="제목" value={title} onChange={handleTitleChange} />
      <Input
        placeholder="카테고리 선택"
        inputType="select"
        readOnly
        dropdownOptions={categories}
        value={selectedCategory}
        onChange={handleCategoryChange}
      />

      {selectedCategory && (
        <div>
          <div className="flex flex-wrap gap-2">
            {tagOptions[selectedCategory as keyof typeof tagOptions]?.map((tag) => (
              <ExerciseChip
                key={tag}
                label={tag}
                isSelected={selectedTags.includes(tag)}
                onClick={() => handleTagToggle(tag)}
              />
            ))}
          </div>
        </div>
      )}

      <CommunityPostEditor />
      <Button type="submit">게시하기</Button>
    </form>
  );
};

export default CommunityPostForm;

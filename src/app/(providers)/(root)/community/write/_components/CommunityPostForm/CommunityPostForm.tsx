'use client';

import Button from '@/components/Button';
import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import Input from '@/components/Input';
import { useCreateCommunityPost } from '@/hooks/community/useCommunity';
import { CommunityPostData } from '@/types/community';
import { ChangeEvent, FormEvent, useState } from 'react';
import validateCommunityPost, { ValidationResult } from '../../../_utils/validateCommunityPost';
import CommunityPostEditor from '../CommunityPostEditor';

const CommunityPostForm = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState('');
  const [isContentValid, setIsContentValid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationResult['errors']>({});

  const { mutate: createPost, isPending, error } = useCreateCommunityPost();

  const categories = [{ value: '자유 게시판' }, { value: 'Q&A 게시판' }, { value: '정보공유' }];

  const tagOptions = {
    '자유 게시판': ['오운완', '식단', '동기부여'],
    'Q&A 게시판': ['운동방법', '식단', '보충제/영양제', '장비', '바디프로필', '부상'],
    정보공유: ['운동정보', '식단/영양 정보', '보충제정보', '헬스장/시설 정보', '다이어트/벌크업 경험담'],
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setIsContentValid(false);
    setSelectedCategory('');
    setSelectedTags([]);
    setValidationErrors({});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData: CommunityPostData = { title, content, category: selectedCategory, tags: selectedTags };
    const { isValid, errors } = validateCommunityPost(postData);

    if (isValid) {
      createPost(postData, {
        onSuccess: () => {
          console.log('게시글이 성공적으로 등록되었습니다.');
          resetForm();
        },
        onError: (error) => {
          console.error('게시글 등록 실패:', error);
        },
      });
    } else {
      setValidationErrors(errors);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setValidationErrors((prev) => ({ ...prev, title: undefined }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedTags([]);
    setValidationErrors((prev) => ({ ...prev, category: undefined }));
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleContentChange = (newContent: string, isValid: boolean) => {
    setContent(newContent);
    setIsContentValid(isValid);
    setValidationErrors((prev) => ({ ...prev, content: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full px-4 gap-4">
      <Input
        label="제목"
        placeholder="제목"
        value={title}
        onChange={handleTitleChange}
        error={validationErrors.title}
      />
      <Input
        label="카테고리"
        placeholder="카테고리 선택"
        inputType="select"
        readOnly
        dropdownOptions={categories}
        value={selectedCategory}
        onChange={handleCategoryChange}
        error={validationErrors.category}
      />

      {selectedCategory && (
        <div>
          <div className="text-white/70 pl-1 pb-1 text-[12px]">
            <span>태그</span>
          </div>
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

      <CommunityPostEditor onContentChange={handleContentChange} />
      {validationErrors.content && <div className="text-red-500 text-sm">{validationErrors.content}</div>}
      <Button type="submit" disabled={!isContentValid || isPending}>
        {isPending ? '게시 중...' : '게시하기'}
      </Button>
      {error && <div className="text-red-500 text-sm">게시글 등록에 실패했습니다. 다시 시도해주세요.</div>}
    </form>
  );
};

export default CommunityPostForm;

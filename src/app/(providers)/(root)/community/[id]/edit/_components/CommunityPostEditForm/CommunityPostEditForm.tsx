'use client';

import Button from '@/components/Button';
import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import Input from '@/components/Input';
import Loading from '@/components/Loading/Loading';
import { useGetCommunityPostDetail, useUpdateCommunityPost } from '@/hooks/community/useCommunity';
import Mobile from '@/layouts/Mobile';
import { CommunityPostUpdateData } from '@/types/community';
import { Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import validateCommunityPost, { ValidationResult } from '../../../../_utils/validateCommunityPost';
import CommunityPostEditor from '../../../../write/_components/CommunityPostEditor';

interface CommunityPostEditFormProps {
  postId: string;
}

const CommunityPostEditForm = ({ postId }: CommunityPostEditFormProps) => {
  const { data: post, isLoading, error } = useGetCommunityPostDetail(postId);
  const { mutate: updatePost, isPending: isUpdating } = useUpdateCommunityPost();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationResult['errors']>({});
  const editorRef = useRef<Editor | null>(null);

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setSelectedCategory(post.category);
      setSelectedTags(post.tags);
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      const isChanged =
        title !== post.title ||
        content !== post.content ||
        selectedCategory !== post.category ||
        JSON.stringify(selectedTags) !== JSON.stringify(post.tags);
      setIsFormChanged(isChanged);
    }
  }, [title, content, selectedCategory, selectedTags, post]);

  const tagOptions = {
    '자유 게시판': ['오운완', '식단', '동기부여'],
    'Q&A 게시판': ['운동 방법', '식단', '보충제/영양제', '장비', '바디프로필', '부상'],
    정보공유: ['운동 정보', '식단/영양 정보', '보충제 정보', '헬스장/시설 정보', '다이어트/벌크업 경험담'],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData: CommunityPostUpdateData = {
      id: postId,
      title,
      content,
      category: selectedCategory,
      tags: selectedTags,
    };
    const { isValid, errors } = validateCommunityPost(postData);

    if (isValid) {
      updatePost(postData, {
        onSuccess: () => {
          router.push(`/community/${postId}`);
        },
        onError: (error) => {
          console.error('게시글 수정 실패:', error);
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

  const handleTagToggle = (tag: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag) ? [] : [tag];
      setValidationErrors((prevErrors) => ({ ...prevErrors, tags: undefined }));
      return newTags;
    });
  };

  const handleContentChange = (newContent: string, isValid: boolean, editor: Editor) => {
    setContent(newContent);
    setValidationErrors((prev) => ({ ...prev, content: undefined }));
    editorRef.current = editor;
  };

  if (isLoading) return <Loading />;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <Mobile>
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
          readOnly
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
                  onClick={(e) => handleTagToggle(tag, e)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="text-white/70 pl-1 pb-1 text-[12px]">
          <span>게시글 내용</span>
        </div>
        <CommunityPostEditor onContentChange={handleContentChange} initialContent={post?.content || ''} />
        {validationErrors.content && <div className="text-red-500 text-sm">{validationErrors.content}</div>}
        <Button type="submit" disabled={!isFormChanged || isUpdating}>
          {isUpdating ? '수정 중...' : '수정하기'}
        </Button>
      </form>
    </Mobile>
  );
};

export default CommunityPostEditForm;

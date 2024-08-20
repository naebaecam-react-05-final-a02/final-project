'use client';

import Button from '@/components/Button';
import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useCreateCommunityPost, usePostVote } from '@/hooks/community/useCommunity';
import { useLevelUp } from '@/hooks/level/useLevel';
import { CommunityPostCreateData } from '@/types/community';
import { Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import validateCommunityPost, { ValidationResult } from '../../../_utils/validateCommunityPost';
import CommunityPostEditor from '../CommunityPostEditor';
import VoteRegisterForm from '../VoteRegisterForm';
import { VoteItem } from '../VoteRegisterForm/VoteRegisterForm';

const CommunityPostForm = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState('');
  const [isContentValid, setIsContentValid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationResult['errors']>({});
  const [voteItems, setVoteItems] = useState<VoteItem[]>([
    { text: '', votes: 0 },
    { text: '', votes: 0 },
  ]);

  const editorRef = useRef<Editor | null>(null);
  const route = useRouter();
  const modal = useModal();

  const { data: user } = useGetUser();
  const { mutateAsync: createPost, isPending, error } = useCreateCommunityPost(selectedCategory);
  const { mutateAsync: postVote } = usePostVote();

  const { mutate: levelUp } = useLevelUp();

  const categories = useMemo(() => {
    const baseCategories = [{ value: '자유 게시판' }, { value: 'Q&A 게시판' }, { value: '정보공유' }];

    if (user?.user_metadata?.role === 'admin') {
      baseCategories.push({ value: '투표' });
    }

    return baseCategories;
  }, [user]);

  const tagOptions = {
    '자유 게시판': ['오운완', '식단', '동기부여'],
    'Q&A 게시판': ['운동 방법', '식단', '보충제/영양제', '장비', '바디프로필', '부상'],
    정보공유: ['운동 정보', '식단/영양 정보', '보충제 정보', '헬스장/시설 정보', '다이어트/벌크업 경험담'],
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setIsContentValid(false);
    setSelectedCategory('');
    setSelectedTags([]);
    setValidationErrors({});
    if (editorRef.current) {
      editorRef.current.commands.clearContent();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData: CommunityPostCreateData = { title, content, category: selectedCategory, tags: selectedTags };
    const { isValid, errors } = validateCommunityPost(postData);

    if (isValid) {
      try {
        const result = await createPost(postData);
        if (selectedCategory === '투표' && voteItems) {
          const voteFormData = {
            title,
            postId: result.data.id,
            items: voteItems,
          };
          await postVote(voteFormData, {
            onSuccess: async () => {
              modal.alert(['게시글이 등록되었습니다.']);
              //LEVEL
              levelUp({ exp: 5 });

              resetForm();
              route.push('/community');
            },
            onError: (error) => {
              console.error('투표 등록 실패:', error);
              modal.alert(['투표 등록에 실패했습니다.']);
            },
          });
        } else {
          modal.alert(['게시글이 등록되었습니다.']);
          //LEVEL

          levelUp({ exp: 5 });

          resetForm();
          route.push('/community');
        }
      } catch (error) {
        console.error('게시글 등록 실패:', error);
        modal.alert(['게시글 등록에 실패했습니다.']);
      }
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
    e.preventDefault(); // 기본 이벤트 동작 방지
    // setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag) ? [] : [tag];
      setValidationErrors((prevErrors) => ({ ...prevErrors, tags: undefined }));
      return newTags;
    });
  };

  const handleContentChange = (newContent: string, isValid: boolean, editor: Editor) => {
    setContent(newContent);
    setIsContentValid(isValid);
    setValidationErrors((prev) => ({ ...prev, content: undefined }));
    editorRef.current = editor;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full min-h-screen  px-4 justify-between ">
      <div className="flex flex-col gap-4">
        <Header title="글쓰기" className="mb-2" />
        <Input
          label="제목"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
          error={validationErrors.title}
          autoComplete="off"
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

        {selectedCategory && selectedCategory !== '투표' && (
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

        {selectedCategory === '투표' && <VoteRegisterForm voteItems={voteItems} onChange={setVoteItems} />}

        <div className="flex flex-col">
          <span className="text-white/70 pl-1 pb-1 text-sm">게시글 내용</span>
          <CommunityPostEditor onContentChange={handleContentChange} />
        </div>
        {validationErrors.content && <div className="text-red-500 text-sm">{validationErrors.content}</div>}
      </div>
      <div className="my-10">
        <Button type="submit" disabled={!isContentValid || isPending}>
          {isPending ? '게시 중...' : '등록하기'}
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm">게시글 등록에 실패했습니다. 다시 시도해주세요.</div>}
    </form>
  );
};

export default CommunityPostForm;

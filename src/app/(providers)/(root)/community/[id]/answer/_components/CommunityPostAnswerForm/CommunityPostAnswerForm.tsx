'use client';

import Button from '@/components/Button';
import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import Header from '@/components/Header';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useCreateAnswer, useGetCommunityPostDetail } from '@/hooks/community/useCommunity';
import { useLevelUp } from '@/hooks/level/useLevel';
import { useCreateNotification } from '@/hooks/notifications/useNotifications';
import { CommunityPostData } from '@/types/community';
import { makeNotificationData } from '@/utils/notificationTypeConverter';
import { Editor } from '@tiptap/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import CommunityPostEditor from '../../../../write/_components/CommunityPostEditor';

interface CommunityPostAnswerFormProps {
  postId: string;
  initialData: CommunityPostData;
}

const CommunityPostAnswerForm = ({ postId, initialData }: CommunityPostAnswerFormProps) => {
  const { mutate: createNotification } = useCreateNotification();
  const { data: post, isLoading, error } = useGetCommunityPostDetail(postId, initialData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isContentValid, setIsContentValid] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const { mutateAsync: createAnswer, isPending } = useCreateAnswer();
  const { mutate: levelUp } = useLevelUp();

  const router = useRouter();
  const modal = useModal();
  if (isLoading) return <Loading />;

  if (error) return <div className="text-center py-10 text-red-500">게시글을 불러오는데 실패했습니다.</div>;
  if (!post) return <div className="text-center py-10">게시글을 찾을 수 없습니다.</div>;

  const handleContentChange = (newContent: string, isValid: boolean, editor: Editor) => {
    setContent(newContent);
    setIsContentValid(isValid);
    editorRef.current = editor;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isContentValid) {
      modal.alert(['답변 내용을 입력해주세요.']);
      return;
    }

    try {
      await createAnswer({
        questionId: postId,
        content: content,
      });
      createNotification(makeNotificationData({ type: 'community', category: 'reply' }, post.user.id, postId));
      //LEVEL
      levelUp({ exp: 10 });
      modal.alert(['답변이 등록되었습니다.']);

      router.push(`/community/${postId}`);
    } catch (error) {
      console.error('답변 등록 실패:', error);
      modal.alert(['답변 등록에 실패했습니다.']);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative min-h-screen overflow-hidden max-w-[800px] flex flex-col mx-auto text-white px-4"
    >
      <Header title={`Q&A 답변등록`} />
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMenuOpen(false)} />}

      <div className="flex flex-col mt-6">
        <div className="text-white/70 pl-1 pb-1 text-[12px]">
          <span>답변 내용</span>
        </div>
        <CommunityPostEditor onContentChange={handleContentChange} />
      </div>
      <div className="px-4 mt-6">
        <Button
          style={{
            background: isContentValid
              ? ''
              : 'radial-gradient(50% 50% at 49.54% 100%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(18, 242, 135, 0.15)',
          }}
        >
          답변 등록하기
        </Button>
      </div>
      <div
        className="h-[1px] bg-whiteT-20 my-6 "
        style={{
          boxShadow: '0px 1px 2px 0px rgba(255, 255, 255, 0.10), 0px -2px 4px 0px rgba(0, 0, 0, 0.70)',
        }}
      />

      <article className="mb-[40px]">
        <header className="flex w-full items-center justify-between mb-4">
          <div className="flex items-center">
            <figure className="relative w-[36px] h-[36px]">
              <Image
                src={post.user.profileURL ?? '/user/default-avatar.png'}
                alt={`${post.user.nickname}의 프로필 이미지`}
                fill
                className="object-cover rounded-full"
              />
            </figure>
            <figcaption className="flex flex-col pl-2 gap-1">
              <span className="text-whiteT-70 text-lg font-medium leading-tight">{post.user.nickname}</span>
              <div className="flex gap-2 text-whiteT-50 text-sm font-normal items-center">
                {post.createdAt && (
                  <time className="leading-[18px]">{dayjs(post.createdAt).format('YYYY. MM. DD')}</time>
                )}
                <div className="w-px h-2 bg-whiteT-10" aria-hidden="true" />
                <div className="flex gap-1">
                  <span>조회수</span>
                  <span>{post.views}</span>
                </div>
              </div>
            </figcaption>
          </div>
        </header>

        <h1 className="rounded-[0px_16px_16px_16px] border-2 border-whiteT-10 my-page-intro-bg to-white/6 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.40)] px-4 py-2 text-whiteT-70 text-[16px] font-semibold mb-6">
          {post.title}
        </h1>
        <div className="border header-gradient bg-whiteT-3 backdrop-blur-md rounded-lg p-4 pb-6">
          <div
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-normal leading-tight"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="flex flex-wrap gap-2 mt-10">
            {post.tags.map((tag, index) => (
              <ExerciseChip key={index} label={tag} isSelected={true} />
            ))}
          </div>
        </div>
      </article>
    </form>
  );
};
export default CommunityPostAnswerForm;

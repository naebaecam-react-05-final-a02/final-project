'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import Image from 'next/image';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';

interface CommentInputProps {
  onAddComment: (content: string) => void;
}

const CommentInput = ({ onAddComment }: CommentInputProps) => {
  const [newComment, setNewComment] = useState('');
  const { data: user } = useGetUser();

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="flex gap-2 w-full relative mb-6">
      <figure className="relative w-[36px] h-[36px]">
        <Image
          src={user?.profileURL ?? '/user/default-avatar.png'}
          alt={`${user?.nickname}의 프로필 이미지`}
          fill
          className="object-cover rounded-full"
        />
      </figure>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full bg-transparent rounded-lg bg-input-gradient pl-3 py-[10px] pr-[76px] border-2 border-whiteT-10 justify-start items-center gap-2 focus:outline-none text-[14px]"
        placeholder="댓글을 입력해주세요."
      />
      <button
        onClick={handleAddComment}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-70 font-semibold text-[12px] flex items-center"
      >
        등록하기
        <FaChevronRight className="ml-1 flex justify-center items-center" />
      </button>
    </div>
  );
};

export default CommentInput;

'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useChallengeDelete } from '@/hooks/challenge/useChallenge';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import FormImageUploader from '../../../../_components/FormImageUploader';
import FormTextArea from '../../../../_components/FormTextArea';
import FormCalendar from '../../../../register/_components/FormCalendar';
import FormCategory from '../../../../register/_components/FormCategory';

type ChallengeUpdateProps = {
  challenge: Tables<'challenges'>;
};

const ChallengeUpdate = ({ challenge }: ChallengeUpdateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { mutate: challengeDelete } = useChallengeDelete();

  console.log('challenge___', challenge);

  const handleDelete = () => {
    challengeDelete(challenge.id, {
      onSuccess: () => {
        router.replace('/challenges/discover');
      },
    });
  };

  return (
    <form className="flex flex-col gap-y-4 w-full px-4">
      <div className="select-none">
        <Input
          label="챌린지 이름"
          name="title"
          placeholder="최대 12글자로 작성해 주세요."
          defaultValue={challenge.title}
        />
      </div>

      {<FormCategory label="카테고리" name="category" defaultValue={challenge.category} />}

      <FormTextArea
        maxLength={200}
        label="챌린지 내용 & 인증 방법"
        name="content"
        placeholder="챌린지 내용과 인증 방법을 작성해 주세요."
        defaultValue={challenge.content}
      />

      <FormCalendar s={challenge.startDate} e={challenge.endDate} />

      <div className="grid gap-y-4">
        <FormImageUploader ref={inputRef} src={challenge.imageURL} />
        <div className="text-white/50 flex gap-x-1">
          <AiOutlineExclamationCircle />
          <p className="text-xs"> 홍보를 위한 썸네일 이미지를 함께 업로드 해주세요!</p>
        </div>
      </div>

      <div className="flex gap-x-2">
        <Button type="submit" className="select-none">
          수정하기
        </Button>
        <Button onClick={() => handleDelete()} className="select-none">
          삭제하기
        </Button>
      </div>
    </form>
  );
};

export default ChallengeUpdate;

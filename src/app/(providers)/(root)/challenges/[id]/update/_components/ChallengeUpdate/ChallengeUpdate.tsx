'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useChallengeDelete, useChallengeUpdate } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import FormImageUploader from '../../../../_components/FormImageUploader';
import FormTextArea from '../../../../_components/FormTextArea';
import { FormFields } from '../../../../register/_components/ChallengeRegisterForm/ChallengeRegisterForm';
import FormCalendar from '../../../../register/_components/FormCalendar';
import FormCategory from '../../../../register/_components/FormCategory';

type ChallengeUpdateProps = {
  challenge: Tables<'challenges'>;
};

const ChallengeUpdate = ({ challenge }: ChallengeUpdateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { mutate: imageUpload } = useImageUpload();
  const { mutate: challengeDelete } = useChallengeDelete();
  const { mutate: challengeUpdate } = useChallengeUpdate();

  // console.log('challenge___', challenge);

  const handleDelete = () => {
    challengeDelete(challenge.id, {
      onSuccess: () => {
        router.replace('/challenges');
      },
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = inputRef?.current?.files?.[0] || null;

    if (!file && !challenge.imageURL) {
      console.error('Challenge Register Image Error : 사진을 올려주세요.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const fields: (keyof FormFields)[] = ['title', 'content', 'startDate', 'endDate', 'category'];
    const formFields: Partial<FormFields> = {};

    for (const field of fields) {
      const value = formData.get(field);
      if (typeof value !== 'string' || value.trim() === '') {
        console.error(`Challenge Register ${field} Error : ${field}을(를) 입력 해주세요.`);
        return;
      }
      formFields[field] = value.trim();
    }

    const { title, content, startDate, endDate, category } = formFields as FormFields;

    if (file) {
      const form = new FormData();
      form.append('file', file);
      imageUpload(
        { storage: 'challengeRegister', form },
        {
          onSuccess: (response) => {
            const updateData: Omit<Tables<'challenges'>, 'id'> = {
              title,
              content,
              startDate,
              endDate,
              isProgress: challenge.isProgress,
              createdBy: challenge.createdBy,
              imageURL: response.imageURL,
              verify: null,
              tags: null,
              rating: 0,
              category,
              participants: challenge.participants,
            };
            challengeUpdate(
              { updateData, cid: challenge.id },
              {
                onSuccess: () => {
                  alert('수정이 완료되었습니다.');
                  router.replace(`/challenges`);
                },
              },
            );
          },
        },
      );
    } else if (challenge.imageURL) {
      const updateData: Omit<Tables<'challenges'>, 'id'> = {
        title,
        content,
        startDate,
        endDate,
        isProgress: challenge.isProgress,
        createdBy: challenge.createdBy,
        imageURL: challenge.imageURL,
        verify: null,
        tags: null,
        rating: 0,
        category,
        participants: challenge.participants,
      };
      challengeUpdate(
        { updateData, cid: challenge.id },
        {
          onSuccess: () => {
            alert('수정이 완료되었습니다.');
            router.replace(`/challenges`);
          },
        },
      );
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full px-4">
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

      <FormCalendar s={new Date(challenge.startDate)} e={new Date(challenge.endDate)} />

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

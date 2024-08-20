'use client';

import Button from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { initialChallengeError } from '@/data/challenges';
import { useChallengeUpdate } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { queryClient } from '@/providers/QueryProvider';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import CallengeCategory from '../../../../_components/CallengeCategory';
import ChallengeInput from '../../../../_components/ChallengeInput';
import FormImageUploader from '../../../../_components/FormImageUploader';
import { FormFields } from '../../../../_types/types';
import { formattingChallengeError } from '../../../../_utils/formattingError';
import FormCalendar from '../../../../register/_components/FormCalendar';

type ChallengeUpdateProps = {
  challenge: Tables<'challenges'>;
};

const ChallengeUpdate = ({ challenge }: ChallengeUpdateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const modal = useModal();
  const [err, setErr] = useState(initialChallengeError);
  const [isImageDel, setIsImageDel] = useState<boolean>(false);

  const { mutate: imageUpload, isPending: uploading } = useImageUpload();
  const { mutate: challengeUpdate, isPending: updating } = useChallengeUpdate();

  // console.log('challenge___', challenge);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = inputRef?.current?.files;

    if (isImageDel || (!challenge.imageURL.length && !files?.length)) {
      console.error('Challenge Register Image Error : 사진을 올려주세요.');
      setErr((prev) => ({ ...prev, image: `사진을(를) 등록해 주세요.` }));
      return;
    }

    const formData = new FormData(e.currentTarget);
    const fields: (keyof FormFields)[] = ['title', 'content', 'startDate', 'endDate', 'category'];
    const formFields: Partial<FormFields> = {};

    for (const field of fields) {
      const value = formData.get(field);
      if (typeof value !== 'string' || value.trim() === '') {
        console.error(`Challenge Register ${field} Error : ${formattingChallengeError(field)}`);
        setErr((prev) => ({ ...prev, [field]: `${formattingChallengeError(field)}` }));
        return;
      }
      formFields[field] = value.trim();
    }

    const { title, content, startDate, endDate, category } = formFields as FormFields;

    const response = await modal.confirm(['수정하시겠습니까?']);
    if (response) {
      if (files) {
        const form = new FormData();
        Array.from(files).forEach((filee, i) => {
          form.append(`file[${i}]`, filee);
        });

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
                imageURL: response.imageURLs[0],
                tags: null,
                rating: 0,
                category,
                participants: challenge.participants,
                verifications: challenge.verifications,
              };
              challengeUpdate(
                { updateData, cid: challenge.id },
                {
                  onSuccess: () => {
                    modal.alert(['수정하였습니다.']);
                    queryClient.invalidateQueries({ queryKey: ['joinedChallenge'] });
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
          // imageURL: '/OOSIE.png',
          imageURL: challenge.imageURL,
          tags: null,
          rating: 0,
          category,
          participants: challenge.participants,
          verifications: challenge.verifications,
        };
        challengeUpdate(
          { updateData, cid: challenge.id },
          {
            onSuccess: () => {
              modal.alert(['수정하였습니다.']);
              queryClient.invalidateQueries({ queryKey: ['joinedChallenge'] });
              router.replace(`/challenges`);
            },
          },
        );
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full ">
      {(uploading || updating) && <Loading />}
      <CallengeCategory defaultValue={challenge.category} />

      <ChallengeInput
        label="챌린지 이름"
        name="title"
        placeholder="최대 12글자로 작성해 주세요."
        error={err['title']}
        errorHandler={setErr}
        defaultValue={challenge.title}
      />

      <ChallengeInput
        maxLength={200}
        rows={6}
        label="챌린지 내용 & 인증 방법"
        name="content"
        placeholder="챌린지 내용과 인증 방법을 작성해 주세요."
        error={err['content']}
        errorHandler={setErr}
        defaultValue={challenge.content}
      />

      <FormCalendar s={new Date(challenge.startDate)} e={new Date(challenge.endDate)} />

      <div className="grid gap-y-4">
        <FormImageUploader
          ref={inputRef}
          src={[challenge.imageURL]}
          error={err['image']}
          errorHandler={setErr}
          setIsImageDel={setIsImageDel}
        />
        <div className="text-white/50 flex gap-x-1">
          <AiOutlineExclamationCircle />
          <p className="text-xs"> 홍보를 위한 썸네일 이미지를 함께 업로드 해주세요!</p>
        </div>
      </div>

      <div className="flex-1 ">
        <Button type="submit" className="select-none">
          수정하기
        </Button>
      </div>
    </form>
  );
};

export default ChallengeUpdate;

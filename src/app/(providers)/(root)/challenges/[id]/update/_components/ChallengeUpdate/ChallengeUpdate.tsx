'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading/Loading';
import { categoryItemsENGtoKOR, initialChallengeError } from '@/data/challenges';
import { useChallengeDelete, useChallengeUpdate } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { queryClient } from '@/providers/QueryProvider';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import CallengeCategory from '../../../../_components/CallengeCategory';
import FormImageUploader from '../../../../_components/FormImageUploader';
import { FormFields } from '../../../../register/_components/ChallengeRegisterForm/ChallengeRegisterForm';
import FormCalendar from '../../../../register/_components/FormCalendar';

type ChallengeUpdateProps = {
  challenge: Tables<'challenges'>;
};

const ChallengeUpdate = ({ challenge }: ChallengeUpdateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [err, setErr] = useState(initialChallengeError);

  const [cate, setCate] = useState<string>(categoryItemsENGtoKOR[challenge.category]);
  const { mutate: imageUpload, isPending: uploading } = useImageUpload();
  const { mutate: challengeDelete, isPending: deleting } = useChallengeDelete();
  const { mutate: challengeUpdate, isPending: updating } = useChallengeUpdate();

  // console.log('challenge___', challenge);

  const handleDelete = () => {
    if (confirm('삭제하시겠습니까?')) {
      challengeDelete(challenge.id, {
        onSuccess: () => {
          alert('삭제하였습니다.');
          queryClient.invalidateQueries({ queryKey: ['joinedChallenge'] });
          router.replace('/challenges');
        },
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(initialChallengeError);
    const files = inputRef?.current?.files;

    if (!files || (!files.length && !challenge.imageURL)) {
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
        console.error(`Challenge Register ${field} Error : ${field}을(를) 입력 해주세요.`);
        setErr((prev) => ({ ...prev, [field]: `${field}을(를) 입력 해주세요.` }));
        return;
      }
      formFields[field] = value.trim();
    }

    const { title, content, startDate, endDate, category } = formFields as FormFields;

    if (confirm('수정하시겠습니까?')) {
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
                    alert('수정하였습니다.');
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
              alert('수정하였습니다.');
              queryClient.invalidateQueries({ queryKey: ['joinedChallenge'] });
              router.replace(`/challenges`);
            },
          },
        );
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full px-4">
      {(uploading || updating || deleting) && <Loading />}
      <CallengeCategory defaultValue={challenge.category} />
      <div className="select-none">
        <Input
          label="챌린지 이름"
          name="title"
          placeholder="최대 12글자로 작성해 주세요."
          defaultValue={challenge.title}
          error={err['title']}
        />
      </div>

      {/* <Input
        readOnly
        inputType="select"
        dropdownOptions={categoryOptions}
        name="category"
        value={cate}
        onChange={(e) => setCate(e.target.value)}
      /> */}
      {/* <FormCategory label="카테고리" name="category" defaultValue={challenge.category} /> */}

      <div className="select-none">
        <Input
          label="챌린지 내용 & 인증 방법"
          name="content"
          placeholder="챌린지 내용과 인증 방법을 작성해 주세요."
          defaultValue={challenge.content}
          error={err['content']}
        />
      </div>

      {/* <FormTextArea
        maxLength={200}
        label="챌린지 내용 & 인증 방법"
        name="content"
        placeholder="챌린지 내용과 인증 방법을 작성해 주세요."
        defaultValue={challenge.content}
      /> */}

      <FormCalendar s={new Date(challenge.startDate)} e={new Date(challenge.endDate)} />

      <div className="grid gap-y-4">
        <FormImageUploader ref={inputRef} src={[challenge.imageURL]} error={err['image']} />
        <div className="text-white/50 flex gap-x-1">
          <AiOutlineExclamationCircle />
          <p className="text-xs"> 홍보를 위한 썸네일 이미지를 함께 업로드 해주세요!</p>
        </div>
      </div>

      <div className="flex gap-x-2">
        <Button type="submit" className="select-none">
          수정하기
        </Button>
        <Button onClick={() => handleDelete()} type="button" className="select-none">
          삭제하기
        </Button>
      </div>
    </form>
  );
};

export default ChallengeUpdate;

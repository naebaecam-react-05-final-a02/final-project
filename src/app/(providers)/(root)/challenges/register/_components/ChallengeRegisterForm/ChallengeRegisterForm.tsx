'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading/Loading';
import { initialChallengeError } from '@/data/challenges';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeRegister } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import CallengeCategory from '../../../_components/CallengeCategory';
import FormImageUploader from '../../../_components/FormImageUploader';
import FormCalendar from '../FormCalendar';

export interface FormFields {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  category: string;
}

const ChallengeRegisterForm = () => {
  const router = useRouter();
  const [cate, setCate] = useState<string>('운동');
  const [err, setErr] = useState(initialChallengeError);

  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: challengeRegister, isPending } = useChallengeRegister();

  const inputRef = useRef<HTMLInputElement>(null);

  // console.log(err);
  //TODO Rating, Tags 생각..?
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(initialChallengeError);
    const files = inputRef?.current?.files;

    if (!files || !files.length) {
      console.error('Challenge Register Image Error : 사진을 등록해 주세요.');
      setErr((prev) => ({ ...prev, image: `사진을(를) 등록해 주세요.` }));
      return;
    }

    const formData = new FormData(e.currentTarget);
    console.log(formData.get('category'));
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

    const form = new FormData();
    Array.from(files).forEach((filee, i) => {
      form.append(`file[${i}]`, filee);
    });

    if (confirm('등록하시겠습니까?')) {
      upload(
        { storage: 'challengeRegister', form },
        {
          onSuccess: async (response) => {
            console.log(response);
            const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);
            const registerData: Omit<Tables<'challenges'>, 'id'> = {
              title,
              content,
              startDate,
              endDate,
              isProgress: today == startDate,
              createdBy: user?.id!,
              imageURL: response.imageURLs[0],
              verify: null,
              tags: null,
              rating: 0,
              category,
              participants: 0,
            };
            // console.log('registerData', registerData);
            challengeRegister(registerData, {
              onSuccess: () => {
                alert('등록되었습니다.');
                console.log('Challenge Register Successfully');
                router.push('/challenges');
              },
              onError: (error) => {
                alert('등록에 실패하였습니다.');
                console.error('Chaalenge Register Failed', error);
              },
            });
          },
          onError: (error) => {
            alert('이미지 업로드에 실패하였습니다.');
            console.error('UPLOAD FAILED', error);
          },
        },
      );
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full px-4">
      {(uploading || isPending) && <Loading />}

      <CallengeCategory />

      <div className="select-none">
        <Input label="챌린지 이름" name="title" placeholder="최대 12글자로 작성해 주세요." error={err['title']} />
      </div>

      {/* <Input
        label="카테고리"
        readOnly
        inputType="select"
        dropdownOptions={categoryOptions}
        name="category"
        value={cate}
        onChange={(e) => setCate(e.target.value)}
      /> */}

      {/* {<FormCategory label="카테고리" name="category" />} */}

      <div className="select-none">
        <Input
          label="챌린지 내용 & 인증 방법"
          name="content"
          placeholder="챌린지 내용과 인증 방법을 작성해주세요."
          error={err['content']}
        />
      </div>

      {/* <FormTextArea
        maxLength={200}
        label="챌린지 내용 & 인증 방법"
        name="content"
        placeholder="챌린지 내용과 인증 방법을 작성해 주세요."
      /> */}

      <FormCalendar />

      <div className="grid gap-y-4">
        <FormImageUploader ref={inputRef} error={err['image']} />
        <div className="text-white/50 flex gap-x-1">
          <AiOutlineExclamationCircle />
          <p className="text-xs"> 홍보를 위한 썸네일 이미지를 함께 업로드 해주세요!</p>
        </div>
      </div>
      <Button type="submit" className="select-none">
        챌린지 등록하기
      </Button>
    </form>
  );
};

export default ChallengeRegisterForm;

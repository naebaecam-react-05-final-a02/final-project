'use client';

import Button from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { initialChallengeError } from '@/data/challenges';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeJoin, useChallengeRegister } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import CallengeCategory from '../../../_components/CallengeCategory';
import ChallengeInput from '../../../_components/ChallengeInput';
import FormImageUploader from '../../../_components/FormImageUploader';
import { FormFields } from '../../../_types/types';
import { formattingChallengeError } from '../../../_utils/formattingError';
import FormCalendar from '../FormCalendar';

const ChallengeRegisterForm = () => {
  const router = useRouter();
  const modal = useModal();
  const [err, setErr] = useState(initialChallengeError);
  const [isImageDel, setIsImageDel] = useState<boolean>(false);

  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: challengeRegister, isPending } = useChallengeRegister();
  const { mutate: joinChallenge } = useChallengeJoin();

  const inputRef = useRef<HTMLInputElement>(null);
  const isClickedFirst = useRef(false);

  const beforeUnloadHandler = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
  }, []);

  const handlePopState = useCallback(async () => {
    const res = await modal.confirm(['뒤로 가시겠습니까?', '작성한 내용이 저장되지 않습니다..!']);
    if (!res) {
      history.pushState(null, '', '');
      return;
    }
    history.back();
  }, [modal]);

  useEffect(() => {
    if (!isClickedFirst.current) {
      history.pushState(null, '', '');
      isClickedFirst.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [beforeUnloadHandler]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = inputRef?.current?.files;

    if (isImageDel || !files || !files.length) {
      console.error('Challenge Register Image Error : 사진을 등록해 주세요.');
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

    const form = new FormData();
    Array.from(files).forEach((filee, i) => {
      form.append(`file[${i}]`, filee);
    });

    const response = await modal.confirm(['등록하시겠습니까?']);
    if (response) {
      upload(
        { storage: 'challengeRegister', form },
        {
          onSuccess: async (response) => {
            const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);
            const registerData: Omit<Tables<'challenges'>, 'id'> = {
              title,
              content,
              startDate,
              endDate,
              isProgress: today == startDate ? 'RUN' : 'LF',
              createdBy: user?.id!,
              imageURL: response.imageURLs[0],
              tags: null,
              rating: 0,
              category,
              participants: 0,
              verifications: 0,
            };
            // console.log('registerData', registerData);
            challengeRegister(registerData, {
              onSuccess: (response) => {
                const cid = response.data[0].id;
                // console.log('CID___', cid);
                joinChallenge(cid, {
                  onSuccess: () => {
                    modal.alert(['등록 및 신청되었습니다.']);
                  },
                  onError: (error) => {
                    console.error(error);
                    modal.alert(['등록하였으나 신청에 실패하였습니다.']);
                  },
                  onSettled: () => {
                    router.replace(`/challenges/${cid}/detail`);
                  },
                });
              },
              onError: (error) => {
                modal.alert(['등록에 실패하였습니다.']);
                console.error('Challenge Register Failed', error);
              },
            });
          },
          onError: (error) => {
            modal.alert(['파일 형식이나 크기를 확인해주세요.']);
            console.error('UPLOAD FAILED', error);
          },
        },
      );
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full px-4 select-none">
      {(uploading || isPending) && <Loading />}

      <div className="flex flex-col gap-y-4  ">
        <CallengeCategory />

        <ChallengeInput
          label="챌린지 이름"
          name="title"
          placeholder="최대 12글자로 작성해 주세요."
          error={err['title']}
          errorHandler={setErr}
        />

        <ChallengeInput
          maxLength={200}
          rows={6}
          label="챌린지 내용 & 인증 방법"
          name="content"
          placeholder="챌린지 내용과 인증 방법을 작성해 주세요."
          error={err['content']}
          errorHandler={setErr}
        />

        <FormCalendar />

        <div className="grid gap-y-4">
          <FormImageUploader ref={inputRef} error={err['image']} errorHandler={setErr} setIsImageDel={setIsImageDel} />
          <div className="text-white/50 flex gap-x-1">
            <AiOutlineExclamationCircle />
            <p className="text-xs"> 홍보를 위한 썸네일 이미지를 함께 업로드 해주세요!</p>
          </div>
        </div>
      </div>

      <Button type="submit" className="select-none">
        챌린지 등록하기
      </Button>
    </form>
  );
};

export default ChallengeRegisterForm;

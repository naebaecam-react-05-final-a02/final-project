'use client';

import FormImageUploader from '@/app/(providers)/(root)/challenges/_components/FormImageUploader';
import FormTextArea from '@/app/(providers)/(root)/challenges/_components/FormTextArea';
import Button from '@/components/Button';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeVerificationRegister } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

type VerificationRegisterProps = {
  cid: string;
  challengeTitle: string;
  verifications: (Tables<'challengeVerify'> & { user: { id: string } })[] | null;
  userInfo: { id: string; profileURL: string | null }[] | null;
};

//TODO 유저 데이터 가져오기전까지 헬린이로 표시되는거 주의
const VerificationRegister = ({ cid, challengeTitle, userInfo }: VerificationRegisterProps) => {
  const [t, setT] = useState<boolean>(false);
  const router = useRouter();
  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: verify, isPending } = useChallengeVerificationRegister();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setT(true);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;
    const files = inputRef?.current?.files;
    console.log('SUBMIT FILES___', files);
    if (!file) {
      console.error('Challenge Verify Image Error : 사진을 올려주세요.');
      return;
    }

    if (!cid) {
      console.error('Challenge Id is invalid', cid);
      return;
    }

    const formData = new FormData(currentTarget);
    const impression = formData.get('impression') as string;

    if (!impression) {
      console.error('Challenge Verify Impression Error : 소감을 작성해주세요.');
      return;
    }

    const form = new FormData();
    form.append('file', file);

    upload(
      { storage: 'challengeVerify', form },
      {
        onSuccess: async (response) => {
          const verifyData: Omit<Tables<'challengeVerify'>, 'id' | 'date'> = {
            impression,
            imageURL: response.imageURL,
            userId: user?.id!,
            challengeId: Number(cid),
          };

          verify(verifyData, {
            onSuccess: () => {
              console.log('Challenge Verify Successfully');
              router.push(`/challenges/${cid}/verification/list`);
            },
            onError: (error) => console.error('Chaalenge Verify Failed', error),
          });
        },
        onError: (error) => console.error('UPLOAD FAILED', error),
      },
    );
  };

  return (
    <>
      {
        <form onSubmit={handleSubmit} className="flex flex-col justify-between size-full p-4 relative">
          {uploading && <div>이미지 업로딩..</div>}
          {isPending && <div>로우딩딩딩..</div>}
          <div className="grid place-items-center gap-y-6">
            <div className="w-full h-24 bg-white/5  text-white flex flex-col items-start justify-center gap-y-4 px-4 rounded-md">
              <h6 className="text-base font-semibold">{challengeTitle}</h6>
              <div className="flex text-sm gap-x-2">
                {userInfo?.length! > 0 && (
                  <div className="flex">
                    오늘 벌써 총<p className="text-primary-100">{`${userInfo?.length}명`}</p>이 인증했어요!
                  </div>
                )}
                {!userInfo?.length && <div>아직 아무도 인증하지 않았네요!</div>}
                <ul className="flex">
                  {userInfo?.slice(0, 3).map((user) => (
                    <li className="rounded-full size-5 bg-gray-300 border border-gray-400 -mr-2 relative" key={user.id}>
                      <Image
                        src={user.profileURL ?? '/default-profile.png'}
                        fill
                        sizes="100"
                        alt={`${user.id}'s profile`}
                        className="object-cover rounded-full"
                      />
                    </li>
                  ))}
                  {userInfo?.length! > 3 && (
                    <li
                      className="rounded-full size-5 bg-gray-300 border border-gray-400 -mr-2 relative font-bold text-xs text-black flex items-center
                justify-center"
                    >
                      {`+${userInfo?.length! - 3 > 10 ? '9' : userInfo?.length! - 3}`}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <div className="flex gap-x-px text-base  pl-1">
                <div className=" text-primary-100">{user?.nickname ?? '헬린이'}</div>
                <div className="text-white">님! 오늘 챌린지는 어땠나요?</div>
              </div>
              <FormTextArea
                label="느낀점"
                maxLength={100}
                name="impression"
                placeholder="오늘의 챌린지 후기를 알려주세요."
              />
            </div>

            <div className="flex flex-col gap-y-4 w-full">
              <div className="text-base text-white ">챌린지 인증 사진을 업로드 해주세요!</div>
              <div className="grid gap-y-4 w-full">
                <FormImageUploader ref={inputRef} label="챌린지 인증 사진 추가하기" />
                <div className="text-white/50 flex gap-x-1">
                  <AiOutlineExclamationCircle />
                  <p className="text-xs"> 최대 3장까지 업로드 가능합니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-5 mt-10">
            <Button className="select-none ">제출하기</Button>
          </div>
        </form>
      }
    </>
  );
};

export default VerificationRegister;

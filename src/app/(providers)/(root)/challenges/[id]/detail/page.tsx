'use client';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeUpdate, useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { useGetReviews } from '@/hooks/review/useReview';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { FormFields } from '../../register/_components/ChallengeRegisterForm/ChallengeRegisterForm';

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const id = parseInt(params.id, 10);
  const { data: user } = useGetUser();
  const { data: challenge } = useGetChallengeDetail(id);
  const { data: reviews } = useGetReviews(id);
  const { mutate: imageUpload } = useImageUpload();
  const { mutate: challengeUpdate } = useChallengeUpdate();
  const router = useRouter();

  //TODO: 로딩
  if (!challenge) {
    return <div>없따!</div>;
  }

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
            };
            challengeUpdate(
              { updateData, cid: challenge.id },
              {
                onSuccess: () => {
                  alert('수정이 완료되었습니다.');
                  router.replace(`/challenges/discover`);
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
      };
      challengeUpdate(
        { updateData, cid: challenge.id },
        {
          onSuccess: () => {
            alert('수정이 완료되었습니다.');
            router.replace(`/challenges/discover`);
          },
        },
      );
    }
  };

  return (
    <div className="h-screen">
      <main className="bg-amber-300 pb-7">
        <div>
          <div className="relative w-full aspect-video">
            <Image src={challenge.imageURL} alt="썸네일 이미지" fill className="object-cover mb-5" />
          </div>
          <section className="flex flex-col gap-9 px-6">
            <div className="mb-9">
              <div className="flex flex-row justify-between items-center ">
                <div>{challenge.title}</div>
                <div>
                  {challenge.startDate} - {challenge.endDate}
                </div>
              </div>
              <p>{challenge.content}</p>
            </div>
            {/* <div>
              <div className="mb-4">참여 인증 방법</div>
              <p>{challenge.verify}</p>
            </div> */}
            <div>
              <div>카테고리</div>
              <p>{challenge.category}</p>
            </div>
            <div>
              <h1>후기</h1>
              <ul className="flex flex-row gap-3 overflow-y-auto py-4">
                {reviews &&
                  reviews.map((review) => (
                    <li
                      key={review.id}
                      className="w-[180px] h-[110px] rounded-2xl border border-gray-100 p-2 bg-white flex-none"
                    >
                      <div className="h-full">
                        <span>{review.rating}</span>
                        <p>{review.title}</p>
                        <div className="overflow-hidden text-ellipsis line-clamp-2">{review.content}</div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <button className="rounded-lg bg-[#3ECF8E] py-2 w-full" type="button">
              챌린지 신청하기
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChallengeDetailPage;

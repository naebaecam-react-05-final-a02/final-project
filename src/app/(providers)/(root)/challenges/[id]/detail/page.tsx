'use client';
import Input from '@/components/Input';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeDelete, useChallengeUpdate, useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { useGetReviews } from '@/hooks/review/useReview';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import FormImageUploader from '../../_components/FormImageUploader';
import FormTextArea from '../../_components/FormTextArea';
import { FormFields } from '../../register/_components/ChallengeRegisterForm/ChallengeRegisterForm';
import FormCalendar from '../../register/_components/FormCalendar';
import FormCategory from '../../register/_components/FormCategory';

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const id = parseInt(params.id, 10);
  const { data: user } = useGetUser();
  const { data: challenge } = useGetChallengeDetail(id);
  const { data: reviews } = useGetReviews(id);
  const { mutate: imageUpload } = useImageUpload();
  const { mutate: challengeUpdate } = useChallengeUpdate();
  const { mutate: challengeDelete } = useChallengeDelete();
  const router = useRouter();

  //TODO: 로딩
  if (!challenge) {
    return <div>없따!</div>;
  }

  const handleDelete = () => {
    console.log('DELETE BUTTON CLICK___');
    challengeDelete(challenge.id, {
      onSuccess: () => {
        alert('챌린지가 삭제되었습니다.');
        router.replace('/challenges/discover');
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
        <form onSubmit={handleSubmit}>
          <div className="relative w-full aspect-video">
            {isUpdate && <FormImageUploader ref={inputRef} src={challenge.imageURL} />}
            {!isUpdate && <Image src={challenge.imageURL} alt="썸네일 이미지" fill className="object-cover mb-5" />}
          </div>
          <section className="flex flex-col gap-9 px-6">
            <div className="mb-9">
              {isUpdate && (
                <div className="flex flex-col gap-y-2">
                  <Input label="수정할 제목" name="title" placeholder="dd" defaultValue={challenge.title} />
                  <FormCalendar s={challenge.startDate} e={challenge.endDate} />
                  <FormTextArea
                    label="수정할 내용"
                    maxLength={300}
                    name="content"
                    placeholder="얍얍"
                    defaultValue={challenge.content}
                  />
                </div>
              )}
              {!isUpdate && (
                <>
                  <div className="flex flex-row justify-between items-center ">
                    <div>{challenge.title}</div>
                    <div>
                      {challenge.startDate} - {challenge.endDate}
                    </div>
                  </div>
                  <p>{challenge.content}</p>
                </>
              )}
            </div>
            {/* <div>
              <div className="mb-4">참여 인증 방법</div>
              {isUpdate && (
                <FormInput label="수정할 인증 방법" name="verify" defaultValue={challenge.verify} placeholder="얍얍" />
              )}
              {!isUpdate && <p>{challenge.verify}</p>}
            </div> */}
            <div>
              <div>카테고리</div>
              {isUpdate && <FormCategory label="수정할 카테고리" name="category" defaultValue={challenge.category} />}
              {!isUpdate && <p>{challenge.category}</p>}
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
            {user?.id === challenge.createdBy && (
              <div className="w-full flex gap-x-2">
                <button
                  className="flex-1 py-2 rounded-md 
            bg-blue-300 hover:bg-blue-400 hover:shadow-lg active:shadow-[inset_0_2px_8px_blue]"
                  onClick={(e) => {
                    if (!isUpdate) {
                      e.preventDefault();
                      setIsUpdate(true);
                    }
                  }}
                >
                  {isUpdate ? '확인' : '수정'}
                </button>
                <button
                  className="flex-1 py-2 rounded-md 
            bg-red-300 hover:bg-red-400 hover:shadow-lg active:shadow-[inset_0_2px_8px_red]"
                  onClick={() => (isUpdate ? setIsUpdate(false) : handleDelete())}
                  type="button"
                >
                  {isUpdate ? '취소' : '삭제'}
                </button>
              </div>
            )}
          </section>
        </form>
      </main>
    </div>
  );
};

export default ChallengeDetailPage;

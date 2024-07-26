'use client';
import React from 'react';
import Image from 'next/image';
import { useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import { useGetReviews } from '@/hooks/review/useReview';
import { Tables } from '@/types/supabase';

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const { data: challenge } = useGetChallengeDetail(id);
  const { data: reviews } = useGetReviews(id);
  console.log('@@', reviews);
  console.log('!!!!!', challenge);

  //TODO: 로딩
  if (!challenge) {
    return <div>없따!</div>;
  }

  return (
    <div className="h-screen">
      <main className="bg-amber-300 pb-7">
        <Image
          src={challenge.imageURL}
          alt="썸네일 이미지"
          width={100}
          height={100}
          className="w-full h-[200px] object-cover mb-5"
        />
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
          <div>
            <div className="mb-4">참여 인증 방법</div>
            <p>{challenge.verify}</p>
          </div>
          <div>
            <h1>후기</h1>
            <ul className="flex flex-row gap-3 overflow-y-auto p-4">
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
      </main>
    </div>
  );
};

export default ChallengeDetailPage;

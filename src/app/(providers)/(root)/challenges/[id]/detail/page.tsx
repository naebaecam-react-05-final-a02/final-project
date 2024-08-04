'use client';
import Button from '@/components/Button';
import UserProfile from '@/components/UserProfile/UserProfile';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import { useGetReviews } from '@/hooks/review/useReview';
import CheckCircle from '@/icons/CheckCircle/CheckCircle';
import CheckIcon from '@/icons/CheckIcon';

import DotsVertical from '@/icons/DotsVertical';
import Star from '@/icons/Star';
import ThumbsUp from '@/icons/ThumbsUp';

import Image from 'next/image';
import Link from 'next/link';
import ChevronRight from './_components/ChevronRight';
import Title from './_components/Title';

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const { data: user } = useGetUser();
  const { data: challenge } = useGetChallengeDetail(id);
  const { data: reviews } = useGetReviews(id);

  //TODO: 로딩
  if (!challenge) {
    return <div>없따!</div>;
  }

  console.log('USER___', user);
  console.log('challenge', challenge);
  // 날짜 포맷팅 (월.일)
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  const startDateStr = `${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate
    .getDate()
    .toString()
    .padStart(2, '0')}`;
  const endDateStr = `${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate
    .getDate()
    .toString()
    .padStart(2, '0')}`;

  return (
    <div className="bg-gray-700 text-white">
      <main className="pb-24">
        <div>
          <div className="relative w-full aspect-video">
            <header className="fixed w-full left-0 top-0 py-2 px-8 h-14 flex justify-between items-center z-10">
              <DotsVertical width={24} height={24} />
              <h2 className="text-[14px] font-medium">챌린지 상세</h2>
              <Star width={24} height={24} />
            </header>
            <Image src={challenge.imageURL} alt="썸네일 이미지" fill className="object-cover mb-5" />
            <div className="absolute bottom-4 right-4">
              <ul className="py-1 px-2 flex flex-row gap-3 rounded-[4px] border border-white/[0.2]">
                <li>참여 40</li>
                <li>인증 12</li>
                <li>후기 4</li>
              </ul>
            </div>
          </div>
          <section className="flex flex-col gap-6">
            <article
              className="px-4 py-3 border-b-[1px] border-white/70"
              style={{
                borderImage:
                  'linear-gradient(to right, transparent, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0.3) 85%, transparent) 1',
              }}
            >
              {/* TODO: 프로필 사이즈 변경하기 text-white/[0.7] */}
              <UserProfile className="w-[18px] h-[18px]" />
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1">
                  <span>🚶‍♂️</span>
                  <div className="font-semibold text-[16px] leading-6">{challenge.title}</div>
                </div>
                <div className="text-[12px] font-normal leading-4">
                  {startDateStr} ~ {endDateStr}
                </div>
              </div>
            </article>
            <article className="mb-2 px-4">
              <div className="mb-4 flex flex-row gap-2">
                <CheckCircle />
                <Title>챌린지 인증 방법</Title>
              </div>
              <div className="flex flex-row gap-2">
                <div className="relative w-5 h-5 border-white border rounded-full overflow-hidden">
                  <Image
                    src={user?.profileURL ?? '/default-profile.png'}
                    alt={'username'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p className="mt-[10px] p-2 border-2 border-white/[0.1] rounded-2xl rounded-tl-none w-full text-[14px] leading-5">
                  {challenge.content}
                </p>
              </div>
            </article>
            <article className="px-4">
              <div className="flex flex-row justify-between mb-4">
                <Title>🔥 챌린지 인증</Title>
                <button type="button" className="flex flex-row gap-1 items-center text-white/[0.5] text-[12px]">
                  전체보기 <ChevronRight width={18} height={18} />
                </button>
              </div>
              <ul className="flex flex-row gap-3 overflow-y-auto  text-white">
                {reviews &&
                  reviews.map((review) => (
                    <li key={review.id} className=" rounded-2xl p-4 border-2 border-white/[0.1] flex-none w-[96%]">
                      <div className="h-full">
                        <div className="flex flex-row gap-2 mb-2 justify-between">
                          <img width={56} height={56} className="object-cover bg-red-400" />
                          <div className="flex flex-row gap-1 text-[12px] text-white font-medium">
                            <ThumbsUp />
                            <span>999</span>
                          </div>
                        </div>
                        <div className="overflow-hidden text-ellipsis line-clamp-2 text-[14px] mb-4">
                          {review.content}
                        </div>
                        <div className="text-[14px] flex flex-row justify-between">
                          <div>유저유저유저</div>
                          <div className="text-white/[0.5] text-[12px]">2024.08.04</div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </article>
            <div
              className="fixed bottom-0 left-0 w-full p-4 pb-6 bg-black rounded-t-3xl"
              style={{ boxShadow: '0px -4px 8px 0px rgba(18, 242, 135, 0.10)' }}
            >
              <button className="rounded-lg bg-[#3ECF8E] py-2 w-full" type="button">
                인증하기
              </button>
            </div>

            {user?.id === challenge.createdBy && (
              <Link href={`/challenges/${challenge.id}/update`}>
                <Button>수정 및 삭제</Button>
              </Link>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChallengeDetailPage;

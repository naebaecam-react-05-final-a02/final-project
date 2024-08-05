'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { useGetChallengeDetail } from '@/hooks/challenge/useChallenge';

import Button from '@/components/Button';
import ChevronLeft from '@/icons/ChevronLeft';
import DotsVertical from '@/icons/DotsVertical';
import Mobile from '@/layouts/Mobile';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VerificationRecordList from './_components/VerificationRecordList';

interface Author {
  profileURL?: string | null; // profileURL이 null일 수 있음
  nickname?: string | null; // nickname이 null일 수 있음
}

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const { data: user } = useGetUser();
  const { data: challenge } = useGetChallengeDetail(id);

  const router = useRouter();

  const [author, setAuthor] = useState<Author | null>(null);

  //TODO: 유저정보
  // useEffect(() => {
  //   if (challenge) {
  //     const userId = challenge.createdBy;
  //     fetch(`/api/users/${userId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('USERRRR:', data);
  //         setAuthor(data);
  //       })
  //       .catch((error) => console.error('Error fetching author data:', error));
  //   }
  // }, [challenge]);

  if (!challenge) {
    return <div>없따!</div>;
  }

  // 날짜 포맷팅
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

  const handleJoinChallenge = async () => {
    const supabase = createClient();

    const { error } = await supabase.from('challengeParticipants').insert({
      challengeId: id,
      userId: user?.id,
    });
    if (error) {
      // 에러 처리도 제대루 해야함
      alert('챌린지 참여 에러');
    } else {
      // 성공 후 챌린지 리스트로 이동? 마이페이지로 이동?
      router.replace('/challenges');
    }
  };

  const DetailLocalHeader = () => {
    return (
      <header className="fixed w-full left-0 top-0 py-2 px- h-14 flex justify-between items-center z-10">
        <ChevronLeft />
        <h2 className="text-[14px] font-medium">챌린지 상세</h2>
        <DotsVertical width={24} height={24} />
      </header>
    );
  };

  return (
    <Mobile headerLayout={<DetailLocalHeader />}>
      <div className="text-white">
        <main className="pb-24 min-h-screen">
          <div>
            <div className="relative w-full aspect-video">
              <Image src={challenge.imageURL} alt="썸네일 이미지" fill className="object-cover mb-5" />
              <div className="absolute bottom-4 right-4">
                <ul className="py-1 px-2 flex flex-row gap-3 rounded-[4px] border border-white/[0.2] text-[12px] leading-4">
                  <li className="text-[#12F287]">참여 40</li>
                  <li>인증 12</li>
                  <li>후기 4</li>
                </ul>
              </div>
            </div>
            <section className="flex flex-col gap-6">
              <article className="px-4 py-3 border-b-[1px] border-white/70 header-gradient">
                <div className="relative w-5 h-5 border-white border rounded-full overflow-hidden">
                  <Image
                    src={author?.profileURL ?? '/default-profile.png'}
                    alt={author?.nickname ?? 'username'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="text-[12px] text-white/70">{author?.nickname}</div>
                </div>
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
              {/* 챌린지 인증 방법 */}
              {/* <ChallengeInfoMethod id={id} challenge={challenge} user={author} /> */}
              {/* 챌린지 인증 리스트 */}
              <VerificationRecordList id={id} />
              {!challenge.participants.find(({ userId }: { userId: string }) => userId === user?.id) && (
                <button onClick={handleJoinChallenge} className="rounded-lg bg-[#3ECF8E] py-2 w-full" type="button">
                  챌린지 신청하기
                </button>
              )}
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
    </Mobile>
  );
};

export default ChallengeDetailPage;

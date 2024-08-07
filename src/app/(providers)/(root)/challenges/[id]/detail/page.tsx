'use client';

import Button from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import ChevronLeft from '@/icons/ChevronLeft';
import DotsVertical from '@/icons/DotsVertical';
import Memo from '@/icons/Memo';
import Mobile from '@/layouts/Mobile';
import BackBoard from '@/layouts/Mobile/BackBoard/BackBoard';
import { queryClient } from '@/providers/QueryProvider';
import { createClient } from '@/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ChallengeInfoMethod from './_components/ChallengeInfoMethod';
import ThumbnailSection from './_components/Thumbnail.tsx';
import UserProfile from './_components/UserProfile';
import VerificationRecordList from './_components/VerificationRecordList';

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const { data: user } = useGetUser();
  const { data: challenge } = useGetChallengeDetail(id);
  const router = useRouter();
  // const [menuOpen, setMenuOpen] = useState(false);
  // const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  // const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  // const menuRef = useRef(null);

  // const handleClickOutside = (event) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     setMenuOpen(false);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  if (!challenge) {
    return <Loading />;
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

    if (confirm('신청하시겠습니까?')) {
      const { error } = await supabase.from('challengeParticipants').insert({
        challengeId: id,
        userId: user?.id,
      });
      if (error) {
        // 에러 처리도 제대루 해야함
        alert('신청에 실패하였습니다.');
      } else {
        // 성공 후 챌린지 리스트로 이동? 마이페이지로 이동?
        alert('신청하였습니다.');
        queryClient.invalidateQueries({ queryKey: ['joinedChallenge'] });
        router.replace('/challenges');
      }
    }
  };
  // const handleMenuToggle = () => {
  //   setMenuOpen(!menuOpen);
  // };

  // 챌린지 작성자 정보
  const challengeAuthor = challenge.user;

  const bottomButton = (
    <div className="flex w-full  gap-x-2">
      {!challenge.participants.find(({ userId }: { userId: string }) => userId === user?.id) ? (
        <Button className="flex-1" onClick={handleJoinChallenge} type="button">
          챌린지 신청하기
        </Button>
      ) : (
        <Link className="flex-1 w-full" href={`/challenges/${challenge.id}/verification/register`}>
          <Button type="button">챌린지 인증하기</Button>
        </Link>
      )}
      {user?.id === challenge.createdBy && (
        <Link className="flex-1" href={`/challenges/${challenge.id}/update`}>
          <Button>수정 및 삭제</Button>
        </Link>
      )}
    </div>
  );

  return (
    <Mobile isHeaderFixed={false} showHeader={false} showFooter={false} bottomButton={bottomButton}>
      <div className="text-white relative">
        <BackBoard />
        <main className="pb-8">
          <div className="">
            <ThumbnailSection challenge={challenge} />
            <section className="flex flex-col gap-6">
              <article className="px-4 py-3 border-b-[1px] border-white/70 header-gradient">
                <div className="flex flex-row justify-between">
                  <UserProfile challengeAuthor={challengeAuthor} />
                  <div className="text-[12px] font-normal leading-4">
                    {startDateStr} ~ {endDateStr}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-1">
                    <span>🚶‍♂️</span>
                    <div className="font-semibold text-[16px] leading-6">{challenge.title}</div>
                  </div>
                  <span className="py-[2px] px-2 border-[0.8px] border-[#12F287] rounded-lg text-[12px] font-medium text-[#12F287]">
                    {challenge.category}
                  </span>
                </div>
              </article>
              {/* 챌린지 인증 방법 */}
              <ChallengeInfoMethod id={id} challenge={challenge} challengeAuthor={challengeAuthor} />
              {/* 챌린지 인증 리스트 */}
              <VerificationRecordList id={id} challengeAuthor={challengeAuthor} />
            </section>
          </div>
        </main>
      </div>
    </Mobile>
  );
};

export default ChallengeDetailPage;

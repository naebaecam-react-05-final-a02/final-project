'use client';

import Button from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { categoryItemsENGtoKOR } from '@/data/challenges';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeJoin, useChallengeLeave, useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import Mobile from '@/layouts/Mobile';
import BackBoard from '@/layouts/Mobile/BackBoard/BackBoard';
import { queryClient } from '@/providers/QueryProvider';
import Link from 'next/link';
import ChallengeInfoMethod from './_components/ChallengeInfoMethod';
import ThumbnailSection from './_components/Thumbnail.tsx';
import UserProfile from './_components/UserProfile';
import VerificationRecordList from './_components/VerificationRecordList';

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const { data: user } = useGetUser();
  const { data: challenge, isPending } = useGetChallengeDetail(id);
  const { mutate: joinChallenge, isPending: isJoining } = useChallengeJoin();
  const { mutate: leaveChallenge, isPending: isLeaving } = useChallengeLeave();

  const modal = useModal();

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

  if (!challenge || isPending) return <Loading />;
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
    const response = await modal.confirm(['신청하시겠습니까?']);
    if (response) {
      joinChallenge(id, {
        onSuccess: () => {
          modal.alert(['신청하였습니다.']);
          queryClient.invalidateQueries({ queryKey: ['joinedChallenge'] });
          queryClient.invalidateQueries({ queryKey: ['challenge', { cid: id }] });
        },
        onError: () => modal.alert(['신청에 실패하였습니다.']),
      });
    }
  };

  const handleLeaveChallenge = async () => {
    const res = await modal.confirm(['정말 챌린지를 그만두시겠습니까?']);
    if (res) {
      leaveChallenge(id, {
        onSuccess: () => {
          modal.alert(['챌린지를 그만두었습니다...']);
          queryClient.invalidateQueries({ queryKey: ['joinedChallenge'] });
          queryClient.invalidateQueries({ queryKey: ['challenge', { cid: id }] });
        },
        onError: () => modal.alert(['챌린지를 하차하는 도중 문제가 생겼습니다...!']),
      });
    }
  };

  // 챌린지 작성자 정보
  const challengeAuthor = challenge.user;

  const bottomButton = (
    <div className="flex w-full  gap-x-2">
      {!challenge.participants.find(({ userId }: { userId: string }) => userId === user?.id) ? (
        <Button className="flex-1" onClick={handleJoinChallenge} type="button">
          챌린지 신청하기
        </Button>
      ) : (
        <div className="flex gap-x-2 w-full">
          {challenge.isProgress === 'RUN' ? (
            <Link className="flex-1 w-full" href={`/challenges/${challenge.id}/verification/register`}>
              <Button type="button">챌린지 인증하기</Button>
            </Link>
          ) : (
            <Button className="flex-1 w-full" disabled>
              시작하지 않았어요!
            </Button>
          )}
          <button
            className="flex-1 bg-red-600 rounded-lg hover:bg-red-700"
            onClick={handleLeaveChallenge}
            type="button"
          >
            챌린지 하차하기
          </button>
        </div>
      )}
    </div>
  );

  return (
    <Mobile isHeaderFixed={false} showHeader={false} showFooter={false} bottomButton={bottomButton}>
      {(isJoining || isLeaving) && <Loading />}
      <div className="text-white relative -my-4">
        <BackBoard />
        <main className="pb-8">
          <div className="">
            <ThumbnailSection challenge={challenge} />
            <section className="flex flex-col gap-6">
              <article className="px-4 py-3 border-b-[1px] border-white/70 header-gradient">
                <div className="flex flex-row justify-between">
                  <UserProfile challengeAuthor={challengeAuthor} />
                  <div className="text-[12px] font-normal">
                    {startDateStr} ~ {endDateStr}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-1">
                    <span>🚶‍♂️</span>
                    <div className="font-semibold text-[16px]">{challenge.title}</div>
                  </div>
                  <span className="py-[2px] px-2 border-[0.8px] border-[#12F287] rounded-lg text-[12px] font-medium text-[#12F287]">
                    {categoryItemsENGtoKOR[challenge.category]}
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

'use client';
import Button from '@/components/Button';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import { useGetReviews } from '@/hooks/review/useReview';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const { data: user } = useGetUser();
  const { data: challenge } = useGetChallengeDetail(id);
  const { data: reviews } = useGetReviews(id);
  const router = useRouter();

  //TODO: 로딩
  if (!challenge) {
    return <div>없따!</div>;
  }

  console.log('USER___', user);
  console.log('challenge', challenge);

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
            {!challenge.participants.find(({ userId }: { userId: string }) => userId === user?.id) && (
              <button onClick={handleJoinChallenge} className="rounded-lg bg-[#3ECF8E] py-2 w-full" type="button">
                챌린지 신청하기
              </button>
            )}
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

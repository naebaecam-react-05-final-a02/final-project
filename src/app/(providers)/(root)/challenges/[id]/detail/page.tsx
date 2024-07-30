'use client';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeDelete, useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import { useGetReviews } from '@/hooks/review/useReview';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ChallengeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const { data: user } = useGetUser();
  const { data: challenge } = useGetChallengeDetail(id);
  const { data: reviews } = useGetReviews(id);
  const { mutate: challengeDelete } = useChallengeDelete();
  const router = useRouter();
  console.log('@@', reviews);
  console.log('!!!!!', challenge);
  console.log('USER___', user);
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

  return (
    <div className="h-screen">
      <main className="bg-amber-300 pb-7">
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
          <div>
            <div className="mb-4">참여 인증 방법</div>
            <p>{challenge.verify}</p>
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
              >
                수정
              </button>
              <button
                className="flex-1 py-2 rounded-md 
            bg-red-300 hover:bg-red-400 hover:shadow-lg active:shadow-[inset_0_2px_8px_red]"
                onClick={() => handleDelete()}
              >
                삭제
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ChallengeDetailPage;

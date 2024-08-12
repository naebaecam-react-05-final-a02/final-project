'use client';

import Loading from '@/components/Loading/Loading';
import ThumbsUpIcon from '@/components/ThumbsUpIcon';
import api from '@/service/service';
import { verificationsType } from '@/types/challenge';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ChevronRight from '../ChevronRight';
import Title from '../Title';

interface User {
  profileURL?: string | null;
  nickname?: string | null;
}

interface VerificationRecord {
  id: number;
  userId: string;
  imageURLs: string[];
  impression: string;
  date: string;
  users: User;
}

interface ChallengeInfoMethodProps {
  id: number;
  challengeAuthor: User | null;
}

const VerificationRecordList = ({ id, challengeAuthor }: ChallengeInfoMethodProps) => {
  // const [verificationRecords, setVerificationRecords] = useState<VerificationRecord[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchVerificationRecords = async () => {
  //     try {
  //       const response = await fetch(`/api/challenges/verification?id=${id}`);
  //       const data = await response.json();

  //       if (response.ok) {
  //         setVerificationRecords(data);
  //       } else {
  //         setError(data.error);
  //       }
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'An unknown error occurred');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVerificationRecords();
  // }, [id]);

  const queryClient = useQueryClient();

  const {
    data: verifications,
    error,
    isPending,
  } = useQuery({
    queryKey: ['verifications', id],
    queryFn: () => api.challenge.getVerifications({ challengeId: id }),
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: ({ verificationId: id, isLiked }: { verificationId: number; isLiked: boolean }) =>
      api.challenge.toggleLike({ verificationId: id, isLiked }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['verifications'] });
      const prevVerifications = queryClient.getQueryData(['verifications', id]);
      queryClient.setQueryData(['verifications', id], (oldData: verificationsType[]) => {
        return oldData?.map((verification: verificationsType) => {
          if (verification.id === newData.verificationId) {
            return {
              ...verification,
              isLiked: !newData.isLiked,
              likes_count: newData.isLiked ? verification.likes_count - 1 : verification.likes_count + 1,
            };
          }
          return verification;
        });
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
    },
  });

  if (isPending) return <Loading />;

  return (
    <article className="overflow-hidden">
      <div className="flex flex-row justify-between mb-4 px-4">
        <Title>🔥 챌린지 인증</Title>
        <button type="button" className="flex flex-row gap-1 items-center text-white/[0.5] text-[12px]">
          <Link href={`/challenges/${id}/verification/list`} className="inline-flex items-center">
            전체보기 <ChevronRight width={18} height={18} />
          </Link>
        </button>
      </div>
      {verifications.length === 0 ? (
        <p className="px-4">챌린지 인증이 없습니다.</p>
      ) : (
        <div className="w-full pl-4">
          <Swiper
            slidesPerView={1.1}
            spaceBetween={12}
            freeMode={true}
            mousewheel={true}
            modules={[FreeMode, Mousewheel]}
            className="!flex !justify-start !mx-0 !w-full"
          >
            {verifications.map((verification: verificationsType) => (
              <SwiperSlide key={verification.id}>
                <div className="rounded-2xl p-4 border-2 border-white/[0.1] bg-white bg-opacity-5 h-full">
                  <div className="flex flex-row mb-2 justify-between">
                    <div className="flex flex-row gap-2 justify-center items-center">
                      {verification.imageURLs.map((url, index) => (
                        <Image
                          key={`${verification.id}-${url}`}
                          src={url}
                          width={56}
                          height={56}
                          alt={'썸네일 이미지'}
                          className="object-cover w-14 h-14"
                        />
                      ))}
                    </div>
                    {/* <div className="flex flex-row gap-1 text-[12px] text-white font-medium">
                      <ThumbsUp />
                      <span>999</span>
                    </div> */}
                    <button
                      onClick={() => toggleLike({ isLiked: verification.isLiked, verificationId: verification.id })}
                    >
                      <ThumbsUpIcon
                        verificationId={verification.id}
                        likesCount={verification.likes_count}
                        isLiked={verification.isLiked}
                        isBackground={false}
                      />
                    </button>
                  </div>
                  <div className="overflow-hidden text-ellipsis line-clamp-2 text-[14px] mb-4">
                    {verification.impression}
                  </div>
                  <div className="text-[14px] flex flex-row justify-between">
                    <div className="flex flex-row gap-1 justify-center items-center">
                      <div className="relative w-5 h-5 border-white border rounded-full overflow-hidden">
                        <Image
                          src={verification.users?.profileURL ?? '/default-profile.png'}
                          alt={verification.users?.nickname ?? 'username'}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div>{verification.users.nickname}</div>
                    </div>
                    <div className="text-white/[0.5] text-[12px]">{verification.date?.slice(0, 10)}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </article>
  );
};

export default VerificationRecordList;

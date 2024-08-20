'use client';

import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeDelete } from '@/hooks/challenge/useChallenge';
import ChevronLeft from '@/icons/ChevronLeft';
import DotsVertical from '@/icons/DotsVertical';
import { queryClient } from '@/providers/QueryProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TChallenge } from '../../../../_types/types';

type ThumbnailProps = {
  challenge: TChallenge & { participantsCount: number; verificationsCount: number };
};

const ThumbnailSection = ({ challenge }: ThumbnailProps) => {
  const { data: user } = useGetUser();
  const modal = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { mutate: challengeDelete, isPending } = useChallengeDelete();
  const router = useRouter();

  const handleUpdate = async () => {
    setIsMenuOpen(false);
    const res = await modal.confirm(['챌린지 수정으로 이동하시겠습니까?']);
    if (res) {
      router.push(`/challenges/${challenge.id}/update`);
    }
  };

  const handleDelete = async () => {
    setIsMenuOpen(false);
    const res = await modal.confirm(['정말 챌린지를 삭제 하시겠습니까?']);
    if (res) {
      challengeDelete(challenge.id, {
        onSuccess: () => {
          modal.alert(['삭제하였습니다.']);
          queryClient.invalidateQueries({ queryKey: ['joinedChallenge'] });
          queryClient.invalidateQueries({ queryKey: ['challenge', 'coming'] });
          router.replace('/challenges');
        },
      });
    }
  };
  return (
    <section className="relative w-full aspect-video">
      {isPending && <Loading />}
      <Image src={challenge.imageURL} alt="썸네일 이미지" fill className="object-cover mb-5" />
      <header
        className="absolute w-full left-0 top-0 py-2 px-8 h-14 flex justify-between items-center z-10 text-white"
        style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.50)14.29%, rgba(0, 0, 0, 0.00)100%)' }}
      >
        <button onClick={() => router.back()} aria-label="뒤로가기">
          <ChevronLeft />
        </button>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-[14px] font-medium">챌린지 상세</h2>
        {user?.id === challenge.createdBy && (
          <div className="cursor-pointer" onClick={() => setIsMenuOpen((prev) => !prev)}>
            <DotsVertical width={24} height={24} />
          </div>
        )}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 " onClick={() => setIsMenuOpen(false)} />
            <div
              className="absolute top-12 right-9 rounded-lg border-primary-100/50 border-2 px-1 
flex flex-col gap-y-5 backdrop-blur-md select-none bg-white/5 w-fit "
            >
              <ul
                className="py-1 transition-all duration-300 ease-in-out scale-100 opacity-100"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <li
                  onClick={handleUpdate}
                  className="hover:cursor-pointer block px-4 py-2 text-sm text-white/50 hover:bg-primary-10 hover:text-primary-100 w-full text-center rounded-md text-nowrap transform transition-all duration-300 ease-in-out opacity-0 animate-dropdown-item"
                  role="menuitem"
                >
                  수정하기
                </li>
                <li
                  onClick={handleDelete}
                  className="hover:cursor-pointer block px-4 py-2 text-sm text-white/50 hover:bg-primary-10 hover:text-primary-100 w-full text-center rounded-md text-nowrap transform transition-all duration-300 ease-in-out opacity-0 animate-dropdown-item"
                  role="menuitem"
                >
                  삭제하기
                </li>
              </ul>
            </div>
          </>
        )}
      </header>
      <div
        className="absolute bottom-0 right-0 w-full p-4"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.50)14.97%, rgba(0, 0, 0, 0.00)100%)',
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
        }}
      >
        <div className="flex justify-end" style={{ transform: 'inherit' }}>
          <ul
            className="inline-flex flex-row gap-3 rounded-[4px] border-2 border-white/[0.2] text-[12px] font-semibold bg-black/10 py-1 px-2 backdrop-blur-[8px]"
            style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.20)' }}
          >
            <li className="text-[#12F287]">참여 {challenge.participantsCount}</li>
            <li>인증 {challenge.verificationsCount}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ThumbnailSection;

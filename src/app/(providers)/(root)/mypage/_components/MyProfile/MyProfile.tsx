'use client';

import ArrowRight from '@/assets/arrow-right.svg';
import TeamCardSVG from '@/assets/team-card.svg';
import { useGetUser, useSignOut } from '@/hooks/auth/useUsers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const router = useRouter();
  const { data: user, isPending } = useGetUser();
  const { mutate: signOut } = useSignOut({
    onSuccess: () => {
      router.push('/log-in'); // 로그아웃 성공 시 로그인 페이지로 리디렉션
    },
  });
  return (
    <section className="flex flex-col gap-10">
      <article className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="relative w-16 h-16 rounded-full border border-white overflow-hidden">
            {user?.profileURL && <Image src={user?.profileURL} alt={'프로필 이미지'} fill />}
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex gap-2 items-end">
              <div className="text-[16px] font-medium">{user?.nickname ?? `헬린이_${user?.userIndex}`}</div>
              <p className="text-sm font-light text-primary-100">LV.1</p>
            </div>
            <p className="text-sm text-white/50 mb-2">{user?.email}</p>
            <div className="flex gap-2">
              <div className="flex gap-1">
                <p className="text-white/70 font-light">팔로워</p>
                <span className="font-bold text-white">0</span>
              </div>
              <div className="flex gap-1">
                <p className="text-white/70 font-light">팔로잉</p>
                <span className="font-bold text-white">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-page-intro-bg p-2 rounded-b-2xl rounded-se-2xl h-[76px] relative ">
          <div className="rounded-b-2xl rounded-se-2xl absolute inset-0 border-2 border-white/10"></div>

          {<p className="text-[14px] text-white/70">{user?.introduction}</p> ?? (
            <p className="text-[14px] text-white/70">
              안녕하세요 {user?.nickname ?? `헬린이_${user?.userIndex}`}입니다.
            </p>
          )}
        </div>
      </article>
      <article className="flex flex-col gap-4">
        <div className="h-[112px] w-full bg-black/20 rounded-[20px] relative">
          <div className="rounded-[20px] absolute inset-0 border-2 border-white/10"></div>
          <div className="w-full h-full flex items-center justify-around">
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <p className="text-[14px] text-white/70 ">내가 쓴 글</p>
              <p className="text-[20px] font-semibold">0</p>
            </div>
            <div className="bg-white/20 w-[1px] h-6"></div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <p className="text-[14px] text-white/70 ">내 활동</p>
              <p className="text-[20px] font-semibold">0</p>
            </div>
            <div className="bg-white/20 w-[1px] h-6"></div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <p className="text-[14px] text-white/70 ">북마크</p>
              <p className="text-[20px] font-semibold">0</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button className="w-full flex gap-2 justify-center items-center h-6">
            <p className="text-[14px] ">참여한 챌린지</p>
            <div className="w-5 h-5 flex justify-center items-center">
              <ArrowRight />
            </div>
          </button>
          <div className="bg-white/20 w-[1px] h-3"></div>
          <button className="w-full flex gap-2 justify-center items-center h-6">
            <p className="text-[14px] ">개최한 챌린지</p>
            <div className="w-5 h-5 flex justify-center items-center">
              <ArrowRight />
            </div>
          </button>
        </div>
      </article>
      <article className="flex justify-center items-center w-full h-[185px] bg-white/5 rounded-[20px]">
        체중 그래프 자리
      </article>
      <article>
        <TeamCardSVG />
      </article>
      <div className="flex justify-center w-full">
        <div>
          <button className="border-b border-primary-100 text-sm text-primary-100" onClick={() => signOut()}>
            로그아웃
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;

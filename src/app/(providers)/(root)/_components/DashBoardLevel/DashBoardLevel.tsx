'use client';

import { useGetLevel, useLevelUp } from '@/hooks/level/useLevel';
import { createClient } from '@/supabase/client';
import { levelUpHelper } from '@/utils/levelUpHelper';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LevelProgress from '../LevelProgress';
import LoadingImage from '/public/icons/loading.png';

const DashBoardLevel = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(true);
  const { data: levelData, isLoading, isError } = useGetLevel(supabase);
  const { mutate: updateLevel } = useLevelUp();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!levelData || !levelData.level || isError) {
    return <div>Error</div>;
  }

  const { level: curLevel, experience: requiredExperience } = levelData.level;
  const curExperience = levelData.experience;
  console.log(`현재 레벨:${curLevel} 현재 경험치:${curExperience} 필요 경험치:${requiredExperience}`);

  const tttt = async () => {
    const { level, experience } = levelUpHelper(100);
    updateLevel({ client: supabase, level, experience });
  };

  return (
    <>
      {(loading || isLoading) && (
        <div className="size-full flex items-center justify-center">
          <Image className="animate-spin" width={35} height={35} src={LoadingImage} alt="로딩이미지" />
        </div>
      )}
      {!loading && !isLoading && (
        <>
          <button className="text-[8px] p-1 py-px bg-black rounded-md" onClick={tttt}>
            Exp+10
          </button>
          <div className="w-8 h-full absolute bg-gradient-to-r from-[#12121266] to-[#12121201] top-0 left-0"></div>
          <div className="w-8 h-full absolute bg-gradient-to-l from-[#12121266] to-[#12121201] top-0 right-0"></div>
          <div className="absolute left-4 top-4 gap-y-1 grid">
            <h5 className="text-white/50 text-sm">헬린이</h5>
            <h6 className="text-[28px]">{`Lv.${curLevel}`}</h6>
          </div>
          <div className="absolute bottom-9">
            <div className="-rotate-[15deg] flex  w-[100px] justify-center items-center relative ">
              <div className="absolute -left-[95px] -bottom-[11px] -rotate-[15deg] bg-[#37cc85] w-[100px] h-2" />
              <div className="absolute -left-2 rounded-full bg-[#5effb2] p-px size-4 z-10 flex justify-center items-center">
                <div
                  className="size-full rounded-full bg-[#37cc85] border-[1px] border-white/60"
                  style={{ filter: 'url(#glow)' }}
                />
              </div>
              <LevelProgress experience={(curExperience / requiredExperience) * 100} />
              <div className="absolute -right-2 rounded-full bg-white/10 p-px size-4 z-10 flex justify-center items-center">
                <div className="size-full rounded-full bg-[#292929] border-[1px] border-white/20" />
              </div>
              <div className="absolute -right-[95px] -top-[11px] -rotate-[15deg] bg-white/5 w-[100px] h-2" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashBoardLevel;

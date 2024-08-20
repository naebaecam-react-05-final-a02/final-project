'use client';

import { useGetLevel } from '@/hooks/level/useLevel';
import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';

const EXPBar = () => {
  const [percent, setPercent] = useState<number>(0);
  const supabase = createClient();

  const { data: userLevel, error: userLevelError, isPending } = useGetLevel(supabase);
  console.log(userLevel);
  if (userLevel?.experience && userLevel?.expInfo?.experience)
    console.log((userLevel.experience / userLevel.expInfo.experience) * 100);

  useEffect(() => {
    const EXPPercent = isPending
      ? 0
      : userLevel?.experience && userLevel?.expInfo?.experience
      ? (userLevel.experience / userLevel.expInfo.experience) * 100
      : 0;
    setPercent(EXPPercent);
  }, [percent, isPending]);

  return (
    <div className="h-[22px]">
      <div className="w-full h-[6px] rounded-full bg-white/10 overflow-hidden relative">
        <div className={`h-full bg-primary-100 rounded-full w-[${percent}%]`}></div>
      </div>
      <div className="flex justify-between h-[16px]">
        <p className="text-white text-[10px]">{percent}%</p>
        <p className="text-white/40 text-[10px]">100%</p>
      </div>
    </div>
  );
};

export default EXPBar;

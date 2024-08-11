'use client';
import NotificationSVG from '@/assets/nav/notification.svg';
import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import IconButton from '../IconButton/IconButton';

const NotificationButton = () => {
  const { data: user } = useGetUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const supabase = createClient();

  const { data: alarm, error } = useQuery({
    queryKey: ['alarm'],
    queryFn: async () => {
      const response = await supabase
        .from('alarm')
        .select('*')
        .match({ targetUserId: user?.id, isRead: false })
        .order('createdAt');
      return response.data;
    },
    enabled: !!user,
  });

  console.log('ALARM___', alarm);

  return (
    <>
      <div className="relative select-none">
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="z-20 absoulte w-[300px] h-[400px] rounded-3xl border-primary-100 border-2 p-4 
        flex flex-col gap-y-5"
          >
            <h6 className="text-md text-gray-300">
              새로운 알림 <span className="text-primary-100 ">{alarm?.length ?? 0}</span>개
            </h6>
            <ul className="flex flex-col gap-y-4 text-xs flex-1">
              <li className="flex gap-x-2 items-center py-1">
                <div className="w-16 border-primary-100 text-primary-100 p-2 py-1 rounded border-2 flex items-center justify-center">
                  커뮤니티
                </div>
                <div className="flex-1 whitespace-normal ">주용용이1234 님이 회원님의 게시글에 댓글을 달았습니다.</div>
              </li>
              <li className="flex gap-x-2 items-center py-1">
                <div className="w-16 border-primary-100 text-primary-100 p-2 py-1 rounded border-2 flex items-center justify-center">
                  대시보드
                </div>
                <div className="flex-1 whitespace-normal ">
                  오늘 아직 식단 등록을 하지 않으셨군요! 간단하게 먹은 음식을 등록해주세요
                </div>
              </li>
              <li className="flex gap-x-2 items-center py-1">
                <div className="w-16 border-primary-100 text-primary-100 p-2 py-1 rounded border-2 flex items-center justify-center">
                  챌린지
                </div>
                <div className="flex-1 whitespace-normal ">
                  오늘 아직 식단 등록을 하지 않으셨군요! 간단하게 먹은 음식을 등록해주세요
                </div>
              </li>
            </ul>
            <div
              className="w-full py-1 text-center bg-primary-10 rounded-md border-gray-300 border-[1px]
          text-primary-100"
            >
              알림 더 보기
            </div>
          </div>
        )}
        {alarm && alarm?.length > 0 && (
          <div className="absolute rounded-full size-[6px] bg-primary-100 top-2 right-2 z-10" />
        )}
        <IconButton onClick={() => setIsOpen(true)}>
          <NotificationSVG className="cursor-not-allowed" />
        </IconButton>
      </div>
    </>
  );
};

export default NotificationButton;

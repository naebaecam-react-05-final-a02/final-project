'use client';

import { useCreateNotification } from '@/hooks/notifications/useNotifications';
import { Notification } from '@/types/notification';
import { makeNotificationData } from '@/utils/notificationTypeConverter';
import Link from 'next/link';
import { RxCross2 } from 'react-icons/rx';
import ModalNotificationList from '../ModalNotificationList';

type ModalNotificationsProps = {
  notifications: Notification[] | null | undefined;
  onClose: () => void;
};

const ModalNotifications = ({ notifications, onClose }: ModalNotificationsProps) => {
  const { mutate: createNotification } = useCreateNotification();

  const tttt = () => {
    console.log('TTTT CLICK___');
    createNotification(
      makeNotificationData({ type: 'community', category: 'comment' }, '0f15cea5-f25e-436b-a1f7-e0dbbc888f37', '32'),
    );
  };

  return (
    <div
      className="fixed top-14 right-4 w-[320px] h-[440px] rounded-3xl border-primary-100/50 border-2 p-4 
flex flex-col gap-y-5  z-50 backdrop-blur-md select-none bg-white/5"
    >
      <div className="flex justify-between ext-base text-white/70 items-center">
        <h6>
          새로운 알림 <span className="text-primary-100 ">{notifications?.length ?? 0}</span>개
        </h6>
        <div className="cursor-pointer text-lg" onClick={() => onClose()}>
          <RxCross2 />
        </div>
      </div>
      {notifications && !notifications.length && (
        <div className="flex-1 font-bold text-lg text-white">새로운 알림이 없습니다!</div>
      )}
      {notifications && notifications.length > 0 && <ModalNotificationList notifications={notifications} />}
      <Link
        href={'/notifications'}
        className="w-full py-[10px] text-center bg-primary-100/10 rounded-lg border-gray-300 border-[1px] text-sm
  text-primary-100 active:bg-primary-40"
      >
        알림 더 보기
      </Link>
      {/* 테스트 용 */}
      <div
        onClick={tttt}
        className="w-full py-[10px] text-center bg-primary-100/10 rounded-lg border-gray-300 border-[1px] text-sm
  text-primary-100 active:bg-primary-40 cursor-pointer"
      >
        댓글 알림 생성
      </div>
    </div>
  );
};

export default ModalNotifications;

'use client';

import { Notification } from '@/types/notification';
import Link from 'next/link';
import { RxCross2 } from 'react-icons/rx';
import ModalNotificationList from '../ModalNotificationList';

type ModalNotificationsProps = {
  notifications: Notification[] | null | undefined;
  onClose: () => void;
};

const ModalNotifications = ({ notifications, onClose }: ModalNotificationsProps) => {
  return (
    <div
      className="absolute right-0 top-12 w-[320px] min-h-[440px] rounded-3xl border-primary-100/50 border-2 p-4
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
    </div>
  );
};

export default ModalNotifications;

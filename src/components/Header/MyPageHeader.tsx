'use client';

import React from 'react';
import NotificationButton from '../ButtonIcon/NotificationButton';
import BackButton from './BackButton';

const MyPageHeader = () => {
  return (
    <div className="flex justify-between header-gradient h-14 sm:h-20 items-center">
      {/* 다른 사용자 정보 표시 */}
      <BackButton />
      <div className="flex items-center gap-4">
        <NotificationButton />
      </div>
    </div>
  );
};

export default React.memo(MyPageHeader);

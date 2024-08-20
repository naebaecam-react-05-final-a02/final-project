'use client';

import React from 'react';
import NotificationButton from '../ButtonIcon/NotificationButton';
import UserProfile from '../UserProfile/UserProfile';

const DefaultHeader = () => {
  return (
    <div className="flex justify-between items-center header-gradient sm:h-20">
      {/* 다른 사용자 정보 표시 */}
      <UserProfile />
      <div className="flex items-center gap-4">
        <NotificationButton />
      </div>
    </div>
  );
};

export default React.memo(DefaultHeader);

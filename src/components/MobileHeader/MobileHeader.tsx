'use client';

import React from 'react';
import NotificationButton from '../ButtonIcon/NotificationButton';
import UserProfile from '../UserProfile/UserProfile';

const DefaultHeader = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  console.log('TODAY___', todayStr < '2024-08-09', tomorrowStr);

  return (
    <div className="flex justify-between header-gradient">
      {/* 다른 사용자 정보 표시 */}
      <UserProfile />
      <div className="flex items-center gap-4">
        <NotificationButton />
      </div>
    </div>
  );
};

export default React.memo(DefaultHeader);

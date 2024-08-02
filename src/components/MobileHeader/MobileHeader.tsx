'use client';

import NotificationButton from '../ButtonIcon/NotificationButton';
import SearchButton from '../ButtonIcon/SearchButton';
import UserProfile from '../UserProfile/UserProfile';

const DefaultHeader = () => {
  return (
    <div className="flex justify-between">
      {/* 다른 사용자 정보 표시 */}
      <UserProfile />
      <div className="flex items-center gap-4">
        <SearchButton />
        <NotificationButton />
      </div>
    </div>
  );
};

export default DefaultHeader;

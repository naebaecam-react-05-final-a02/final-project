'use client';

import GlassButton from '@/components/ButtonIcon/GlassButton';
import { HiOutlineTrash } from 'react-icons/hi';

const NotificationClear = () => {
  const handleClear = () => {
    console.log('CLEAR___');
  };

  return (
    <div className="hover:cursor-pointer" onClick={handleClear}>
      <GlassButton>
        <div className="text-2xl">
          <HiOutlineTrash />
        </div>
      </GlassButton>
    </div>
  );
};

export default NotificationClear;

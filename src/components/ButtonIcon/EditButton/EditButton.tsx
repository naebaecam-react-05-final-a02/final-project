'use client';

import EditSVG from '@/assets/edit.svg';
import Link from 'next/link';
import GlassButton from '../GlassButton';

const EditButton = () => {
  return (
    <Link href={`/mypage/edit`}>
      <GlassButton>
        <EditSVG />
      </GlassButton>
    </Link>
  );
};

export default EditButton;

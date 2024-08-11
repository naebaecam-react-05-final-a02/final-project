'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { PropsWithChildren } from 'react';

interface BackDropProps {
  onCancel: () => void;
}

function Backdrop({ children, onCancel }: PropsWithChildren<BackDropProps>) {
  const { close } = useModal();

  const handleCancel = () => {
    onCancel();
    close();
  };
  return (
    <div className="  z-20 fixed inset-0  flex justify-center items-center">
      {children}

      <div onClick={handleCancel} className="-z-10 fixed inset-0 bg-black/50"></div>
    </div>
  );
}

export default Backdrop;

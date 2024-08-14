'use client';

import { PropsWithChildren } from 'react';

interface BackDropProps {
  onCancel: () => void;
}

function Backdrop({ children, onCancel }: PropsWithChildren<BackDropProps>) {
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="  z-30 fixed inset-0  flex justify-center items-center">
      {children}

      <div onClick={handleCancel} className="z-0 fixed inset-0 bg-black/70"></div>
    </div>
  );
}

export default Backdrop;

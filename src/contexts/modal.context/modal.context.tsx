'use client';

import AlertModal from '@/components/Modal/AlertModal';
import Backdrop from '@/components/Modal/BackDrop';
import ConfirmModal from '@/components/Modal/ConfirmModal';
//import { useScrollLock } from '@yoojinyoung/usescrolllock';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

export type ModalTypes = 'confirm' | 'alert';

interface TInitialValue {
  open: ({ type, content, onNextEvent }: { type: ModalTypes; content: string; onNextEvent: () => void }) => void;
  close: () => void;
  isModalOpen: boolean;
}

const initialValue: TInitialValue = {
  open: ({ type, content, onNextEvent }) => {},
  close: () => {},
  isModalOpen: false,
};
const ModalContext = createContext<TInitialValue>(initialValue);
export const useModal = () => useContext<TInitialValue>(ModalContext);

export function ModalProvider({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<React.ReactElement | null>(null);
  console.log(modal);
  const value = {
    isModalOpen: !!modal,
    open: ({ type, content, onNextEvent }: { type: ModalTypes; content: string; onNextEvent: () => void }) => {
      if (type === 'confirm') {
        setModal(<ConfirmModal type={type} content={content} onNextEvent={onNextEvent} />);
      } else if (type === 'alert') {
        setModal(<AlertModal type={type} content={content} onNextEvent={onNextEvent} />);
      }
    },
    close: () => {
      setModal(null);
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal && <Backdrop>{modal}</Backdrop>}
    </ModalContext.Provider>
  );
}

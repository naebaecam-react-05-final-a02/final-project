'use client';

import AlertModal from '@/components/Modal/AlertModal';
import Backdrop from '@/components/Modal/BackDrop';
import ConfirmModal from '@/components/Modal/ConfirmModal';
//import { useScrollLock } from '@yoojinyoung/usescrolllock';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface TInitialValue {
  alert: ({ contents, onNextEvent }: { contents: string[]; onNextEvent: () => void }) => void;
  confirm: ({ contents, onNextEvent }: { contents: string[]; onNextEvent: () => void }) => void;
  open: (el: React.ReactElement) => void;
  close: () => void;
  isModalOpen: boolean;
}

const initialValue: TInitialValue = {
  alert: () => {},
  confirm: () => {},
  open: () => {},
  close: () => {},
  isModalOpen: false,
};
const ModalContext = createContext<TInitialValue>(initialValue);

export const useModal = () => useContext<TInitialValue>(ModalContext);

export function ModalProvider({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<React.ReactElement | null>(null);

  const value = {
    isModalOpen: !!modal,
    alert: ({ contents, onNextEvent }: { contents: string[]; onNextEvent: () => void }) => {
      setModal(<AlertModal contents={contents} onNextEvent={onNextEvent} />);
    },
    confirm: ({ contents, onNextEvent }: { contents: string[]; onNextEvent: () => void }) => {
      setModal(<ConfirmModal contents={contents} onNextEvent={onNextEvent} />);
    },
    open: (el: React.ReactElement) => {
      setModal(el);
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

'use client';

import AlertModal from '@/components/Modal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal';
//import { useScrollLock } from '@yoojinyoung/usescrolllock';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface TInitialValue {
  alert: (contents: string[]) => Promise<boolean>;
  confirm: (contents: string[]) => Promise<boolean>;
  open: (el: React.ReactElement) => void;
  close: () => void;
  isModalOpen: boolean;
}

const initialValue: TInitialValue = {
  alert: async () => true,
  confirm: async () => true,
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
    alert: async (contents: string[]) => {
      return new Promise<boolean>((resolve) => {
        setModal(<AlertModal contents={contents} onSuccess={() => resolve(true)} />);
      });
    },
    confirm: async (contents: string[]) => {
      return new Promise<boolean>((resolve) => {
        setModal(<ConfirmModal contents={contents} onSuccess={() => resolve(true)} onCancel={() => resolve(false)} />);
      });
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
      {modal}
      {children}
    </ModalContext.Provider>
  );
}

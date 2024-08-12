'use client';

import ConfirmModal from '@/components/Modal/ConfirmModal';
import { v4 as uuidv4 } from 'uuid';
//import { useScrollLock } from '@yoojinyoung/usescrolllock';
import AlertModal from '@/components/Modal/AlertModal';
import Backdrop from '@/components/Modal/BackDrop';
import { PropsWithChildren, createContext, useContext, useRef, useState } from 'react';

interface TInitialValue {
  alert: (contents: string[]) => Promise<boolean>;
  confirm: (contents: string[]) => Promise<boolean>;
  open: (el: React.ReactElement) => void;
  close: (id: string) => void;
}

const initialValue: TInitialValue = {
  alert: async () => true,
  confirm: async () => true,
  open: () => {},
  close: () => {},
};
const ModalContext = createContext<TInitialValue>(initialValue);

export const useModal = () => useContext<TInitialValue>(ModalContext);

export interface ModalTypes {
  id: string;
  modal: React.ReactElement;
}

export function ModalProvider({ children }: PropsWithChildren) {
  const [modals, setModals] = useState<ModalTypes[]>([]);
  const addModal = (modal: ModalTypes) => setModals((prev) => [...prev, modal]);
  const deleteModal = (id: string) => setModals((prev) => prev.filter((modal) => modal.id !== id));
  const resolveRef = useRef<Function>(() => {});

  const value = {
    alert: async (contents: string[]) => {
      return new Promise<boolean>((resolve) => {
        const modalId = uuidv4();
        const modal = <AlertModal id={modalId} contents={contents} onSuccess={() => resolve(true)} />;
        addModal({ id: modalId, modal });
      });
    },
    confirm: async (contents: string[]) => {
      return new Promise<boolean>((resolve) => {
        const modalId = uuidv4();
        const modal = (
          <ConfirmModal
            id={modalId}
            contents={contents}
            onSuccess={() => resolve(true)}
            onCancel={() => resolve(false)}
          />
        );
        addModal({ id: modalId, modal });
      });
    },
    open: (modal: React.ReactElement) => {
      const modalId = uuidv4();
      addModal({ id: modalId, modal });
    },
    close: (id: string) => {
      deleteModal(id);
    },
  };
  const handleClickOutOfModal = () => {
    if (modals.length > 0) {
      resolveRef.current(false);
      setModals([]);
    }
  };
  const isVisible = modals.length > 0;
  return (
    <ModalContext.Provider value={value}>
      {children}
      {isVisible && (
        <Backdrop onCancel={handleClickOutOfModal}>
          {modals.map((modal, index) => {
            const zIndex = 'z-' + (index + 1) * 10;
            return (
              <div className={`flex justify-center items-center h-full w-full absolute ${zIndex}`} key={modal.id}>
                {modal.modal}
              </div>
            );
          })}
        </Backdrop>
      )}
    </ModalContext.Provider>
  );
}

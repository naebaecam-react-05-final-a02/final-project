'use client';
import { ModalTypes } from '@/contexts/modal.context/modal.context';
import ModalBody from './ModalBody';

const ConfirmModal = ({ onNextEvent, ...rest }: { type: ModalTypes; content: string; onNextEvent: () => void }) => {
  return <ModalBody {...rest} onNextEvent={onNextEvent} />;
};

export default ConfirmModal;

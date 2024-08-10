'use client';
import AlertSVG from '@/assets/modal/alert.svg';
import ConfirmSVG from '@/assets/modal/check.svg';
import { useModal } from '@/contexts/modal.context/modal.context';
import { PropsWithChildren } from 'react';
import Button from '../Button';

interface ModalBodyProps {
  type: 'confirm' | 'alert';
  content: string;
  onNextEvent: () => void;
}

const ModalBody = ({ type, content, onNextEvent }: PropsWithChildren<ModalBodyProps>) => {
  const modal = useModal();
  const handleCloseModal = () => {
    modal.close();
  };
  const handleClickConfirm = () => {
    modal.close();
    onNextEvent();
  };

  return (
    <div className="p-4 mx-[35px] w-full h-[244px] border-primary-100 border-2 bg-white/5 rounded-3xl modal-shadow">
      <div className="w-full h-full flex flex-col gap-6 justify-between">
        <div className="w-full flex justify-center items-center">
          {type === 'confirm' ? <ConfirmSVG /> : <AlertSVG />}
        </div>
        <p className="w-full flex justify-center items-center text-white">{content}</p>
        {type === 'confirm' ? (
          <div className="flex gap-2">
            <button
              className={
                'w-full h-[50px] flex py-[13px] rounded-lg justify-center items-center text-white border-primary-100 border'
              }
              onClick={handleCloseModal}
            >
              취소
            </button>
            <Button className={'w-full h-16'} onClick={handleClickConfirm}>
              확인
            </Button>
          </div>
        ) : (
          <Button className={'px-2 w-full h-16'} onClick={handleClickConfirm}>
            닫기
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModalBody;

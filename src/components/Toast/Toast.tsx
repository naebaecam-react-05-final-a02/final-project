import CancelSVG from '@/assets/modal/cancel.svg';
import ToastAlertSVG from '@/assets/toast/toast-alert.svg';
import { useToast } from '@/contexts/toast.context/toast.context';
import { ToastTypes } from '@/types/toast';
import { useEffect, useState } from 'react';

export const Toast = ({ content, id }: ToastTypes) => {
  const TOAST_TRANSITION = 500;
  const TOAST_DURATION = 20000;
  const toast = useToast();
  const [show, setShow] = useState(false);
  let timer: ReturnType<typeof setTimeout>;

  const deleteToast = (time: number): Promise<void> =>
    new Promise<void>((resolve) => {
      timer = setTimeout(() => {
        setShow(false);
        resolve();
      }, +time);
    }).then(() => {
      setTimeout(() => {
        toast.delete(id);
      }, TOAST_TRANSITION);
    });

  useEffect(() => {
    setShow(true);
    deleteToast(+TOAST_DURATION);
  }, []);

  return (
    <div
      className={`z-50 relative flex justify-between gap-2 items-center mt-4 transition-all duration-500 w-[334px] h-[40px] pl-2 pr-4 rounded-2xl text-white toast-bg ${
        show ? 'translate-x-0' : 'translate-x-[400px]'
      }`}
    >
      <ToastAlertSVG />
      <div className="z-50 w-full flex justify-between items-center">
        <p className="text-ellipsis">{content}</p>

        <button
          onClick={() => {
            clearInterval(timer);
            deleteToast(0);
          }}
          className=""
        >
          <CancelSVG />
        </button>
      </div>
      <div className="border-white/30 border rounded-xl absolute inset-0 z-40 "></div>
    </div>
  );
};

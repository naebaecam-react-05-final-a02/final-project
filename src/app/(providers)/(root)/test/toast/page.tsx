'use client';
import Button from '@/components/Button';
import { useToast } from '@/contexts/toast.context/toast.context';
import Mobile from '@/layouts/Mobile';

const ToastTestPage = () => {
  const toast = useToast();
  const openToast = () => toast.add('toast');

  return (
    <Mobile>
      <div className="w-full h-full flex flex-col justify-end gap-4 py-4">
        <div className="w-full px-10">
          <Button onClick={openToast}>모달 테스트</Button>
        </div>
      </div>
    </Mobile>
  );
};
export default ToastTestPage;

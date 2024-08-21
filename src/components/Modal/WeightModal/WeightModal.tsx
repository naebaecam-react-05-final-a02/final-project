'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useToast } from '@/contexts/toast.context/toast.context';
import api from '@/service/service';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import AnimatedModalFrame from '../AnimatedModalFrame';
import CalendarController from './CalendarController';

interface WeightModalProps {
  id: string;
}

const WeightModal = ({ id }: WeightModalProps) => {
  const modal = useModal();
  const toast = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState<number | null>(null);

  const handleClickConfirm = () => {
    setIsVisible(false);
    setTimeout(() => {
      modal.close(id);
    }, 300);
  };

  const resetForm = () => {
    setWeight(null);
    setDate(new Date());
  };

  const { mutate: weightMutation, isPending } = useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => api.dashboard.postUserWeight({ formData }),
    onSuccess: ({ status }) => {
      if (status !== 200) {
        toast.add('저장에 실패했습니다');
      }
      resetForm();
      toast.add('저장되었습니다');
    },
  });

  const handleSubmitWeight = () => {
    const formData = new FormData();
    if (!weight) return modal.alert(['몸무게를 입력해주세요']);
    formData.append('weight', weight.toString());
    formData.append('date', date.toISOString());
    weightMutation({ formData });
  };

  return (
    <AnimatedModalFrame isVisible={isVisible}>
      <div className="w-full h-full flex flex-col gap-4 justify-between">
        <div className="w-full flex justify-between px-2">
          <h3 className="text-18 font-semibold text-white">몸무게 입력</h3>
          <CalendarController date={date} setDate={setDate} />
        </div>
        {isPending ? (
          <div className="h-12 w-full flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="h-12 w-full flex gap-2">
            <div>
              <Input
                type="number"
                value={weight === null ? '' : weight}
                placeholder="0"
                unit="kg"
                onChange={(e) => {
                  // console.log(e);
                  setWeight(Number.parseInt(e.target.value));
                }}
              />
            </div>
            <div
              className={`w-16 flex items-center justify-center ${
                weight ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Button onClick={handleSubmitWeight} className={`h-12 box-border `}>
                확인
              </Button>
            </div>
          </div>
        )}

        <Button className={' w-full h-16'} onClick={handleClickConfirm}>
          닫기
        </Button>
      </div>
    </AnimatedModalFrame>
  );
};

export default WeightModal;

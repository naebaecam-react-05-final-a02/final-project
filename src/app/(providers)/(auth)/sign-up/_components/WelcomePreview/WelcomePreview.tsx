'use client';
import { useGetUser } from '@/hooks/auth/useUsers';
import { WelcomePreviewProps } from '@/types/auth';
import Image from 'next/image';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import WelcomeMessage from './WelcomeMessage';

const WelcomePreview = ({ currentStep, setCurrentStep }: WelcomePreviewProps) => {
  const { data: user, error, isLoading } = useGetUser();

  const handleSlideChange = (swiper: SwiperType) => {
    if (swiper.activeIndex === 0) {
      setCurrentStep('success1');
    } else {
      setCurrentStep('success2');
    }
  };

  return (
    <>
      <Swiper className="w-screen" onSlideChange={handleSlideChange}>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center gap-4">
            <WelcomeMessage nickname={user?.nickname ?? '테스트'} />
            <div className="relative w-[196px] h-[426px] mt-8">
              <Image src="/preview-image.png" alt="사이트 미리보기" fill className="object-contain" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <WelcomeMessage nickname={user?.nickname ?? '테스트'} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default WelcomePreview;

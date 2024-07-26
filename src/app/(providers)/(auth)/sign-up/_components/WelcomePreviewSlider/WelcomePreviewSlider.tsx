'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const WelcomePreviewSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <>
      <Swiper className="welcomeSlider" onSlideChange={handleSlideChange}>
        <SwiperSlide>
          <div className="flex flex-col h-full justify-center items-center gap-4">
            <h2 className="text-2xl font-bold mb-4">회원가입 성공! 🚀</h2>
            <p className="mb-4">회원가입이 성공적으로 완료되었습니다.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image src="/preview-image-1.png" alt="사이트 미리보기 1" fill className="object-contain" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image src="/preview-image-2.png" alt="사이트 미리보기 2" fill className="object-contain" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image src="/preview-image-3.png" alt="사이트 미리보기 3" fill className="object-contain" />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="flex justify-center gap-4 my-4">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
              activeIndex === index ? 'bg-blue-500 w-6' : 'bg-gray-300 w-3'
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default WelcomePreviewSlider;

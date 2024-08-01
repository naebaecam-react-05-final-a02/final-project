import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PrevButton from './PrevButton';
import SlideItem from './SlideItem';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperRef>(null);
  console.log(activeIndex);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.on('slideChange', () => {
        setActiveIndex(swiperRef.current?.swiper.activeIndex || 0);
      });
    }
  }, [swiperRef.current?.swiper.activeIndex]);

  return (
    <div className="overflow-hidden flex justify-center">
      <div className="w-[810px]">
        <Swiper
          // install Swiper modules
          ref={swiperRef}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={3}
          navigation
          scrollbar={{ draggable: true, hide: true, enabled: false }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {Array.from({ length: 10 }, (_, i) => {
            return (
              <li className="flex items-center" key={i}>
                <SwiperSlide>
                  <SlideItem index={i - 1} activeIndex={activeIndex} />
                </SwiperSlide>
              </li>
            );
          })}

          <PrevButton>다음</PrevButton>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;

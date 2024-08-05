'use client';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { useGetPopularChallenges } from '@/hooks/challenge/useChallenge';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { TChallenge } from '../../_types/types';
import ArticleTitle from '../ArticleTitle/ArticleTitle';
import SlideItem from './SlideItem/SlideItem';

const PopularChallengesSlider = () => {
  const { data: challenges, isPending } = useGetPopularChallenges();
  console.log(challenges);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.on('slideChange', () => {
        setActiveIndex(swiperRef.current?.swiper.activeIndex || 0);
      });
    }
  }, [swiperRef.current?.swiper.activeIndex]);

  return (
    <article className="flex flex-col gap-4">
      <div className="flex justify-between px-4">
        <ArticleTitle icon="🔥" title="가장 핫한 챌린지" />
        <Link className="text-sm text-primary-100" href="/challenges/all">
          전체보기 &gt;
        </Link>
      </div>

      <div className="overflow-hidden flex justify-center">
        <div className="w-[810px]">
          <Swiper
            // install Swiper modules
            ref={swiperRef}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={3}
            scrollbar={{ draggable: true, hide: true, enabled: false }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {isPending ? (
              <p>Loading...</p>
            ) : (
              challenges.data.map((challenge: TChallenge, i: number) => {
                return (
                  <li className="flex items-center" key={i}>
                    <SwiperSlide>
                      <SlideItem challenge={challenge} index={i - 1} activeIndex={activeIndex} />
                    </SwiperSlide>
                  </li>
                );
              })
            )}
          </Swiper>
        </div>
      </div>
    </article>
  );
};

export default PopularChallengesSlider;

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

const prevDummySlide = {
  category: 'lifestyle',
  content: 'dummy',
  createdBy: '2024-01-01',
  endDate: '2024-01-01',
  id: 0,
  imageURL: null,
  isProgress: null,
  participants: 100,
  rating: 5,
  startDate: '2024-01-01',
  tags: null,
  title: 'dummy',
  verify: 'dummy',
};

const nextDummySlide = {
  category: 'lifestyle',
  content: 'dummy',
  createdBy: '2024-01-01',
  endDate: '2024-01-01',
  id: 9999,
  imageURL: null,
  isProgress: null,
  participants: 100,
  rating: 5,
  startDate: '2024-01-01',
  tags: null,
  title: 'dummy',
  verify: 'dummy',
};

const PopularChallengesSlider = () => {
  const { data: challenges, isPending } = useGetPopularChallenges();

  const getChallengeList = () => [prevDummySlide, ...challenges?.data, nextDummySlide];
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
          >
            {isPending ? (
              <p>Loading...</p>
            ) : (
              getChallengeList().map((challenge: TChallenge, i: number) => {
                return (
                  <SwiperSlide key={challenge.id}>
                    <SlideItem challenge={challenge} index={i - 1} activeIndex={activeIndex} />
                  </SwiperSlide>
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

import useDateStore from '@/stores/date.store';
import { isToday as getIsToday } from 'date-fns';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { getLastDayOfMonth } from '@/utils/dateFormatter';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import DateCell from './DateCell';

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

const Week = () => {
  const selectedDate = useDateStore((store) => store.date);
  const setSelectedDate = useDateStore((store) => store.setDate);
  const dateArray: Date[] = Array.from(
    { length: getLastDayOfMonth(selectedDate).getDate() },
    (_, i) => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1),
  );

  const ChangeSwiper = () => {
    const swiper = useSwiper();

    useEffect(() => {
      if (swiper) swiper.slideTo(selectedDate.getDate() - 1);
    }, [swiper, selectedDate]);

    return null;
  };

  return (
    <Swiper
      initialSlide={selectedDate.getDate() - 1}
      className="w-full grid grid-cols-7 justify-items-center"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={7}
      centeredSlides={true}
      scrollbar={{ draggable: true, hide: true, enabled: false }}
      onSlideChange={(swiper) => {
        setSelectedDate(dateArray[swiper.activeIndex]);
      }}
      onClick={(swiper, e) => {
        if (e.target instanceof HTMLElement) {
          const value = e.target.textContent as string;
          setSelectedDate(dateArray[parseInt(value) - 1]);
        }
      }}
    >
      <ChangeSwiper />
      {dateArray.map((cellDate, idx) => {
        const date = cellDate.getDate();
        const day = cellDate.getDay();
        const isToday = getIsToday(cellDate);
        return (
          <SwiperSlide key={`date-${date}`}>
            <div
              className={`w-full flex flex-col justify-between items-center ${
                idx === selectedDate.getDate() - 1 && 'bg-whiteT-5 rounded-full'
              }`}
            >
              <div className={`w-full text-center pt-4 text-xs ${isToday ? 'text-primary-30' : 'text-whiteT-30'}`}>
                {dayNames[day]}
              </div>
              <DateCell isToday={isToday}>{date}</DateCell>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Week;

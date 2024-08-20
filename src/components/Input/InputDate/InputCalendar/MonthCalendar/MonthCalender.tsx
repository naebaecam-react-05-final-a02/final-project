'use client';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface MonthCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onChangeMonth: (date: Date) => void;
  onPrevMonth: (callback: () => void) => void;
  onNextMonth: (callback: () => void) => void;
}

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');

// 한국 시간대 설정
dayjs.tz.setDefault('Asia/Seoul');

const MonthCalender = ({ selectedDate, onSelectDate, onChangeMonth, onPrevMonth, onNextMonth }: MonthCalendarProps) => {
  const [months, setMonths] = useState<Date[]>(() => {
    const today = new Date();
    const monthsList: Date[] = [];
    for (let i = -6; i <= 6; i++) {
      const month = new Date(today.getFullYear(), today.getMonth() + i, 1);
      monthsList.push(month);
    }
    return monthsList;
  });
  const selectedMonthIndex = months.findIndex((month) => dayjs(month).isSame(dayjs(selectedDate), 'month'));
  const [currentMonthIndex, setCurrentMonthIndex] = useState(selectedMonthIndex !== -1 ? selectedMonthIndex : 6);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      onPrevMonth(() => swiperRef.current?.slidePrev());
      onNextMonth(() => swiperRef.current?.slideNext());
    }
  }, [onPrevMonth, onNextMonth]);

  useEffect(() => {
    if (months.length > 0) {
      onChangeMonth(months[currentMonthIndex]);
    }
  }, [selectedDate, months, currentMonthIndex, onChangeMonth]);

  const generateMonthWeeks = (month: Date) => {
    const startOfMonth = dayjs(month).startOf('month');
    const endOfMonth = dayjs(month).endOf('month');
    const startDate = startOfMonth.startOf('week');
    const endDate = endOfMonth.endOf('week');

    const monthWeeks: Date[][] = [];
    let currentWeek: Date[] = [];

    for (let day = startDate; day.isBefore(endDate) || day.isSame(endDate); day = day.add(1, 'day')) {
      currentWeek.push(day.toDate());
      if (currentWeek.length === 7) {
        monthWeeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return monthWeeks;
  };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 gap-1 w-full">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <th
                key={index}
                className={`aspect-square flex text-whiteT-70 justify-center items-center font-medium text-[12px] cursor-pointer `}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setCurrentMonthIndex(swiper.activeIndex);
          onChangeMonth(months[swiper.activeIndex]);
        }}
        initialSlide={currentMonthIndex}
        spaceBetween={50}
        slidesPerView={1}
        className="h-56"
      >
        {months.map((month, monthIndex) => (
          <SwiperSlide key={monthIndex}>
            <div>
              {generateMonthWeeks(month).map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-1">
                  {week.map((date, dateIndex) => {
                    const isToday = dayjs(date).isSame(dayjs(), 'day');
                    return (
                      <div
                        key={dateIndex}
                        className={`aspect-square flex justify-center rounded-full items-center cursor-pointer p-[6px]
                          ${dayjs(date).isSame(selectedDate, 'day') ? 'bg-primary-10' : ''}
                          ${date.getMonth() !== month.getMonth() ? 'text-gray-400' : ''}
                          ${isToday ? 'text-primary-100' : ''}`}
                        onClick={() => onSelectDate(dayjs(date).tz().toDate())}
                      >
                        <span
                          className={`
                            text-center
                            text-base
                            font-normal
                            ${isToday ? 'font-semibold' : ''}
                            ${dayjs(date).isSame(selectedDate, 'day') ? 'text-primary-100' : ''}
                          `}
                        >
                          {date.getDate()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MonthCalender;

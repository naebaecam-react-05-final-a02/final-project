'use client';
import Week from '@/components/Calendar/Week';
import Header from '@/components/Header';
import Mobile from '@/layouts/Mobile';
import useDateStore from '@/stores/date.store';
import useDietStore from '@/stores/diet.store';
import { useRouter } from 'next/navigation';
import DietList from './_components/DietList';
import PlusIcon from '/public/icons/plus.svg';

const DietPage = () => {
  const router = useRouter();

  const selectedDate = useDateStore((store) => store.date);
  const setDiet = useDietStore((state) => state.setDiet);

  const handleAddButtonClick = () => {
    setDiet(null);
    router.push('/diets/write');
  };

  return (
    <Mobile
      headerLayout={
        <Header
          title={`${selectedDate.getFullYear()}년${selectedDate.getMonth() + 1}월`}
          icon={<PlusIcon className="w-6 h-6" onClick={handleAddButtonClick} />}
          // titleIcon={<DownIcon />}
        />
      }
    >
      <div className="flex flex-col gap-8">
        <span className="w-10" aria-hidden="true" role="presentation"></span>
        {/* <header className="flex justify-between items-center">
          <button
            className="flex w-10 h-10 justify-center items-center rounded-xl backdrop-blur-[5px] shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_hsla(0, 0%, 100%, 0.1)]"
            onClick={() => {
              router.back();
            }}
          >
            <LeftIcon />
          </button>
          <div className="flex gap-1">
            <h1 className="text-center text-sm font-medium">
              {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
            </h1>
            <button
              onClick={() => {
                // <Month selectedDate={selectedDate} changeDate={changeDate} />
              }}
            >
              <DownIcon />
            </button>
          </div>
          <button
            className="flex w-10 h-10 justify-center items-center rounded-xl backdrop-blur-[5px] shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_hsla(0, 0%, 100%, 0.1)]"
            onClick={handleAddButtonClick}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </header> */}
        <Week />
        <DietList selectedDate={selectedDate} />
      </div>
    </Mobile>
  );
};

export default DietPage;

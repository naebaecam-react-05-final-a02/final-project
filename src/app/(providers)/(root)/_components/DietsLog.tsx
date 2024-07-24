const DietsLog = () => {
  return (
    <div className="bg-white size-full relative p-2 box-border divide-y-[1px] divide-gray-300 text-sm">
      <h5 className="text-base text-center font-bold pb-2">오늘의 칼로리</h5>
      <div className="flex flex-col flex-1 h-full divide-y-[1px] divide-gray-300">
        <div className="flex  justify-between px-2 items-end">
          <p className="font-bold text-base">Calories</p>
          <div className="flex gap-x-px items-end">
            <p className="font-bold text-base">2,000</p>
            <p className="text-gray-500 text-[11px]">Kcal</p>
          </div>
        </div>
        <div className="grid place-items-center flex-1 divide-y-[1px] divide-gray-300">
          <div className="flex justify-around w-full divide-x-[1px] divide-gray-300  font-bold p-2">
            <div className="w-full flex-1 flex justify-center items-center">탄수화물</div>
            <div className="w-full flex-1 flex justify-center items-center">단백질</div>
            <div className="w-full flex-1 flex justify-center items-center">지방</div>
          </div>
          <div className="flex justify-around w-full divide-x-[1px] divide-gray-300  p-2">
            <div className="w-full flex-1 flex justify-center items-center">20g</div>
            <div className="w-full flex-1 flex justify-center items-center">20g</div>
            <div className="w-full flex-1 flex justify-center items-center">20g</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietsLog;

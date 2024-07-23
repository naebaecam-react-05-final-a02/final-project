'use client';

const DateRange = () => {
  return (
    <div className="flex text-xs gap-x-2 justify-around">
      <button className=" bg-green-300 py-px px-2 rounded">7일</button>
      <button className=" bg-green-300 py-px px-2 rounded">30일</button>
      <button className=" bg-green-300 py-px px-2 rounded">90일</button>
      <button className=" bg-green-300 py-px px-2 rounded">365일</button>
      <button className=" bg-green-300 py-px px-2 rounded">All</button>
    </div>
  );
};

export default DateRange;

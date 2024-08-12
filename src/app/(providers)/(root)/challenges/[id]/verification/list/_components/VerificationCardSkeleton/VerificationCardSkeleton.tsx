const VerificationCardSkeleton = () => {
  return (
    <article className="rounded-3xl bg-white/5 border border-white/10 box-border p-2 flex flex-col gap-3 select-none">
      <div className="w-full aspect-[8/7] bg-gray-500 rounded-2xl relative overflow-hidden"></div>
      <div>
        <div className="flex gap-1 items-center">
          <div className="w-[18px] h-[18px] bg-gray-500 border border-white rounded-full relative"></div>
          <p className="text-white/70 text-[12px] w-full"></p>
        </div>
        <p className="text-[12px] text-white w-full"></p>
      </div>
    </article>
  );
};

export default VerificationCardSkeleton;

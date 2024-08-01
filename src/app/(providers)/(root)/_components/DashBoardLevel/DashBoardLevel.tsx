import LevelProgress from '../LevelProgress';

const DashBoardLevel = () => {
  return (
    <>
      <div className="w-8 h-full absolute bg-gradient-to-r from-[#12121266] to-[#12121201] left-0"></div>
      <div className="w-8 h-full absolute bg-gradient-to-l from-[#12121266] to-[#12121201] right-0"></div>
      <div className="absolute left-4 top-4 gap-y-1 grid">
        <h5 className="text-white/50 text-sm">헬린이</h5>
        <h6 className="text-[28px]">Lv.1</h6>
      </div>
      <div className="absolute bottom-9">
        <div className="-rotate-[15deg] flex  w-[100px] justify-center items-center relative ">
          <div className="absolute -left-[95px] -bottom-[11px] -rotate-[15deg] bg-[#37cc85] w-[100px] h-2" />
          <div className="absolute -left-2 rounded-full bg-[#5effb2] p-px size-4 z-10 flex justify-center items-center">
            <div
              className="size-full rounded-full bg-[#37cc85] border-[1px] border-white/60"
              style={{ filter: 'url(#glow)' }}
            />
          </div>
          <LevelProgress />
          <div className="absolute -right-2 rounded-full bg-white/10 p-px size-4 z-10 flex justify-center items-center">
            <div className="size-full rounded-full bg-[#292929] border-[1px] border-white/20" />
          </div>
          <div className="absolute -right-[95px] -top-[11px] -rotate-[15deg] bg-white/5 w-[100px] h-2" />
        </div>
      </div>
    </>
  );
};

export default DashBoardLevel;

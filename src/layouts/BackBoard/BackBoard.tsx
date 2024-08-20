const BackBoard = () => {
  return (
    <div className="fixed inset-0 bg-[#0E0C15] -z-30 overflow-hidden">
      <div className="relative w-full h-full max-w-[390px] mx-auto">
        <div className="w-[140px] h-[300px] absolute top-[70px] left-[48px] blur-[150px] rounded-full bg-[#52467B]"></div>
        <div className="w-[340px] h-[105px] absolute bottom-[36px] left-[74px] blur-[150px] bg-white/40 flex-shrink-0 rounded-full"></div>
      </div>
    </div>
  );
};

export default BackBoard;

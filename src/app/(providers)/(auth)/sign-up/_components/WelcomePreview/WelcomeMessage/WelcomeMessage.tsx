const WelcomeMessage = ({ nickname }: { nickname: string }) => (
  <div className="flex flex-col w-full px-4 justify-start items-start gap-2 mt-8 sm:mt-10">
    <div className="flex flex-col justify-start items-start gap-1 ">
      <div className="flex justify-start items-center gap-1 text-lg font-semibold text-white">
        <div>{nickname}</div>
        <div>님!</div>
      </div>
      <div className="self-stretch text-white text-lg font-semibold">
        <p>
          OOS:<span className="text-[#12f287] text-lg font-semibold ">E</span>에 가입해 주셔서 감사합니다 :)
        </p>
      </div>
    </div>
    <div className="self-stretch text-white/70 text-xs font-medium leading-none">
      메인으로 이동해 다양한 서비스를 이용해 보세요!
    </div>
  </div>
);

export default WelcomeMessage;

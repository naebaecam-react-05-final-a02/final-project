const Button = () => {
  return (
    <button
      type="button"
      className="w-full h-[50px] flex px-6 py-[13px] rounded-lg justify-center items-center relative overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(18, 242, 135, 0) 100%),
          rgba(18, 242, 135, 0.7)
        `,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
      <div className="text-white text-[15px] font-semibold font-['Pretendard'] leading-[21px] relative z-10">
        로그인
      </div>
    </button>
  );
};

export default Button;

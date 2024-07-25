import { EssentialInfoFormProps } from '@/types/auth';

const EssentialInfoForm = ({ formState, handleChange, handleCheckDuplicate, onSubmit }: EssentialInfoFormProps) => {
  return (
    <form
      className="flex flex-col gap-4 items-center justify-center w-full max-w-[390px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
        <div className="w-full">
          <label htmlFor="email" className="block w-full font-semibold text-[18px] mb-1.5">
            이메일
            <span className="text-red-500">*</span>
          </label>
          <div className="flex w-full">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
              value={formState.email.value}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => handleCheckDuplicate('email')}
              disabled={formState.email.isChecking}
              className="bg-[#D9D9D9] w-20 h-full text-nowrap rounded-md px-2.5 py-2 ml-2 hover:brightness-90"
              aria-label="이메일 중복 확인"
            >
              {formState.email.isChecking ? '확인 중' : '확인'}
            </button>
          </div>
        </div>
        {formState.email.error && <p className="text-red-500 text-sm mt-1">{formState.email.error}</p>}
        {formState.email.successMessage && (
          <p className="text-green-500 text-sm mt-1">{formState.email.successMessage}</p>
        )}
      </div>

      <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
        <div className="w-full">
          <label htmlFor="nickname" className="w-full block font-semibold text-[18px] mb-1.5">
            닉네임
            <span className="text-red-500">*</span>
          </label>
          <div className="flex w-full">
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
              value={formState.nickname.value}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => handleCheckDuplicate('nickname')}
              disabled={formState.nickname.isChecking}
              className="bg-[#D9D9D9] w-20 h-full text-nowrap rounded-md px-2.5 py-2 ml-2 hover:brightness-90"
              aria-label="닉네임 중복 확인"
            >
              {formState.nickname.isChecking ? '확인 중' : '확인'}
            </button>
          </div>
        </div>
        {formState.nickname.error && <p className="text-red-500 text-sm mt-1">{formState.nickname.error}</p>}
        {formState.nickname.successMessage && (
          <p className="text-green-500 text-sm mt-1">{formState.nickname.successMessage}</p>
        )}
      </div>

      <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
        <div className="w-full">
          <label htmlFor="password" className="block font-semibold text-[18px] mb-1.5">
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
            value={formState.password.value}
            onChange={handleChange}
            required
          />
          {formState.password.error && <p className="text-red-500 text-sm mt-1">{formState.password.error}</p>}
          <label htmlFor="confirmPassword" className="block font-semibold text-[18px] mb-1.5 mt-4">
            비밀번호 확인:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
            value={formState.confirmPassword.value}
            onChange={handleChange}
            required
          />
          {formState.confirmPassword.error && (
            <p className="text-red-500 text-sm mt-1">{formState.confirmPassword.error}</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-20  bg-[#3ECF8E] w-full text-[20px] font-semibold px-4 py-2 rounded hover:brightness-90"
        >
          다음
        </button>
      </div>
    </form>
  );
};

export default EssentialInfoForm;

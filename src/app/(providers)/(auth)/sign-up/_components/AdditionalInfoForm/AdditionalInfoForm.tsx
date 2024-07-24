import { AdditionalInfoFormProps } from '@/types/auth';
import Image from 'next/image';

const AdditionalInfoForm = ({ formState, handleChange, handleImageChange, onSubmit }: AdditionalInfoFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center justify-center w-full max-w-[390px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]"
    >
      <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
        <div className="w-full mb-4 flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-full bg-[#F6F6F6]">
            <div className="absolute inset-2">
              <Image
                src={
                  formState.profileImage?.value
                    ? URL.createObjectURL(formState.profileImage.value)
                    : '/default-profile.png'
                }
                alt="Profile preview"
                fill
                className="object-cover rounded-full"
              />
            </div>

            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
            >
              <span className="text-white text-xl">+</span>
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {formState.profileImage?.error && <p className="text-red-500 text-sm mt-1">{formState.profileImage.error}</p>}
        </div>

        <div className="w-full mb-4">
          <label htmlFor="height" className="block font-semibold text-[18px] mb-1.5">
            키 (cm):
          </label>
          <input
            type="number"
            id="height"
            name="height"
            className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
            value={formState.height?.value ?? ''}
            onChange={handleChange}
          />
          {formState.height?.error && <p className="text-red-500 text-sm mt-1">{formState.height.error}</p>}
        </div>

        <div className="w-full mb-4">
          <label htmlFor="weight" className="block font-semibold text-[18px] mb-1.5">
            몸무게 (kg):
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
            value={formState.weight?.value ?? ''}
            onChange={handleChange}
          />
          {formState.weight?.error && <p className="text-red-500 text-sm mt-1">{formState.weight.error}</p>}
        </div>

        <button
          type="submit"
          className="mt-8 bg-[#3ECF8E] w-full text-[20px] font-semibold px-4 py-2 rounded hover:brightness-90"
        >
          회원가입 완료
        </button>
      </div>
    </form>
  );
};

export default AdditionalInfoForm;

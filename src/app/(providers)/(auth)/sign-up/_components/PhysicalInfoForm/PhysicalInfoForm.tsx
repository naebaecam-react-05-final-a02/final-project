import Input from '@/components/Input';
import { FormState, PhysicalInfoFormProps } from '@/types/auth';

const PhysicalInfoForm = ({ formState, setFormState }: PhysicalInfoFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(value)) {
      return;
    }
    let error: string | null = null;
    const numValue = Number(value);

    if (name === 'height') {
      if (value && (numValue < 100 || numValue > 250)) {
        error = '유효한 키 범위를 입력해주세요 (100cm - 250cm).';
      }
    } else if (name === 'weight') {
      if (value && (numValue < 30 || numValue > 300)) {
        error = '유효한 몸무게 범위를 입력해주세요 (30kg - 300kg).';
      }
    }

    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormState],
        value,
        error,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <div className="flex flex-col items-center w-full">
        <div className="w-full mb-4">
          <h3 className="text-18 font-semibold mt-8 mb-6 text-white">키, 몸무게를 알려주세요!</h3>
          <Input
            label="키"
            type="number"
            name="height"
            className="appearance-none  [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
            unit="cm"
            value={formState.height?.value ?? ''}
            onChange={handleChange}
            error={formState.height?.error}
            placeholder="선택사항"
          />
        </div>

        <div className="w-full mb-4">
          <Input
            label="몸무게"
            type="number"
            id="weight"
            name="weight"
            className="appearance-none  [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
            unit="kg"
            value={formState.weight?.value ?? ''}
            onChange={handleChange}
            error={formState.weight?.error}
            placeholder="선택사항"
          />
        </div>
      </div>
      <ul className="list-disc w-full px-4 text-white/50 text-xs font-normal">
        <li>키, 몸무게는 마이페이지에서 변경 가능합니다.</li>
      </ul>
    </div>
  );
};

export default PhysicalInfoForm;

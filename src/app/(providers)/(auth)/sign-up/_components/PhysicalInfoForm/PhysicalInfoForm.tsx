import Input from '@/components/Input';
import { FormState, PhysicalInfoFormProps } from '@/types/auth';

const PhysicalInfoForm = ({ formState, setFormState }: PhysicalInfoFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormState],
        value,
        error: null,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <div className="flex flex-col items-center w-full px-4">
        <div className="w-full mb-4">
          <Input
            label="키 (cm):"
            type="number"
            name="height"
            value={formState.height?.value ?? ''}
            onChange={handleChange}
            error={formState.height?.error}
            placeholder="선택사항"
          />
        </div>

        <div className="w-full mb-4">
          <Input
            label="몸무게 (kg):"
            type="number"
            id="weight"
            name="weight"
            className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
            value={formState.weight?.value ?? ''}
            onChange={handleChange}
            error={formState.weight?.error}
            placeholder="선택사항"
          />
        </div>
      </div>
    </div>
  );
};

export default PhysicalInfoForm;

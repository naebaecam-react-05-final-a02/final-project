import { FormState } from '@/types/auth';

const validatePhysicalInfo = (formState: FormState): { isValid: boolean; errors: Partial<FormState> } => {
  let isValid = true;
  const errors: Partial<FormState> = {};

  if (formState.height) {
    const heightValue = Number(formState.height.value);
    if (formState.height.value && (isNaN(heightValue) || heightValue < 100 || heightValue > 250)) {
      errors.height = {
        value: formState.height.value,
        error: '유효한 키 범위를 입력해주세요 (100cm - 250cm).',
      };
      isValid = false;
    }
  }

  if (formState.weight) {
    const weightValue = Number(formState.weight.value);
    if (formState.weight.value && (isNaN(weightValue) || weightValue < 30 || weightValue > 300)) {
      errors.weight = {
        value: formState.weight.value,
        error: '유효한 몸무게 범위를 입력해주세요 (30kg - 300kg).',
      };
      isValid = false;
    }
  }

  return { isValid, errors };
};

export default validatePhysicalInfo;

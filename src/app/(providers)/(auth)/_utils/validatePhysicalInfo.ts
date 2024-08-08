import { FormState } from '@/types/auth';

const validatePhysicalInfo = (formState: FormState): { isValid: boolean; errors: Partial<FormState> } => {
  let isValid = true;
  const errors: Partial<FormState> = {};

  const validateNumericInput = (value: string, fieldName: 'height' | 'weight') => {
    // 숫자만 허용하는 정규식
    const numericRegex = /^[0-9]+$/;

    if (value && !numericRegex.test(value)) {
      errors[fieldName] = {
        value: value,
        error: '숫자만 입력 가능합니다.',
      };
      isValid = false;
    } else {
      const numValue = Number(value);
      if (fieldName === 'height') {
        if (value && (isNaN(numValue) || numValue < 100 || numValue > 250)) {
          errors.height = {
            value: value,
            error: '유효한 키 범위를 입력해주세요 (100cm - 250cm).',
          };
          isValid = false;
        }
      } else if (fieldName === 'weight') {
        if (value && (isNaN(numValue) || numValue < 30 || numValue > 300)) {
          errors.weight = {
            value: value,
            error: '유효한 몸무게 범위를 입력해주세요 (30kg - 300kg).',
          };
          isValid = false;
        }
      }
    }
  };

  if (formState.height) {
    validateNumericInput(formState.height.value, 'height');
  }

  if (formState.weight) {
    validateNumericInput(formState.weight.value, 'weight');
  }

  return { isValid, errors };
};

export default validatePhysicalInfo;

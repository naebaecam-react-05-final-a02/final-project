import { FormState } from '@/types/auth';

export const initialFormState: FormState = {
  email: {
    value: '',
    error: null,
    successMessage: null,
    isVerified: false,
    isChecking: false,
  },
  nickname: {
    value: '',
    error: null,
    successMessage: null,
    isVerified: false,
    isChecking: false,
  },
  password: {
    value: '',
    error: null,
  },
  confirmPassword: {
    value: '',
    error: null,
  },
  height: {
    value: '',
    error: null,
  },
  weight: {
    value: '',
    error: null,
  },
  profileImage: {
    value: null,
    error: null,
  },
};

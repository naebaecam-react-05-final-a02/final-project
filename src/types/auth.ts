import { ChangeEvent, FormEvent } from 'react';

export interface FormState {
  email: {
    value: string;
    error: string | null;
    successMessage: string | null;
    isVerified: boolean;
    isChecking: boolean;
  };
  nickname: {
    value: string;
    error: string | null;
    successMessage: string | null;
    isVerified: boolean;
    isChecking: boolean;
  };
  password: {
    value: string;
    error: string | null;
  };
  confirmPassword: {
    value: string;
    error: string | null;
  };
  height?: {
    value: string;
    error: string | null;
  };
  weight?: {
    value: string;
    error: string | null;
  };
  profileImage?: {
    value: File | null;
    error: string | null;
  };
}

export interface EssentialInfoFormProps {
  formState: FormState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCheckDuplicate: (field: 'email' | 'nickname') => Promise<void>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

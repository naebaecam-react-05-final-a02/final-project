import { ChangeEvent, FormEvent } from 'react';

// 회원가입 폼 상태
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
// 필수 입력 사항 폼 props
export interface EssentialInfoFormProps {
  formState: FormState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCheckDuplicate: (field: 'email' | 'nickname') => Promise<void>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

//선택 입력 사항 폼 props
export interface AdditionalInfoFormProps {
  formState: FormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

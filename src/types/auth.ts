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
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  checkDuplicate: (field: 'email' | 'nickname', value: string) => Promise<boolean>;
  onNext: () => void;
}

//선택 입력 사항 폼 props
export interface AdditionalInfoFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: (formData: FormData) => Promise<void>;
}

// 회원가입 필요한 사용자 정보
export interface SignUpFields {
  email: string;
  password: string;
  nickname: string;
  height?: string;
  weight?: string;
  profileImage?: File | null;
}

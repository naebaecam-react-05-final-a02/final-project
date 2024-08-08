export interface TInputs {
  email: string;
  nickname: string;
  height: number;
  weight: number;
  introduction: string;
}

export interface ProfileFormTypes extends TInputs {
  avatar: File | null;
}

export interface TInputs {
  email: string;
  nickname: string;
  height: number;
  weight: number;
}

export interface ProfileFormTypes extends TInputs {
  avatar: File | null;
}

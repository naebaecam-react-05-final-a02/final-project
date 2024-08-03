export interface TInputs {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface ProfileFormTypes extends TInputs {
  avatar: File | null;
}

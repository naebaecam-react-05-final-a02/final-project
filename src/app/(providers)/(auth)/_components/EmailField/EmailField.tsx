import Input from '@/components/Input';

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const EmailField = ({ value, onChange, error }: EmailFieldProps) => {
  return (
    <Input
      label="이메일"
      placeholder="이메일을 입력해 주세요."
      value={value}
      onChange={onChange}
      name="email"
      type="email"
      autoComplete="on"
      error={error}
    />
  );
};

export default EmailField;

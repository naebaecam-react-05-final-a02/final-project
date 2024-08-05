import Input from '@/components/Input';

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const PasswordField = ({ value, onChange, error }: PasswordFieldProps) => {
  return (
    <Input
      label="비밀번호"
      placeholder="비밀번호를 입력해 주세요."
      value={value}
      onChange={onChange}
      name="password"
      type="password"
      autoComplete="off"
      error={error}
    />
  );
};

export default PasswordField;

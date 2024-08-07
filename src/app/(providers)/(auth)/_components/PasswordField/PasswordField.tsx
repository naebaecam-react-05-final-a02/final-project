import Input from '@/components/Input';

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
  isConfirmPassword?: boolean;
}

const PasswordField = ({ value, onChange, onBlur, error, isConfirmPassword = false }: PasswordFieldProps) => {
  return (
    <Input
      label={isConfirmPassword ? '비밀번호 확인' : '비밀번호'}
      placeholder={isConfirmPassword ? '비밀번호를 다시 입력해 주세요.' : '비밀번호를 입력해 주세요.'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={isConfirmPassword ? 'confirmPassword' : 'password'}
      type="password"
      autoComplete="off"
      error={error}
    />
  );
};

export default PasswordField;

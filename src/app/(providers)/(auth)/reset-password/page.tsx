// app/reset-password/page.tsx
import ResetPasswordForm from './_components/ResetPasswordForm';
import ResetPasswordRequestForm from './_components/ResetPasswordRequestForm';

const ResetPasswordPage = async ({ searchParams }: { searchParams: { code?: string } }) => {
  const code = searchParams.code;

  if (!code) {
    return <ResetPasswordRequestForm />;
  }

  return <ResetPasswordForm />;
};

export default ResetPasswordPage;

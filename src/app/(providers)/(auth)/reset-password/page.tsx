import { Suspense } from 'react';
import ResetPasswordForm from './_components/ResetPasswordForm';

const ResetPasswordPage = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;

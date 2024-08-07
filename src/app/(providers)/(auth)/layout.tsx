import AuthMobile from '@/layouts/AuthMobile/AuthMobile';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthMobile>{children}</AuthMobile>;
};

export default AuthLayout;

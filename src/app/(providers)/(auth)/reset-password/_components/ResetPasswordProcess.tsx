'use client';
import Header from '@/components/Header';
import { useState } from 'react';
import RequestResetForm from './RequestResetForm';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordProcess = () => {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRequestSuccess = (email: string) => {
    setEmail(email);
    setStep('reset');
  };

  return (
    <div className="flex flex-col w-full h-full px-4 justify-start items-center">
      <Header showLogo className="mb-8 px-4" />
      {step === 'request' && <RequestResetForm onSuccess={handleRequestSuccess} setError={setError} />}
      {step === 'reset' && <ResetPasswordForm email={email} setError={setError} />}
    </div>
  );
};

export default ResetPasswordProcess;

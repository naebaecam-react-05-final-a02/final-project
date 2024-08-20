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
    <div
      className="flex flex-col w-full h-full  items-end px-4  sm:max-w-[660px] sm:h-max sm:min-h-[820px] sm:mx-auto sm:mt-12 sm:px-[40px]  
  sm:border-[2px] sm:border-whiteT-10
  sm:rounded-[20px] sm:bg-blackT-5
  sm:shadow-[-4px_-4px_8px_0px_rgba(255,255,255,0.1),4px_4px_8px_0px_rgba(0,0,0,0.3)]
  sm:backdrop-blur-[8px]"
    >
      <Header showLogo className="mb-8 py-4" />
      {step === 'request' && <RequestResetForm onSuccess={handleRequestSuccess} setError={setError} />}
      {step === 'reset' && <ResetPasswordForm email={email} setError={setError} />}
    </div>
  );
};

export default ResetPasswordProcess;

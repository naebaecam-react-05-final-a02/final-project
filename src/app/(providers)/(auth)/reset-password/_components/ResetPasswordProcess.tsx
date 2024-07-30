'use client';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Link from 'next/link';
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
    <div className="flex flex-col w-full h-screen px-4 justify-between items-center">
      <Header showLogo className="mb-10" />
      {step === 'request' && <RequestResetForm onSuccess={handleRequestSuccess} setError={setError} />}
      {step === 'reset' && <ResetPasswordForm email={email} setError={setError} />}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      <Card className="custom-card">
        <h2 className="text-lg font-bold">웨이트</h2>
        <span className="text-sm text-gray-400">Lv. 23</span>
        <div className="flex items-center justify-between w-full">
          <span className="text-base">힙업 스트레칭</span>
        </div>
        {/* 추가 내용 */}
      </Card>

      <div className="relative mb-40 mt-6">
        <Link
          className="bg-green-600 w-full rounded-md py-3 px-6 transition-all duration-300 ease-in-out hover:translate-y-1 shadow-md border-b-4 border-black border-opacity-85 relative z-10 inline-block text-white font-semibold"
          href="/"
        >
          홈으로 가기
        </Link>
        <span className={`absolute top-1 left-0 bg-black opacity-80 rounded-md w-full h-full z-0`}></span>
      </div>
    </div>
  );
};

export default ResetPasswordProcess;

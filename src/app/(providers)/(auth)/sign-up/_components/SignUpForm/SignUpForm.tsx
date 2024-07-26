'use client';

import { initialFormState } from '@/data/authInitialState';
import { useCheckDuplicate, useSignUp } from '@/hooks/auth/useUsers';
import { FormState } from '@/types/auth';
import Link from 'next/link';
import { useState } from 'react';
import AdditionalInfoForm from '../AdditionalInfoForm';
import EssentialInfoForm from '../EssentialInfoForm/EssentialInfoForm';
import WelcomePreviewSlider from '../WelcomePreviewSlider/WelcomePreviewSlider';

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState('essentialInfo');
  // const [currentStep, setCurrentStep] = useState('success');
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const { mutateAsync: signUpAsync, isPending: isSignUpPending, error: signUpError } = useSignUp();
  const { mutateAsync: checkDuplicate } = useCheckDuplicate();

  const nextStep = () => {
    if (currentStep === 'essentialInfo') setCurrentStep('additionalInfo');
    else if (currentStep === 'additionalInfo') setCurrentStep('success');
  };

  const previousStep = () => {
    if (currentStep === 'additionalInfo') setCurrentStep('essentialInfo');
  };

  const handleSignUp = async (formData: FormData) => {
    try {
      await signUpAsync(formData);
      nextStep();
    } catch (error) {
      console.error('회원가입 중 오류 발생:', signUpError);
    }
  };

  return (
    <div className="flex flex-col gap-10 h-screen justify-center items-center w-full">
      <div className="flex gap-4 mb-4 mt-4">
        {['essentialInfo', 'additionalInfo', 'success'].map((stepName) => (
          <div
            key={stepName}
            className={`w-3 h-3 rounded-full ${currentStep === stepName ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      {currentStep === 'essentialInfo' && (
        <EssentialInfoForm
          formState={formState}
          setFormState={setFormState}
          checkDuplicate={async (field, value) => await checkDuplicate({ field, value })}
          onNext={nextStep}
        />
      )}
      {currentStep === 'additionalInfo' && (
        <>
          <AdditionalInfoForm
            formState={formState}
            setFormState={setFormState}
            onSubmit={handleSignUp}
            onPrevious={previousStep}
          />
        </>
      )}
      {currentStep === 'success' && (
        <div className="flex flex-col items-center justify-center max-w-[390px]">
          <WelcomePreviewSlider />
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
            홈으로 가기
          </Link>
        </div>
      )}
      {signUpError && <div className="text-red-500">{(signUpError as Error).message}</div>}
    </div>
  );
};

export default SignUpForm;

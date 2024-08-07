'use client';

import Button from '@/components/Button';
import { initialFormState } from '@/data/authInitialState';
import { useCheckDuplicate, useSignUp } from '@/hooks/auth/useUsers';
import { FormState } from '@/types/auth';

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import 'swiper/css';
import validateEssentialInfo from '../../../_utils/validateEssentialInfo';
import validateNicknameInfo from '../../../_utils/validateNicknameInfo';
import validatePhysicalInfo from '../../../_utils/validatePhysicalInfo';
import EssentialInfoForm from '../EssentialInfoForm/EssentialInfoForm';
import NicknameForm from '../NicknameForm';
import PhysicalInfoForm from '../PhysicalInfoForm';
import WelcomePreview from '../WelcomePreview';

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState('essentialInfo');
  // const [currentStep, setCurrentStep] = useState('success1');
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const route = useRouter();

  const { mutateAsync: signUpAsync, isPending: isSignUpPending, error: signUpError } = useSignUp();
  const { mutateAsync: checkDuplicate } = useCheckDuplicate();

  const handleNext = () => {
    if (currentStep === 'essentialInfo') {
      const { isValid, errors } = validateEssentialInfo(formState);
      if (isValid) {
        setCurrentStep('nicknameInfo');
      } else {
        setFormState((prev) => ({ ...prev, ...errors }));
      }
    } else if (currentStep === 'nicknameInfo') {
      const { isValid, errors } = validateNicknameInfo(formState);
      if (isValid) {
        setCurrentStep('physicalInfo');
      } else {
        setFormState((prev) => ({ ...prev, ...errors }));
      }
    } else if (currentStep === 'physicalInfo') {
      const { isValid, errors } = validatePhysicalInfo(formState);
      if (isValid) {
        handleSignUp();
      } else {
        setFormState((prev) => ({ ...prev, ...errors }));
      }
    } else if (currentStep === 'success1' || 'success2') {
      route.push('/');
    }
  };

  const handleSignUp = async () => {
    const formData = new FormData();
    formData.append('email', formState.email.value);
    formData.append('nickname', formState.nickname.value);
    formData.append('password', formState.password.value);
    if (formState.height?.value) formData.append('height', formState.height.value);
    if (formState.weight?.value) formData.append('weight', formState.weight.value);

    try {
      await signUpAsync(formData);
      setCurrentStep('success1');
    } catch (error) {
      console.error('회원가입 중 오류 발생:', signUpError);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between items-end w-full pb-10">
      <div className="w-full">
        {currentStep === 'essentialInfo' ? (
          <Header title="회원가입" className="px-4" />
        ) : (
          <Header showLogo showBackButton={false} className="px-4" />
        )}
        {currentStep === 'essentialInfo' && (
          <EssentialInfoForm
            formState={formState}
            setFormState={setFormState}
            checkDuplicate={async (field, value) => await checkDuplicate({ field, value })}
          />
        )}
        {currentStep === 'nicknameInfo' && (
          <NicknameForm
            formState={formState}
            setFormState={setFormState}
            checkDuplicate={async (field, value) => await checkDuplicate({ field, value })}
          />
        )}
        {currentStep === 'physicalInfo' && <PhysicalInfoForm formState={formState} setFormState={setFormState} />}

        {(currentStep === 'success1' || currentStep === 'success2') && (
          <WelcomePreview currentStep={currentStep} setCurrentStep={(step) => setCurrentStep(step)} />
        )}
        {signUpError && <div className="text-red-500">{(signUpError as Error).message}</div>}
      </div>
      <div className="flex flex-col items-center w-full px-4">
        {currentStep !== 'essentialInfo' && (
          <div className="flex gap-2 mb-8 mt-12">
            {['nicknameInfo', 'physicalInfo', 'success1', 'success2'].map((stepName) => (
              <div
                key={stepName}
                className={`w-2 h-2 rounded-full ${currentStep === stepName ? '!w-8 bg-primary-100 ' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
        <Button onClick={handleNext} className="bg-green-500 text-white px-4 py-2 rounded w-full">
          {currentStep === 'success1' || currentStep === 'success2' ? '메인으로' : '다음'}
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm;

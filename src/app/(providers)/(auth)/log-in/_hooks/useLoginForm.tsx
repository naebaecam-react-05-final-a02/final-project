import React, { useState } from 'react';
import { LogInFormData } from '../_components/LoginForm/LoginForm';

interface FormErrors extends Partial<Record<keyof LogInFormData, string | null>> {
  form?: string | null;
}

const useLoginForm = () => {
  const [formData, setFormData] = useState<LogInFormData>({
    email: '',
    password: '',
    keepLoggedIn: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    const validateEmail = (email: string) => {
      return !email.includes('@') ? '유효한 이메일 주소를 입력해주세요.' : null;
    };

    let error = null;
    if (name === 'email') {
      error = validateEmail(value);
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return { formData, setFormData, errors, handleChange, setErrors };
};

export default useLoginForm;

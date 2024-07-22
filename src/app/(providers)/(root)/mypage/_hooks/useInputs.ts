'use client';

import { useCallback, useState } from 'react';

function useInputs<T>(initialForm: T) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;

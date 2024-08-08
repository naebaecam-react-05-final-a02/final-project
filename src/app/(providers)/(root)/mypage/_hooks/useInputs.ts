'use client';

import { useCallback, useState } from 'react';

function useInputs<T>(initialForm: T) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'height' || name === 'weight') {
      setForm((form) => ({ ...form, [name]: Number(value) }));
    } else {
      setForm((form) => ({ ...form, [name]: value }));
    }
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset, setForm] as const;
}

export default useInputs;

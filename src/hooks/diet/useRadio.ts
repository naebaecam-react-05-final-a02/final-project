import { useState } from 'react';

const useRadio = <T>(values: T[], initialValue: T = values[0]) => {
  const [selectedValue, setSelectedValue] = useState<T>(initialValue);

  const handleChange = (value: T) => {
    setSelectedValue(value);
  };

  return { selectedValue, handleChange };
};

export default useRadio;

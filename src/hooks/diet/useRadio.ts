import { useState } from 'react';

const useRadio = <T>(values: T[], initialIndex: number = 0) => {
  const [selectedValue, setSelectedValue] = useState<T>(values[initialIndex]);

  const handleChange = (value: T) => {
    setSelectedValue(value);
  };

  return { selectedValue, handleChange };
};

export default useRadio;

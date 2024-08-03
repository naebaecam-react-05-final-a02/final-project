import { Options } from 'next/dist/server/base-server';
import React, { ReactNode } from 'react';
type AnyObject = Record<string, any>;
interface dropDownOption<T extends AnyObject = AnyObject> {
  value: string;
  icon?: ReactNode;
  onClick?: () => void;
  originalData: T;
}
interface dropDownOptionsParams<T extends AnyObject = AnyObject> {
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  icon?: ReactNode | ((item: T) => ReactNode);
  handleClick: (item: T) => void;
}
const dropDownOptions = <T extends AnyObject = AnyObject>({
  options,
  valueKey,
  labelKey,
  icon,
  handleClick,
}: dropDownOptionsParams<T>): dropDownOption<T>[] => {
  return options.map((option) => ({
    value: String(option[labelKey] || option[valueKey] || ''),
    ...(icon && { icon: typeof icon === 'function' ? icon(option) : icon }),
    ...(handleClick && {
      onClick: () => {
        handleClick(option);
      },
    }),
    originalData: option,
  }));
};

export default dropDownOptions;

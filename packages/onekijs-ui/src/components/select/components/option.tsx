import React, { FC } from 'react';
import { SelectOptionProps } from '../typings';

const SelectOptionComponent: FC<SelectOptionProps<any>> = ({ adapter, option }) => {
  if (adapter) {
    option = adapter(option);
  }
  return <div className="o-select-option">{option.text}</div>;
};

export default SelectOptionComponent;

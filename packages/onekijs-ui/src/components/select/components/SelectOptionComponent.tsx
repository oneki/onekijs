import React, { FC } from 'react';
import { SelectOptionProps } from '../typings';

const SelectOptionComponent: FC<SelectOptionProps<any>> = ({ text }) => {
  return <div className="o-select-option">{text}</div>;
};

export default SelectOptionComponent;

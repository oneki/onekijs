import React, { FC, useState } from 'react';
import SelectInputComponent from './components/input';
import { SelectProps } from './typings';
import Dropdown from '../dropdown';

const SelectComponent: FC<SelectProps<any>> = ({ className, placeholder, InputComponent = SelectInputComponent }) => {
  const [open, setOpen] = useState(false);
  const [refElement, setRefElement] = useState<HTMLElement|null>(null);
  return (
    <div className={className} ref={setRefElement}>
      <InputComponent placeholder={placeholder} onIconClick={() => setOpen(!open)} open={open} />
      <Dropdown refElement={refElement} open={open} />
    </div>
  );
};

export default SelectComponent;

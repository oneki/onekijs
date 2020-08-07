import React, { FC, useState } from 'react';
import Dropdown from '../../dropdown';
import SelectInputComponent from './SelectInputComponent';
import { SelectProps } from '../typings';
import SelectOptionsComponent from './SelectOptionsComponent';

const SelectComponent: FC<SelectProps<any>> = ({
  className,
  placeholder,
  data,
  InputComponent = SelectInputComponent,
}) => {
  const [open, setOpen] = useState(false);
  const [refElement, setRefElement] = useState<HTMLElement | null>(null);
  return (
    <div className={className} ref={setRefElement}>
      <InputComponent placeholder={placeholder} onIconClick={() => setOpen(!open)} open={open} />
      <Dropdown refElement={refElement} open={open}>
        <SelectOptionsComponent data={data} />
      </Dropdown>
    </div>
  );
};

export default SelectComponent;

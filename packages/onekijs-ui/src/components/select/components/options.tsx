import React, { FC } from 'react';
import { SelectOptionsProps } from '../typings';
import SelectOptionComponent from './option';

const SelectOptionsComponent: FC<SelectOptionsProps<any>> = ({
  options = [],
  adapter,
  OptionComponent = SelectOptionComponent,
}) => {
  return (
    <div className="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
      <div className="flex flex-col w-full">
        {options.map((option, index) => (
          <OptionComponent key={`option${index}`} index={index} search="" option={option} adapter={adapter} />
        ))}
      </div>
    </div>
  );
};

export default SelectOptionsComponent;

import React, { FC, useRef } from 'react';
import ListComponent from '../../list/components/ListComponent';
import { SelectOptionsProps } from '../typings';
import SelectOptionComponent from './SelectOptionComponent';

const SelectOptionsComponent: FC<SelectOptionsProps> = ({
  search,
  ItemComponent = SelectOptionComponent,
  ...listProps
}) => {
  const parentRef = useRef(null);
  
  return (
    <div ref={parentRef} style={{height:'100%', overflow:'auto'}}>
      <ListComponent parentRef={parentRef} className="o-select-options" ItemComponent={ItemComponent} height="100%" {...listProps} />
    </div>
  );
};

export default SelectOptionsComponent;

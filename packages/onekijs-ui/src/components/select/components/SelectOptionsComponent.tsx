import React, { FC } from 'react';
import ListComponent from '../../list/components/ListComponent';
import { SelectOptionsProps } from '../typings';
import SelectOptionComponent from './SelectOptionComponent';

const SelectOptionsComponent: FC<SelectOptionsProps> = ({
  search,
  ItemComponent = SelectOptionComponent,
  ...listProps
}) => {
  return <ListComponent className="o-select-options" ItemComponent={ItemComponent} height="100%" {...listProps} />;
};

export default SelectOptionsComponent;

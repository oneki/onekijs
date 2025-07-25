import { get } from 'onekijs-framework';
import React, { FC } from 'react';
import { TableBodyCellProps } from '../../typings';

const DefaultCellComponent: FC<TableBodyCellProps> = ({ item, column }) => {
  return <>{`${get(item, `data.${column.id}`, '')}`}</>;
};

export default DefaultCellComponent;

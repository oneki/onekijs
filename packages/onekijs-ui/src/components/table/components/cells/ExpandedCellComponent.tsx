import React, { FC } from 'react';
import TogglerIcon from '../../../icon/TogglerIcon';
import useTableService from '../../hooks/useTableService';
import { TableBodyCellProps } from '../../typings';

const ExpandedCellComponent: FC<TableBodyCellProps> = ({ item }) => {
  const service = useTableService();
  return <TogglerIcon open={item.expanded} onClick={() => service.toggle(item)} model="plus" color="primary" />;
};

export default ExpandedCellComponent;

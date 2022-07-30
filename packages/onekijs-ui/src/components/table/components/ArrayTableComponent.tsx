import React, { FC } from 'react';
import useTableController from '../hooks/useTableController';
import { ArrayTableProps } from '../typings';
import ControllerTableComponent from './ControllerTableComponent';

const ArrayTableComponent: FC<ArrayTableProps> = (props) => {
  const controller = useTableController(props.dataSource, props.columns, {
    adapter: props.adapter,
    fetchOnce: props.fetchOnce,
  });
  return <ControllerTableComponent {...props} controller={controller} />;
};

export default ArrayTableComponent;

import { FC } from 'react';
import { useLazyRef } from '@oneki/core';
import GridService from './GridService';
import { GridColumn, GridState, UseGridOptions } from './typings';
import useGridService from './useGridService';
import useGridState from './useGridState';
import wrapper from './wrapper';

const useGrid = <T = any>(
  dataSource: T[] | string,
  columns: GridColumn<T>[],
  options: UseGridOptions<T> = {},
): { Grid: FC; service: GridService<T, GridState<T>> } => {
  const gridState = useGridState(dataSource, columns, options);
  const [, service] = useGridService<T>(dataSource, GridService, gridState);

  const componentRef = useLazyRef<FC>(() => {
    return wrapper(service);
  });

  return {
    Grid: componentRef.current,
    service,
  };
};

export default useGrid;

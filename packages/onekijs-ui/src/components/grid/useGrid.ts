import { FC, useEffect } from 'react';
import { useLazyRef } from '@oneki/core';
import GridService from './GridService';
import { GridColumnSpec, GridState, UseGridOptions } from './typings';
import useGridService from './useGridService';
import useGridState from './useGridState';
import wrapper from './wrapper';
import { useRef } from 'react';

const useGrid = <T = any>(
  dataSource: T[] | string,
  columns: GridColumnSpec<T>[],
  options: UseGridOptions<T> = {},
): { Grid: FC; service: GridService<T, GridState<T>> } => {
  const gridState = useGridState(dataSource, columns, options);
  const [, service] = useGridService<T>(dataSource, GridService, gridState);

  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const componentRef = useLazyRef<FC>(() => {
    return wrapper(service, gridRef, contentRef);
  });

  useEffect(() => {
    service.onMount(gridRef, contentRef);
  });

  return {
    Grid: componentRef.current,
    service,
  };
};

export default useGrid;

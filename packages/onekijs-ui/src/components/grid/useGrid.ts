import { useLazyRef } from '@oneki/core';
import { FC, useEffect, useRef } from 'react';
import GridService from './GridService';
import { GridItemMeta, GridState, UseGridOptions } from './typings';
import useGridService from './useGridService';
import useGridState from './useGridState';
import wrapper from './wrapper';

const useGrid = <T = any, M extends GridItemMeta = GridItemMeta>(
  options: UseGridOptions<T, M>,
): { Grid: FC; service: GridService<T, M, GridState<T, M>> } => {
  const gridState = useGridState<T, M>(options);
  const [, service] = useGridService<T, M, GridState<T, M>, GridService<T, M, GridState<T, M>>>(
    options.dataSource,
    GridService,
    gridState,
  );

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

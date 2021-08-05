import { FC, useEffect, useRef } from 'react';
import { collectionProxyProps } from '../../../collection/useCollection';
import useLazyRef from '../../../core/useLazyRef';
import GridService from './GridService';
import { GridItemMeta, GridState, UseGridOptions } from './typings';
import useGridService from './useGridService';
import useGridState from './useGridState';
import wrapper from './wrapper';

export const gridCollectionProps = {
  pick: collectionProxyProps.pick.concat([
    'bodyClassName',
    'BodyComponent',
    'bodyWidth',
    'className',
    'fit',
    'fixHeader',
    'grow',
    'headerClassName',
    'HeaderComponent',
    'height',
    'rowClassName',
    'RowComponent',
  ]),
  mutables: ['columns'],
};

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

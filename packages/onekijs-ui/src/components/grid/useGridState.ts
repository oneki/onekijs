import { useCollectionState } from '@oneki/collection';
import { useLazyRef } from '@oneki/core';
import { GridColumnSpec, GridState, UseGridOptions } from './typings';

const useGridState = <T = any>(
  dataSource: T[] | string,
  columns: GridColumnSpec<T>[],
  options: UseGridOptions<T> = {},
): GridState<T> => {
  const collectionState = useCollectionState(dataSource, options);

  const stateRef = useLazyRef<GridState<T>>(() => {
    return Object.assign(
      {
        className: options.className,
        columns,
        bodyClassName: options.bodyClassName,
        BodyComponent: options.BodyComponent,
        fit: options.fit,
        fixHeader: options.fixHeader,
        grow: options.grow,
        HeaderComponent: options.HeaderComponent,
        height: options.height || '300px',
        rowClassName: options.rowClassName,
        RowComponent: options.RowComponent,
      },
      collectionState,
    );
  });
  return stateRef.current;
};

export default useGridState;

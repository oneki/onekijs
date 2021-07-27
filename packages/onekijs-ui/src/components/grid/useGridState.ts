import { useCollectionState } from '@oneki/collection';
import { useLazyRef } from '@oneki/core';
import { GridColumn, GridState, UseGridOptions } from './typings';

const useGridState = <T = any>(
  dataSource: T[] | string,
  columns: GridColumn<T>[],
  options: UseGridOptions<T> = {},
): GridState<T> => {
  const collectionState = useCollectionState(dataSource, options);

  const stateRef = useLazyRef<GridState<T>>(() => {
    return Object.assign(
      {
        columns,
        className: options.className,
      },
      collectionState,
    );
  });
  return stateRef.current;
};

export default useGridState;

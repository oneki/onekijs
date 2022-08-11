import { useCollectionInitialState, useLazyRef } from 'onekijs-framework';
import { TableColumn, TableItem, TableState, UseTableOptions } from '../typings';

const useTableInitialState = <T, I extends TableItem<T>>(
  dataSource: T[] | string | undefined,
  initialColumns: TableColumn<T, I>[] | undefined,
  options: UseTableOptions<T, I>,
): TableState<T, I> => {
  const collectionState = useCollectionInitialState(dataSource, options);

  const stateRef = useLazyRef<TableState<T, I>>(() => {
    return Object.assign(
      {
        columns: initialColumns || [],
      },
      collectionState,
    );
  });
  return stateRef.current;
};

export default useTableInitialState;

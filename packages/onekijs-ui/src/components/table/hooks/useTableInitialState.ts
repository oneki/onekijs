import { useCollectionInitialState, useLazyRef } from 'onekijs-framework';
import { TableItem, TableState, UseTableOptions } from '../typings';

const useTableInitialState = <T, I extends TableItem<T>>(options: UseTableOptions<T, I>): TableState<T, I> => {
  const collectionState = useCollectionInitialState(options.dataSource, options);

  const stateRef = useLazyRef<TableState<T, I>>(() => {
    return Object.assign(
      {
        columns: options.columns || [],
      },
      collectionState,
    );
  });
  return stateRef.current;
};

export default useTableInitialState;

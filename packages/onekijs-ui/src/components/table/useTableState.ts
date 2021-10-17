import { useCollectionState, useLazyRef } from 'onekijs-framework';
import { TableItemMeta, TableState, UseTableOptions } from './typings';

const useTableState = <T = any, M extends TableItemMeta = TableItemMeta>(
  options: UseTableOptions<T, M>,
): TableState<T, M> => {
  const collectionState = useCollectionState(options.dataSource, options);

  const stateRef = useLazyRef<TableState<T, M>>(() => {
    return Object.assign(
      {
        columns: options.columns,
        bodyClassName: options.bodyClassName,
        BodyComponent: options.BodyComponent,
        fit: options.fit,
        fixHeader: options.fixHeader,
        grow: options.grow,
        HeaderComponent: options.HeaderComponent,
        height: options.height || '500px',
        highlightRow: options.highlightRow,
        rowClassName: options.rowClassName,
        RowComponent: options.RowComponent,
        stripRows: options.stripRows,
      },
      collectionState,
    );
  });
  return stateRef.current;
};

export default useTableState;

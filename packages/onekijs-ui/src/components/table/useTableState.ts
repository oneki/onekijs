import { useCollectionState, useLazyRef } from 'onekijs-framework';
import { TableItem, TableState, UseTableOptions } from './typings';

const useTableState = <T, I extends TableItem<T>>(options: UseTableOptions<T, I>): TableState<T, I> => {
  let adapter = options.adapter;
  if (!adapter) {
    adapter = () => {
      return {} as I;
    };
  }
  delete options['adapter'];

  const collectionState = useCollectionState(options.dataSource, adapter, options);

  const stateRef = useLazyRef<TableState<T, I>>(() => {
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

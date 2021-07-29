import { useCollectionState } from '@oneki/collection';
import { useLazyRef } from '@oneki/core';
import GridBodyComponent from './components/GridBodyComponent';
import GridBodyRowComponent from './components/GridBodyRowComponent';
import { parseColumnWidth } from './GridService';
import { GridColumn, GridColumnSpec, GridState, UseGridOptions } from './typings';

const useGridState = <T = any>(
  dataSource: T[] | string,
  columns: GridColumnSpec<T>[],
  options: UseGridOptions<T> = {},
): GridState<T> => {
  const collectionState = useCollectionState(dataSource, options);

  const stateRef = useLazyRef<GridState<T>>(() => {
    const gridColumns: GridColumn<T>[] = columns.map((c) => Object.assign({}, c, { width: parseColumnWidth(c.width) }));
    return Object.assign(
      {
        className: options.className,
        columns: gridColumns,
        bodyClassName: options.bodyClassName,
        BodyComponent: options.BodyComponent || GridBodyComponent,
        HeaderComponent: options.HeaderComponent,
        height: options.height || '300px',
        rowClassName: options.rowClassName,
        RowComponent: options.RowComponent || GridBodyRowComponent,
      },
      collectionState,
    );
  });
  return stateRef.current;
};

export default useGridState;

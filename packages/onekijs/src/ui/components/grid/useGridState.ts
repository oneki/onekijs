import useCollectionState from '../../../collection/useCollectionState';
import useLazyRef from '../../../core/useLazyRef';
import { GridItemMeta, GridState, UseGridOptions } from './typings';

const useGridState = <T = any, M extends GridItemMeta = GridItemMeta>(
  options: UseGridOptions<T, M>,
): GridState<T, M> => {
  const collectionState = useCollectionState(options.dataSource, options);

  const stateRef = useLazyRef<GridState<T, M>>(() => {
    return Object.assign(
      {
        className: options.className,
        columns: options.columns,
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

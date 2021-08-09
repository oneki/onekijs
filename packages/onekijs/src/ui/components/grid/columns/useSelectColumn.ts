import DefaultCollectionBroker from '../../../../collection/CollectionBroker';
import { CollectionBroker, UseCollectionOptions } from '../../../../collection/typings';
import useLazyRef from '../../../../core/useLazyRef';
import { SelectProps } from '../../select/typings';
import { GridColumn, GridColumnSpec, GridItemMeta } from '../typings';
import SelectColumnCellComponent from './SelectColumnCell';

type SelectColumn<T = any, M extends GridItemMeta = GridItemMeta> = GridColumn<T, M> & {
  broker: CollectionBroker<T, M>;
};

export type UseSelectColumnOptions<T = any, M extends GridItemMeta = GridItemMeta> = Omit<
  GridColumnSpec<T, M>,
  'CellComponent'
> &
  Omit<SelectProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'items'> &
  UseCollectionOptions<T, M> & {
    dataSource: string | T[];
  };

const useSelectColumn = <T = any, M extends GridItemMeta = GridItemMeta>(
  options: UseSelectColumnOptions<T, M>,
): SelectColumn<T, M> => {
  const broker = useLazyRef<CollectionBroker<T, M>>(() => {
    return new DefaultCollectionBroker();
  });
  const optionsRef = useLazyRef<SelectColumn<T, M>>(() => {
    return Object.assign({}, options, {
      CellComponent: SelectColumnCellComponent(options, broker.current),
      broker: broker.current,
    });
  });
  return optionsRef.current;
};

export default useSelectColumn;

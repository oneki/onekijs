import { CollectionBroker, DefaultCollectionBroker, useLazyRef } from 'onekijs-framework';
import SelectCellComponent from '../components/SelectCellComponent';
import { GridItemMeta, SelectColumn, UseSelectColumnOptions } from '../typings';

const useSelectColumn = <T = any, M extends GridItemMeta = GridItemMeta>(
  options: UseSelectColumnOptions<T, M>,
): SelectColumn<T, M> => {
  const broker = useLazyRef<CollectionBroker<T, M>>(() => {
    return new DefaultCollectionBroker();
  });
  const optionsRef = useLazyRef<SelectColumn<T, M>>(() => {
    return Object.assign(
      {
        filterable: false,
        sortable: false,
      },
      options,
      {
        CellComponent: SelectCellComponent(options, broker.current),
        broker: broker.current,
      },
    );
  });
  return optionsRef.current;
};

export default useSelectColumn;

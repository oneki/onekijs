import { CollectionBroker, DefaultCollectionBroker, useLazyRef } from 'onekijs-framework';
import SelectCellComponent from '../components/cells/SelectCellComponent';
import { SelectColumn, TableItem, UseSelectColumnOptions } from '../typings';

const useSelectColumn = <T = any>(options: UseSelectColumnOptions<T, TableItem<T>>): SelectColumn<T, TableItem<T>> => {
  const broker = useLazyRef<CollectionBroker<T, TableItem<T>>>(() => {
    return new DefaultCollectionBroker();
  });
  const Component = options.CellComponent || SelectCellComponent;
  const optionsRef = useLazyRef<SelectColumn<T, TableItem<T>>>(() => {
    return Object.assign(
      {
        filterable: false,
        sortable: false,
      },
      options,
      {
        CellComponent: Component(options, broker.current),
        broker: broker.current,
      },
    );
  });
  return optionsRef.current;
};

export default useSelectColumn;

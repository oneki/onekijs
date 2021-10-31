import { CollectionBroker, DefaultCollectionBroker, useLazyRef } from 'onekijs-framework';
import SelectCellComponent from '../components/SelectCellComponent';
import { SelectColumn, UseSelectColumnOptions, TableItem } from '../typings';

const useSelectColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  options: UseSelectColumnOptions<T, I>,
): SelectColumn<T, I> => {
  const broker = useLazyRef<CollectionBroker<T, I>>(() => {
    return new DefaultCollectionBroker();
  });
  const optionsRef = useLazyRef<SelectColumn<T, I>>(() => {
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

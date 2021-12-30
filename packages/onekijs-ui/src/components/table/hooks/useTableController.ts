import { CollectionProxy, useCollectionProxy } from 'onekijs-framework';
import TableService from '../TableService';
import { TableItem, TableState, UseTableOptions } from '../typings';
import useTableInitialState from './useTableInitialState';

const useTableController = <T>(
  options: UseTableOptions<T, TableItem<T>> = {},
): CollectionProxy<
  T,
  TableItem<T>,
  TableState<T, TableItem<T>>,
  TableService<T, TableItem<T>, TableState<T, TableItem<T>>>
> => {
  const tableState = useTableInitialState<T, TableItem<T>>(options);

  return useCollectionProxy<
    T,
    TableItem<T>,
    TableState<T, TableItem<T>>,
    TableService<T, TableItem<T>, TableState<T, TableItem<T>>>
  >(options.dataSource, TableService, tableState);
};

export default useTableController;

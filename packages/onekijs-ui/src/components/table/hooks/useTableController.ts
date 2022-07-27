import { CollectionProxy, useCollectionProxy } from 'onekijs-framework';
import TableService from '../TableService';
import { TableColumn, TableItem, TableState, UseTableOptions } from '../typings';
import useTableInitialState from './useTableInitialState';

const useTableController = <T>(
  dataSource: T[] | string | undefined,
  initialColumns: TableColumn<T, TableItem<T>>[] | undefined,
  options: UseTableOptions<T, TableItem<T>> = {},
): CollectionProxy<
  T,
  TableItem<T>,
  TableState<T, TableItem<T>>,
  TableService<T, TableItem<T>, TableState<T, TableItem<T>>>
> => {
  const tableState = useTableInitialState<T, TableItem<T>>(dataSource, initialColumns, options);

  return useCollectionProxy<
    T,
    TableItem<T>,
    TableState<T, TableItem<T>>,
    TableService<T, TableItem<T>, TableState<T, TableItem<T>>>
  >(dataSource, TableService, tableState);
};

export default useTableController;

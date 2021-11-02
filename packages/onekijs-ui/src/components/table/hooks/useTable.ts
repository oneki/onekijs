import TableService from '../TableService';
import { TableController, TableItem, TableState, UseTableOptions } from '../typings';
import useTableService from './useTableService';
import useTableInitialState from './useTableInitialState';
import { defaultTableItemAdapter } from '../util';
import { useCollectionProxy } from 'onekijs-framework';

const useTable = <T>(options: UseTableOptions<T, TableItem<T>>): TableController<T, TableItem<T>> => {
  const adapter = options.adapter || defaultTableItemAdapter;
  delete options['adapter'];

  const tableState = useTableInitialState<T, TableItem<T>>(adapter, options);

  const [, service] = useTableService<
    T,
    TableItem<T>,
    TableState<T, TableItem<T>>,
    TableService<T, TableItem<T>, TableState<T, TableItem<T>>>
  >(options.dataSource, TableService, tableState);

  return useCollectionProxy<
    T,
    TableItem<T>,
    TableState<T, TableItem<T>>,
    TableController<T, TableItem<T>, TableState<T, TableItem<T>>>
  >(service);
};

export default useTable;

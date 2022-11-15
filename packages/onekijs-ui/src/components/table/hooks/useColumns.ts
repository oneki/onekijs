import { useRef } from 'react';
import { TableColumn, TableItem } from '../typings';

const useColumns = <T, I extends TableItem<T> = TableItem<T>>(columns: TableColumn<T, I>[]): TableColumn<T, I>[] => {
  const ref = useRef<TableColumn<T, I>[]>(columns);
  return ref.current;
};

export default useColumns;

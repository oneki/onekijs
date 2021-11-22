import React, { useContext } from 'react';
import { TableConfig, TableItem } from '../typings';

export const TableConfigContext = React.createContext<TableConfig<any, any>>(null!);
export const useTableConfig = <T = any, I extends TableItem<T> = TableItem<T>>(): TableConfig<T, I> => {
  return useContext(TableConfigContext);
};

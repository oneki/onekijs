import React, { useContext } from 'react';
import { TableItem, TableItemMeta } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableValueContext = React.createContext<(any | undefined)[] | undefined>(undefined);
const useTableValue = <
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
>(): (I | undefined)[] | undefined => {
  return useContext(TableValueContext);
};

export default useTableValue;

import React, { useContext } from 'react';
import { TableItem } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableValueContext = React.createContext<(TableItem<any> | undefined)[] | undefined>(undefined);
const useTableValue = <T>(): (TableItem<T> | undefined)[] | undefined => {
  return useContext(TableValueContext);
};

export default useTableValue;

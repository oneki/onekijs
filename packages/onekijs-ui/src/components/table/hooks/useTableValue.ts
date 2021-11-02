import React, { useContext } from 'react';
import { TableItem } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableValueContext = React.createContext<(any | undefined)[] | undefined>(undefined);
const useTableValue = <T = any, I extends TableItem<T> = TableItem<T>>(): (I | undefined)[] | undefined => {
  return useContext(TableValueContext);
};

export default useTableValue;

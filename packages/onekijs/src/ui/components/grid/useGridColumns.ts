import React, { useContext } from 'react';
import { GridColumn } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const GridColumnsContext = React.createContext<GridColumn<any>[]>([]);
const useGridColumns = <T>(): GridColumn<T>[] => {
  return useContext(GridColumnsContext);
};

export default useGridColumns;

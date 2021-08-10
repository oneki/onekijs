import React, { useContext } from 'react';
import { GridItem } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const GridValueContext = React.createContext<(GridItem<any> | undefined)[] | undefined>(undefined);
const useGridValue = <T>(): (GridItem<T> | undefined)[] | undefined => {
  return useContext(GridValueContext);
};

export default useGridValue;

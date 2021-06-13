import React, { useContext } from 'react';
import { GridContext } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultGridContext = React.createContext<GridContext<any>>(null!);
const useGridContext = <T=any>(): GridContext<T> => {
  return useContext(DefaultGridContext);
};


export default useGridContext;

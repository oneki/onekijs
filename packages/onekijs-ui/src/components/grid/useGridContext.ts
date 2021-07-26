import React, { useContext } from 'react';
import { GridContext } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultGridContext = React.createContext<GridContext>(null!);
const useGridContext = (): GridContext => {
  return useContext(DefaultGridContext);
};


export default useGridContext;

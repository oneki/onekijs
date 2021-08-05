import React, { useContext } from 'react';
import GridService from './GridService';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const GridContext = React.createContext<GridService>(null!);
const useGridContext = (): GridService => {
  return useContext(GridContext);
};

export default useGridContext;

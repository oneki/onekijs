import React, { useContext } from 'react';
import { GridController, GridItemMeta } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const GridContext = React.createContext<GridController>(null!);
const useGridController = <T = any, M extends GridItemMeta = GridItemMeta>(): GridController<T, M> => {
  return useContext(GridContext) as GridController<T, M>;
};

export default useGridController;

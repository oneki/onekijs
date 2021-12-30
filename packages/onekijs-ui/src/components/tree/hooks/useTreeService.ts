import React, { useContext } from 'react';
import { TreeController, TreeItem } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TreeServiceContext = React.createContext<TreeController<any, any>>(null!);
const useTreeService = <T = any, I extends TreeItem<T> = TreeItem<T>>(): TreeController<T, I> => {
  return useContext(TreeServiceContext);
};

export default useTreeService;

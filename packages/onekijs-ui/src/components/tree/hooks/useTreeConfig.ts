import React, { useContext } from 'react';
import { TreeConfig, TreeItem } from '../typings';

export const TreeConfigContext = React.createContext<TreeConfig<any, any>>(null!);
export const useTreeConfig = <T = any, I extends TreeItem<T> = TreeItem<T>>(): TreeConfig<T, I> => {
  return useContext(TreeConfigContext);
};

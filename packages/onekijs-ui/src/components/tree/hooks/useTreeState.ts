import React, { useContext } from 'react';
import { TreeItem, TreeState } from '../typings';

export const TreeStateContext = React.createContext<TreeState<any, any>>(null!);
export const useTreeState = <T = any, I extends TreeItem<T> = TreeItem<T>>(): TreeState<T, I> => {
  return useContext(TreeStateContext);
};

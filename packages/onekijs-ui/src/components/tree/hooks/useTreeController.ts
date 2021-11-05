import React, { useContext } from 'react';
import { TreeController, TreeItem } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TreeImmutableControllerContext = React.createContext<TreeController<any, any>>(null!);
export const useTreeController = <T = any, I extends TreeItem<T> = TreeItem<T>>(): TreeController<T, I> => {
  return useContext(TreeImmutableControllerContext);
};

export const TreeMutableControllerContext = React.createContext<TreeController<any, any>>(null!);

export const useMutableTreeController = <T = any, I extends TreeItem<T> = TreeItem<T>>(): TreeController<T, I> => {
  return useContext(TreeMutableControllerContext);
};

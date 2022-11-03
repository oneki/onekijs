import React, { useContext } from 'react';
import { TreeItem, TreeItemContext } from '../typings';

export const DefaultTreeItemContext = React.createContext<TreeItemContext<any, any>>(null!);
export const useTreeItemContext = <T = any, I extends TreeItem<T> = TreeItem<T>>(): TreeItemContext<T, I> => {
  return useContext(DefaultTreeItemContext);
};

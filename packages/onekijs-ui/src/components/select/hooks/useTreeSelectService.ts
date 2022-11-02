import React, { useContext } from 'react';
import { TreeSelectController, TreeSelectItem } from '../typings';

export const TreeSelectServiceContext = React.createContext<TreeSelectController<any, any>>(null!);
export const useTreeSelectService = <T = any, I extends TreeSelectItem<T> = TreeSelectItem<T>>(): TreeSelectController<
  T,
  I
> => {
  return useContext(TreeSelectServiceContext);
};

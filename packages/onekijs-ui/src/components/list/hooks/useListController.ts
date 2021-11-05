import React, { useContext } from 'react';
import { ListController, ListItem, ListState } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ListImmutableControllerContext = React.createContext<unknown>(null!);
export const useListController = <
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>
>(): ListController<T, I, S> => {
  return useContext(ListImmutableControllerContext) as ListController<T, I, S>;
};

export const ListMutableControllerContext = React.createContext<unknown>(null!);
export const useMutableListController = <
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>
>(): ListController<T, I, S> => {
  return useContext(ListImmutableControllerContext) as ListController<T, I, S>;
};

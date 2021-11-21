import React, { useContext } from 'react';
import { ListCollection, ListItem, ListState } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ListCollectionContext = React.createContext<unknown>(null!);
const useListCollection = <
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>
>(): ListCollection<T, I, S> => {
  return useContext(ListCollectionContext) as ListCollection<T, I, S>;
};

export default useListCollection;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ListItemsContext = React.createContext<unknown>(null!);
export const useListItems = <T = any, I extends ListItem<T> = ListItem<T>>(): (I | undefined)[] => {
  return useContext(ListItemsContext) as (I | undefined)[];
};

import React, { useContext } from 'react';
import { ListCollection, ListItem, ListState } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ListServiceContext = React.createContext<unknown>(null!);

const useListService = <
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>
>(): ListCollection<T, I, S> => {
  return useContext(ListServiceContext) as ListCollection<T, I, S>;
};

export default useListService;

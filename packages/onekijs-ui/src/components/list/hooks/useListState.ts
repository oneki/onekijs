import React, { useContext } from 'react';
import { ListItem, ListState } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ListStateContext = React.createContext<unknown>(null!);
const useListState = <T = any, I extends ListItem<T> = ListItem<T>>(): ListState<T, I> => {
  return useContext(ListStateContext) as ListState<T, I>;
};

export default useListState;

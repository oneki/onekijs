import React, { useContext } from 'react';
import { ListItem } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ListItemsContext = React.createContext<unknown>(null!);
const useListItems = <T = any, I extends ListItem<T> = ListItem<T>>(): (I | undefined)[] => {
  return useContext(ListItemsContext) as (I | undefined)[];
};

export default useListItems;

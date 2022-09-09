import React, { useContext } from 'react';
import { SelectController, SelectItem } from '../typings';

export const SelectServiceContext = React.createContext<SelectController<any, any>>(null!);
export const useSelectService = <T = any, I extends SelectItem<T> = SelectItem<T>>(): SelectController<T, I> => {
  return useContext(SelectServiceContext);
};

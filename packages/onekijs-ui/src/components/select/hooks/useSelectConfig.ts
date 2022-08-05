import React, { useContext } from 'react';
import { SelectConfig, SelectItem } from '../typings';

export const SelectConfigContext = React.createContext<SelectConfig<any, any>>(null!);
export const useSelectConfig = <T = any, I extends SelectItem<T> = SelectItem<T>>(): SelectConfig<T, I> => {
  return useContext(SelectConfigContext);
};

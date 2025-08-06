import React, { useContext } from 'react';
import { DatePickerContext } from '../typings';

export const DefaultDatePickerContext = React.createContext<DatePickerContext>(null!);

export const useDatePickerContext = (): DatePickerContext => {
  return useContext(DefaultDatePickerContext);
};

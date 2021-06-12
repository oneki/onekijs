import React, { useContext } from 'react';
import { FormContext } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultFormContext = React.createContext<FormContext>(null!);
const useFormContext = (): FormContext => {
  return useContext(DefaultFormContext);
};

export default useFormContext;

import React, { useContext } from 'react';
import { FormGridContext } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultFormGridContext = React.createContext<FormGridContext>(null!);
const useFormGridContext = (): FormGridContext => {
  return useContext(DefaultFormGridContext);
};

export default useFormGridContext;

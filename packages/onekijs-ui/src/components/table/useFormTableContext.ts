import React, { useContext } from 'react';
import { FormTableContext } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultFormTableContext = React.createContext<FormTableContext>(null!);
const useFormTableContext = (): FormTableContext => {
  return useContext(DefaultFormTableContext);
};

export default useFormTableContext;

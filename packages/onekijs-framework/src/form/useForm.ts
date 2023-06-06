import React, { useContext } from 'react';
import FormService from './FormService';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const FormContext = React.createContext<FormService<any>>(null!);
const useForm = <T extends object = any>(): FormService<T> => {
  return useContext(FormContext) as FormService<T>;
};

export default useForm;

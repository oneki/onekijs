import React, { useContext } from 'react';
import FormService from './FormService';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const FormContext = React.createContext<FormService>(null!);
const useForm = (): FormService => {
  return useContext(FormContext);
};

export default useForm;

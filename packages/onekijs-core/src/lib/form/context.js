import React, { useContext } from 'react';

export const FormContext = React.createContext();
export const useFormContext = () => {
  return useContext(FormContext);
};

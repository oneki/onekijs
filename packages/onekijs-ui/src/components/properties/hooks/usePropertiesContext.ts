import React, { useContext } from 'react';
import { PropertiesContext } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultPropertiesContext = React.createContext<PropertiesContext>({});
const usePropertiesContext = (): PropertiesContext => {
  return useContext(DefaultPropertiesContext);
};

export default usePropertiesContext;

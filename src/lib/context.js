import React, { useContext } from 'react'
import { get } from './utils/object';

export const AppContext = React.createContext();

export const useRouter = () => {
  return useContext(AppContext).router;
}

export const useSetting = (selector, defaultValue) => {
  const settings = useContext(AppContext).settings;
  if (selector) {
    return get(settings, selector, defaultValue);
  }
  return settings;
}

export const useSettings = () => {
  return useContext(AppContext).settings;
}
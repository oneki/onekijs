import React, { useContext, useMemo } from "react";
import { get } from "./utils/object";

export const AppContext = React.createContext();

// never change the state => no refresh
export const useRouter = () => {
  return useContext(AppContext).router;
};

// change the state every time it changes
export const useHistory = () => {
  const history = useContext(AppContext).router.history;
  return useMemo(() => {
    return history;
  }, [history]);
}

// change the state every time it changes
export const useLocation = () => {
  const location = useContext(AppContext).router.location;
  return useMemo(() => {
    return location;
  }, [location]);  
}

export const useSetting = (selector, defaultValue) => {
  const settings = useContext(AppContext).settings;
  if (selector) {
    return get(settings, selector, defaultValue);
  }
  return settings;
};

export const useSettings = () => {
  return useContext(AppContext).settings;
};

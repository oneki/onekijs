import React, { useCallback, useContext, useEffect, useState } from 'react';
import { get } from './utils/object';

export const AppContext = React.createContext();
export const I18nContext = React.createContext();

// never change the state => no refresh
export const useOnekiRouter = () => {
  return useContext(AppContext).router;
};

// change the state every time it changes
export const useHistory = () => {
  const router = useContext(AppContext).router;
  const [history, setHistory] = useState(router.history);
  const listener = useCallback(() => {
    setHistory(router.history);
  }, [setHistory, router.history]);

  useEffect(() => {
    router.listen(listener);
    return () => {
      router.unlisten(listener);
    };
  }, [router, listener]);

  return history;
};

// change the state every time it changes
export const useLocation = () => {
  const router = useContext(AppContext).router;
  const [location, setLocation] = useState(router.location);
  const listener = useCallback(
    location => {
      setLocation(location);
    },
    [setLocation]
  );

  useEffect(() => {
    router.listen(listener);
    return () => {
      router.unlisten(listener);
    };
  }, [router, listener]);

  return location;
};

// change the state every time it changes
export const useParams = () => {
  const router = useContext(AppContext).router;
  const [params, setParams] = useState(get(router, 'location.params', {}));
  const listener = useCallback(
    location => {
      setParams(location.params);
    },
    [setParams]
  );

  useEffect(() => {
    router.listen(listener);
    return () => {
      router.unlisten(listener);
    };
  }, [router, listener]);
  return params;
};

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

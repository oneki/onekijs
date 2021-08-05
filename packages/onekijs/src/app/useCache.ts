import { useCallback, useEffect } from 'react';
import useLazyRef from '../core/useLazyRef';
import CacheEntryService, { cacheKey } from './CacheEntryService';
import { CacheOptions } from './typings';
import useGlobalProp from './useGlobalProp';
import useGlobalService from './useGlobalService';

const useCache = <T = any>(
  url?: string | null,
  options: CacheOptions<T> = {},
): [T | undefined, boolean, () => void] => {
  const optionsRef = useLazyRef<CacheOptions<T>>(() => {
    return options;
  });

  const service = useGlobalService(CacheEntryService);

  const refresh = useCallback(() => {
    if (url) {
      service.fetch(url, optionsRef.current as CacheOptions<T>, true);
    }
  }, [url, service, optionsRef]);

  useEffect(() => {
    if (url) {
      service.fetch(url, optionsRef.current as CacheOptions<T>, false);
    }
  }, [url, optionsRef, service]);

  const result = useGlobalProp(cacheKey(url || '__NOT_DEFINED'), {
    loading: false,
    fetching: false,
    payload: options.defaultValue,
    ttl: options.ttl || 3600,
  });
  return [result.payload, result.loading || false, refresh];
};

export default useCache;

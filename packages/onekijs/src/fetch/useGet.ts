import { useCallback, useEffect, useRef } from 'react';
import useLocalService from '../core/useLocalService';
import CrudService from './CrudService';
import { CrudState, GetOptions } from './typings';

const useGet = <T = any>(url: string, options: GetOptions<T> = {}): [T, boolean, () => void] => {
  const optionsRef = useRef<GetOptions<T>>(options);
  optionsRef.current = options;

  // const CrudClass = useLazyRef<Class<CrudService>>(() => {
  //   let ctor = class extends CrudService {
  //     delayFetch = every(function* (
  //       url: string,
  //       method: string,
  //       body: IObject | null = null,
  //       options: IObject = {}
  //     ) {
  //       // @ts-ignore
  //       return yield this.fetch(url, method, body, options);
  //     });
  //   };
  //   if (options.throttle) {
  //     ctor = class extends CrudService {
  //       delayFetch = throttle(options.throttle, function* (
  //         url: string,
  //         method: string,
  //         body: IObject | null = null,
  //         options: IObject = {}
  //       ) {
  //         // @ts-ignore
  //         return yield this.fetch(url, method, body, options);
  //       });
  //     };
  //   } else if (options.debounce) {
  //     ctor = class extends CrudService {
  //       delayFetch = debounce(options.throttle, function* (
  //         url: string,
  //         method: string,
  //         body: IObject | null = null,
  //         options: IObject = {}
  //       ) {
  //         // @ts-ignore
  //         return yield this.fetch(url, method, body, options);
  //       });
  //     };
  //   }
  //   return ctor;
  // });

  const [state, service] = useLocalService(CrudService, {
    loading: false,
    result: optionsRef.current.defaultValue,
  } as CrudState);

  const refresh = useCallback(() => {
    if (url) {
      service.fetch(url, 'GET', null, optionsRef.current);
    }
  }, [url, service]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  return [state.result, state.loading || false, refresh];
};

export default useGet;

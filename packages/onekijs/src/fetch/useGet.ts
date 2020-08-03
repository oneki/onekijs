import { useCallback, useEffect } from 'react';
import FetchService from './FetchService';
import { FetchState, GetOptions } from './typings';
import useNotificationService from '../notification/useNotificationService';
import useLazyRef from '../core/useLazyRef';
import useService from '../core/useService';

const useGet = <T = any>(url: string, options: GetOptions<T> = {}): [T, boolean, () => void] => {
  const notificationService = useNotificationService();
  const optionsRef = useLazyRef<GetOptions<T>>(() => {
    if (!options.onError) {
      options.onError = (e) => {
        notificationService.error(e);
      };
    }
    return options;
  });

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

  const [state, service] = useService(FetchService, {
    loading: false,
    result: optionsRef.current.defaultValue,
  } as FetchState);

  const refresh = useCallback(() => {
    if (url) {
      service.get(url, optionsRef.current);
    }
  }, [url, service, optionsRef]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  return [state.result, state.loading || false, refresh];
};

export default useGet;

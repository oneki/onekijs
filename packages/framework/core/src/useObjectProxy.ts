import { AnonymousObject, Service } from '@oneki/types';
import { isFunction } from '@oneki/utils';
import { useMemo } from 'react';
import useLazyRef from './useLazyRef';

type useObjectProxyOptions = {
  mutables?: string[];
  pick?: string[];
  omit?: string[];
};

const getObjectProps = (object: AnonymousObject): string[] => {
  const props = [];
  let obj = object;
  do {
    props.push(...Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)));

  return props;
};

const useObjectProxy = <R>(object: AnonymousObject | Service, options: useObjectProxyOptions): R => {
  const mutableKeys = options.mutables || [];
  const pickKeys = options.pick || [];
  const omitKeys = options.omit || [];
  const immutables = useLazyRef(() => {
    let keys = pickKeys.length > 0 ? pickKeys : getObjectProps(object);
    keys = keys.filter((k) => !(mutableKeys.includes(k) || omitKeys.includes(k)));

    return keys.reduce((accumulator, prop) => {
      if (isFunction(object[prop])) {
        accumulator[prop] = object[prop].bind(object);
      } else {
        accumulator[prop] = object[prop];
      }
      return accumulator;
    }, {} as AnonymousObject);
  });

  const mutables = mutableKeys.map((k) => object[k]);

  const proxy = (useMemo(() => {
    const mutables = mutableKeys.reduce((accumulator, prop) => {
      if (isFunction(object[prop])) {
        accumulator[prop] = object[prop].bind(object);
      } else {
        accumulator[prop] = object[prop];
      }
      return accumulator;
    }, {} as AnonymousObject);
    return Object.assign({}, immutables.current, mutables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, mutables) as unknown) as R;

  return proxy;
};

export default useObjectProxy;

import { useMemo } from 'react';
import { AnonymousObject } from '../types/object';
import { get } from '../utils/object';
import { isFunction } from '../utils/type';
import Service from './Service';
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
      if (isFunction(get(object, prop))) {
        accumulator[prop] = get(object, prop).bind(object);
      } else {
        accumulator[prop] = get(object, prop);
      }
      return accumulator;
    }, {} as AnonymousObject);
  });

  const mutables = mutableKeys.map((k) => get(object, k));

  const proxy = useMemo(() => {
    const mutables = mutableKeys.reduce((accumulator, prop) => {
      if (isFunction(get(object, prop))) {
        accumulator[prop] = get(object, prop).bind(object);
      } else {
        accumulator[prop] = get(object, prop);
      }
      return accumulator;
    }, {} as AnonymousObject);
    return Object.assign({}, immutables.current, mutables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, mutables) as unknown as R;

  return proxy;
};

export default useObjectProxy;

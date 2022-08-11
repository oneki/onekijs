import { useMemo } from 'react';
import useCollectionService from './useCollectionService';
import { Class } from '../types/object';
import { Collection, CollectionProxy, CollectionState, Item } from './typings';
import CollectionService from './CollectionService';
import { isCollection } from './utils';

export const collectionProxyHandler = {
  get: function <T, I extends Item<T>, S extends CollectionState<T, I>, C extends Collection<T, I, S>>(
    target: C,
    prop: string | number | symbol,
    receiver?: C,
  ): any {
    if (prop === 'asService') {
      return () => target;
    } else {
      return Reflect.get(target, prop, receiver);
    }
  },
};

const useCollectionProxy = <
  T,
  I extends Item<T> = Item<T>,
  S extends CollectionState<T, I> = CollectionState<T, I>,
  C extends CollectionService<T, I, S> = CollectionService<T, I, S>
>(
  dataSource:
    | T[]
    | string
    | CollectionProxy<T, I, CollectionState<T, I>, Collection<T, I, CollectionState<T, I>>>
    | undefined,
  ctor: Class<C>,
  initialState: S,
): CollectionProxy<T, I, S, C> => {
  const [, service] = useCollectionService<T, I, S, C>(ctor, initialState);

  return useMemo(() => {
    if (isCollection(dataSource)) {
      return dataSource as CollectionProxy<T, I, S, C>;
    }
    const proxy = new Proxy(service, collectionProxyHandler);
    return proxy as CollectionProxy<T, I, S, C>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource, service.state]);
};

export default useCollectionProxy;

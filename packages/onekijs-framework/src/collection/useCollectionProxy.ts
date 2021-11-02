import { useMemo } from 'react';
import { CollectionState, Item } from '..';
import { Collection, CollectionProxy } from './typings';

const handler = {
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

const useCollectionProxy = <T, I extends Item<T>, S extends CollectionState<T, I>, C extends Collection<T, I, S>>(
  collection: C,
): CollectionProxy<T, I, S, C> => {
  return useMemo(() => {
    const proxy = new Proxy(collection, handler);
    return proxy as CollectionProxy<T, I, S, C>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.state]);
};

export default useCollectionProxy;

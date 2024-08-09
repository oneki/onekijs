import { useEffect } from 'react';
import useService from '../core/useService';
import { Class } from '../types/object';
import CollectionService from './CollectionService';
import { CollectionState, Item } from './typings';
import { isCollection } from './utils';

const useCollectionService = <
  T,
  I extends Item<T> = Item<T>,
  S extends CollectionState<T, I> = CollectionState<T, I>,
  C extends CollectionService<T, I, S> = CollectionService<T, I, S>,
>(
  ctor: Class<C>,
  initialState: S,
): [S, C] => {
  const [state, service] = useService<S, C>(ctor, initialState);

  // useEffect(() => {
  //   if (initialState.fetchOnce) {
  //     service._fetchOnce();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (!isCollection(initialState.dataSource) && initialState.autoload && !initialState.local) {
      service.initialLoad();
    }
    return () => {
      service.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, service];
};

export default useCollectionService;

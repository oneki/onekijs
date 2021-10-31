import { useEffect } from 'react';
import useService from '../core/useService';
import { asyncHttp } from '../core/xhr';
import { Fetcher, HttpMethod } from '../types/fetch';
import { Class } from '../types/object';
import CollectionService from './CollectionService';
import { Collection, CollectionFetcherResult, CollectionState, Item, LoadingStatus, Query } from './typings';
import { isCollection } from './utils';

const useCollectionService = <
  T,
  I extends Item<T> = Item<T>,
  S extends CollectionState<T, I> = CollectionState<T, I>,
  C extends CollectionService<T, I, S> = CollectionService<T, I, S>
>(
  dataSource: T[] | string | Collection<T, I> | undefined,
  ctor: Class<C>,
  initialState: S,
): [S, C] => {
  const [state, service] = useService<S, C>(ctor, initialState);

  useEffect(() => {
    if (typeof dataSource === 'string' && initialState.fetchOnce) {
      const fetcher: Fetcher<CollectionFetcherResult<T>, Query | undefined> =
        initialState.fetchOptions?.fetcher || asyncHttp;
      service.setStatus(LoadingStatus.Loading);
      fetcher(dataSource, initialState.method || HttpMethod.Get, undefined, state.fetchOptions).then((result) => {
        service.setStatus(LoadingStatus.Loaded);
        if (Array.isArray(result)) {
          service.setData(result);
        } else {
          service.setData(result.result);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isCollection(dataSource) && initialState.autoload && !initialState.local) {
      service.load(initialState.limit, initialState.offset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, service];
};

export default useCollectionService;

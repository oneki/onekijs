import LocalQueryService from './LocalQueryService';
import { LocalQueryState, UseCollectionOptions } from './typings';
import { useService } from 'onekijs';

const useCollection = <T>(
  initialData: T[],
  options: UseCollectionOptions = {},
): LocalQueryService<T, LocalQueryState<T>> => {
  const initialState = {
    data: initialData,
    filter: options.initialFilter,
    sort: options.initialSort,
  } as LocalQueryState<T>;

  const [, service] = useService<LocalQueryState<T>, LocalQueryService<T, LocalQueryState<T>>>(
    LocalQueryService,
    initialState,
  );

  return service;
};

export default useCollection;

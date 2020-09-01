import { ItemMeta, UseCollectionOptions, Collection } from './typings';
import useCollection from './useCollection';

const useList = <T = any>(
  dataOrUrl: T[] | string,
  options: UseCollectionOptions<T, ItemMeta> = {},
): Collection<T, ItemMeta> => {
  return useCollection<T, ItemMeta>(dataOrUrl, options);
};

export default useList;

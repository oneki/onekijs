import { ItemMeta, UseCollectionOptions, Collection, List } from './typings';
import useCollection from './useCollection';

const useList = <T = any>(
  dataSource: T[] | string | List<T>,
  options: UseCollectionOptions<T, ItemMeta> = {},
): Collection<T, ItemMeta> => {
  return useCollection<T, ItemMeta>(dataSource, options);
};

export default useList;

import { ItemMeta, Item, Collection, useCollection } from 'onekijs-framework';
import { UseListOptions } from '../typings';

const useList = <T = any>(
  dataSource: T[] | string | Collection<T, ItemMeta, Item<T, ItemMeta>>,
  options: UseListOptions<T, ItemMeta, Item<T, ItemMeta>> = {},
): Collection<T, ItemMeta, Item<T, ItemMeta>> => {
  let adapter = options.adapter;
  if (!adapter) {
    adapter = () => {
      return {};
    };
  }
  delete options['adapter'];

  return useCollection<T, ItemMeta, Item<T, ItemMeta>>(dataSource, adapter, options);
};

export default useList;

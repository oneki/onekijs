import { Item, Collection, useCollection } from 'onekijs-framework';
import { ListCollection, UseListOptions } from '../typings';

const useList = <T = any>(
  dataSource: T[] | string | Collection<T, Item<T>>,
  options: UseListOptions<T, Item<T>> = {},
): ListCollection<T, Item<T>> => {
  let adapter = options.adapter;
  if (!adapter) {
    adapter = () => {
      return {};
    };
  }
  delete options['adapter'];

  return useCollection<T, Item<T>>(dataSource, adapter, options);
};

export default useList;

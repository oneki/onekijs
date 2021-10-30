import { Collection, useCollection } from 'onekijs-framework';
import { UseListOptions } from '../../list/typings';
import { SelectItem, SelectOptionMeta } from '../typings';

const useSelect = <T = any>(
  dataSource: T[] | string | Collection<T, SelectOptionMeta, SelectItem<T, SelectOptionMeta>>,
  options: UseListOptions<T, SelectOptionMeta, SelectItem<T, SelectOptionMeta>> = {},
): Collection<T, SelectOptionMeta, SelectItem<T, SelectOptionMeta>> => {
  let adapter = options.adapter;
  if (!adapter) {
    adapter = () => {
      return {};
    };
  }
  delete options['adapter'];

  return useCollection<T, SelectOptionMeta, SelectItem<T, SelectOptionMeta>>(dataSource, adapter, options);
};

export default useSelect;

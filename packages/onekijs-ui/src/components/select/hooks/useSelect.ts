import { Collection, useCollection } from 'onekijs-framework';
import { UseListOptions } from '../../list/typings';
import { SelectItem } from '../typings';

const useSelect = <T = any>(
  dataSource: T[] | string | Collection<T, SelectItem<T>>,
  options: UseListOptions<T, SelectItem<T>> = {},
): Collection<T, SelectItem<T>> => {
  let adapter = options.adapter;
  if (!adapter) {
    adapter = () => {
      return {};
    };
  }
  delete options['adapter'];

  return useCollection<T, SelectItem<T>>(dataSource, adapter, options);
};

export default useSelect;

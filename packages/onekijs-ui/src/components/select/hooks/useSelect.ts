import { useCollection, defaultItemAdapter } from 'onekijs-framework';
import { UseListOptions } from '../../list/typings';
import { SelectCollection, SelectItem } from '../typings';

const useSelect = <T = any>(
  dataSource: T[] | string | SelectCollection<T, SelectItem<T>>,
  options: UseListOptions<T, SelectItem<T>> = {},
): SelectCollection<T, SelectItem<T>> => {
  const adapter = options.adapter || defaultItemAdapter;
  delete options['adapter'];

  return useCollection<T, SelectItem<T>>(dataSource, adapter, options);
};

export default useSelect;

import { CollectionProxy, useCollectionInitialState, useCollectionProxy } from 'onekijs-framework';
import { UseListOptions } from '../../list/typings';
import SelectService from '../SelectService';
import { SelectItem, SelectItemAdapter, SelectState } from '../typings';

const useSelectController = <T = any, I extends SelectItem<T> = SelectItem<T>>(
  dataSource: T[] | [T, string][] | string | undefined,
  options: UseListOptions<T, I> = {},
): CollectionProxy<T, I, SelectState<T, I>, SelectService<T, I, SelectState<T, I>>> => {
  let ds = dataSource;
  if (Array.isArray(dataSource) && Array.isArray(dataSource[0])) {
    ds = (dataSource as [T, string][]).map((entry) => entry[0]);
    const optionsAdapter = options.adapter;
    const adapter: SelectItemAdapter<T> = (data: T) => {
      const item = optionsAdapter ? optionsAdapter(data) : {};
      if (!item.text) {
        const entry = (dataSource as [T, string][]).find((entry) => entry[0] === data);
        item.text = entry ? entry[1] : '';
      }
      return item;
    };
    options = Object.assign({}, options, { adapter });
  }
  const initialState = useCollectionInitialState<T, I>(
    ds as T[] | string | undefined,
    Object.assign({ initialLimit: 20 }, options),
  );
  const collection = useCollectionProxy<T, I, SelectState<T, I>, SelectService<T, I, SelectState<T, I>>>(
    ds as T[] | string | undefined,
    SelectService,
    initialState,
  );

  return collection;
};

export default useSelectController;

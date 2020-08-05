import { isLoading } from '../../utils/query';
import { ListItemAdapter, ListItem } from './typings';

export const adapt = <T>(item: T | symbol | undefined, adapter?: ListItemAdapter<T>): ListItem<T> => {
  if (isLoading(item)) {
    return {
      loading: true,
    };
  }
  if (item === undefined) {
    return {
      loading: false,
    };
  }
  let adaptee;
  if (adapter) {
    adaptee = adapter(item);
  } else if (['string', 'number', 'boolean'].includes(typeof item)) {
    adaptee = {
      id: item,
      text: String(item),
    };
  } else {
    adaptee = {
      id: (item as any).id,
      text: (item as any).text,
    };
  }
  return Object.assign({ loading: false, item }, adaptee);
};

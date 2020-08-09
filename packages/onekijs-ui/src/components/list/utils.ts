import { Collection } from '../../lib/typings';
import { isCollection } from '../../utils/collection';
import { isLoading } from '../../utils/query';
import { ListItem, ListItemAdapter, ListStatus } from './typings';

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

export const canFetchMore = (data: any[] | Collection<any>): boolean => {
  if (isCollection(data) && ![ListStatus.Loading, ListStatus.PartialLoading].includes(getListStatus(data))) {
    return data.total === undefined;
  }
  return false;
};

export const getListStatus = (data: any[] | Collection<any>): ListStatus => {
  if (isCollection(data)) {
    const items = data.data;
    const loading = data.loading;
    if (items === undefined) {
      return loading ? ListStatus.Loading : ListStatus.NotInitialized;
    }
    if (!loading) {
      return ListStatus.Loaded;
    }

    for (const item of items) {
      if (!isLoading(item)) {
        return ListStatus.PartialLoading;
      }
    }
    return ListStatus.Loading;
  }
  return ListStatus.Loaded;
};

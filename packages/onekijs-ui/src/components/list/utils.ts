import { Collection } from '../../lib/typings';
import { isCollection } from '../../utils/collection';
import { isLoading, loading } from '../../utils/query';
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
  if (isCollection(data) && !(getListStatus(data) === ListStatus.Loading)) {
    return data.total === undefined;
  }
  return false;
};

export const getListStatus = (data: any[] | Collection<any>, size?: number, offset?: number): ListStatus => {
  if (isCollection(data)) {
    let items = data.data;
    if (items === undefined) {
      return ListStatus.NotInitialized;
    }
    size = size || items.length;
    offset = offset || 0;

    const limit = data.total === undefined ? offset + size : Math.min(offset + size, data.total);
    items = Object.assign(Array(limit - offset), items.slice(offset, limit));

    if (items.includes(loading)) {
      return ListStatus.Loading;
    }

    if (items.includes(undefined)) {
      return ListStatus.NotLoaded;
    }
  }
  return ListStatus.Loaded;
};

import { Collection, CollectionStatus, Item, ItemMeta, LoadingStatus } from '../../lib/typings';
import { isCollection } from '../../utils/collection';
import { isDeprecated, isLoading } from '../../utils/query';
import { ListItem, ListItemAdapter } from './typings';

export const adapt = <T>(item: Item<T>, meta: ItemMeta, adapter?: ListItemAdapter<T>): ListItem<T> => {
  const loading = isLoading(meta);
  const deprecated = isDeprecated(meta);
  const result: ListItem<T> = { loading, deprecated, item };

  let adaptee;
  if (item !== undefined) {
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
  } else {
    adaptee = {
      id: undefined,
      text: undefined,
    };
  }
  Object.assign(result, adaptee);
  return result;
};

// export const canFetchMore = (data: any[] | Collection<any>): boolean => {
//   if (
//     isCollection(data) &&
//     ![ListStatus.Loading, ListStatus.PartialLoading, ListStatus.Deprecated, ListStatus.PartialDeprecated].includes(
//       getListStatus(data),
//     )
//   ) {
//     return data.total === undefined;
//   }
//   return false;
// };

export const canFetchMore = (data: any[] | Collection<any>): boolean => {
  return isCollection(data) && data.status === LoadingStatus.PartialLoaded;
};

export const getListStatus = (data: any[] | Collection<any>): CollectionStatus => {
  if (isCollection(data)) {
    if (data === undefined) {
      return LoadingStatus.NotInitialized;
    }
    return data.status;
  }
  return LoadingStatus.Loaded;
};

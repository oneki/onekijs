import { Collection, CollectionStatus, Item, ItemMeta, LoadingStatus } from '../../../collection/typings';
import { isCollection } from '../../../collection/utils';

//   item: Item<T, M>,
//   meta: ItemMeta,
//   adapter?: ListItemAdapter<T, M>,
// ): ListItem<T, M> => {
//   const loading = isLoading(meta);
//   const deprecated = isDeprecated(meta);
//   const result: ListItem<T> = { loading, deprecated, item };

//   let adaptee;
//   if (item !== undefined) {
//     if (adapter) {
//       adaptee = adapter(item);
//     } else if (['string', 'number', 'boolean'].includes(typeof item)) {
//       adaptee = {
//         id: item,
//         text: String(item),
//       };
//     } else {
//       adaptee = {
//         id: (item as any).id,
//         text: (item as any).text,
//       };
//     }
//   } else {
//     adaptee = {
//       id: undefined,
//       text: undefined,
//     };
//   }
//   Object.assign(result, adaptee);
//   return result;
// };

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

export const emptyListItem: Item<any, ItemMeta> = {};

export const canFetchMore = (collection: any[] | Collection<any, ItemMeta>): boolean => {
  return isCollection(collection) && (collection as Collection<any, ItemMeta>).status === LoadingStatus.PartialLoaded;
};

export const getListStatus = (collection: any[] | Collection<any, ItemMeta>): CollectionStatus => {
  if (isCollection(collection)) {
    return (collection as Collection<any, ItemMeta>).status;
  }
  return LoadingStatus.Loaded;
};
import { Collection, CollectionStatus, isCollection, Item, LoadingStatus } from 'onekijs-framework';

export const canFetchMore = <T, I extends Item<T>>(collection: T[] | Collection<T, I>): boolean => {
  return isCollection(collection) && (collection as Collection<T, I>).status === LoadingStatus.PartialLoaded;
};

export const getListStatus = <T, I extends Item<T>>(collection: T[] | Collection<T, I>): CollectionStatus => {
  if (isCollection(collection)) {
    return (collection as Collection<T, I>).status;
  }
  return LoadingStatus.Loaded;
};

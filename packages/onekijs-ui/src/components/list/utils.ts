import {
  Collection,
  CollectionProxy,
  CollectionState,
  CollectionStatus,
  isCollection,
  Item,
  LoadingStatus,
} from 'onekijs-framework';

export const canFetchMore = <T, I extends Item<T>, S extends CollectionState<T, I>>(
  collection: T[] | Collection<T, I, S>,
): boolean => {
  return isCollection(collection) && (collection as Collection<T, I, S>).status === LoadingStatus.PartialLoaded;
};

export const getListStatus = <T, I extends Item<T>, S extends CollectionState<T, I>>(
  collection: T[] | CollectionProxy<T, I, S>,
): CollectionStatus => {
  if (isCollection(collection)) {
    return (collection as CollectionProxy<T, I, S>).status;
  }
  return LoadingStatus.Loaded;
};

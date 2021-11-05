import {
  Collection,
  CollectionBy,
  CollectionProxy,
  CollectionState,
  Item,
  UseCollectionOptions,
  ItemAdaptee,
} from 'onekijs-framework';
import React from 'react';
import { ListItemProps } from '../list/typings';

export type TreeController<
  T,
  I extends TreeItem<T> = TreeItem<T>,
  S extends TreeState<T, I> = TreeState<T, I>
> = Collection<T, I, S> & {
  addSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  removeSelected<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  setSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
};

export type TreeItem<T> = Item<T> & {
  selected?: boolean;
  active?: boolean;
  expanded?: boolean;
  children?: TreeItem<T>[]; // list of uids
  parent?: TreeItem<T>[];
  icon?: string;
  disabled?: boolean;
  type?: 'folder' | 'leaf';
};

export type TreeItemAdaptee<T> = ItemAdaptee & {
  children?: T[];
  icon?: string;
};

export type TreeItemAdapter<T> = (data: T) => TreeItemAdaptee<T>;

export type TreeItemHandler<T, I extends TreeItem<T> = TreeItem<T>> = (item: I) => void;

export type TreeItemProps<T = any, I extends TreeItem<T> = TreeItem<T>> = ListItemProps<T, I> & {
  className?: string;
  level: number;
};

export type TreeProps<
  T = any,
  I extends TreeItem<T> = TreeItem<T>,
  S extends TreeState<T, I> = TreeState<T, I>,
  C extends TreeController<T, I, S> = TreeController<T, I, S>
> = {
  className?: string;
  controller: CollectionProxy<T, I, S, C>;
};

type _TreeState<T, I extends TreeItem<T>> = {
  onItemClick?: TreeItemHandler<T, I>;
  ItemComponent?: React.FC<TreeItemProps<T, I>>;
  itemClassName?: string | ((item: I) => string);
  selected?: string[];
  active?: string;
};

export type TreeState<T, I extends TreeItem<T> = TreeItem<T>> = CollectionState<T, I> & _TreeState<T, I>;

export type UseTreeOptions<T, I extends TreeItem<T>> = UseCollectionOptions<T, I> &
  _TreeState<T, I> & {
    adapter?: TreeItemAdapter<T>;
    dataSource?: T[] | string;
  };

import {
  Collection,
  CollectionProxy,
  CollectionState,
  Item,
  ItemAdaptee,
  UseCollectionOptions,
} from 'onekijs-framework';
import React from 'react';
import { ListItemProps } from '../list/typings';

export type ArrayTreeProps<T = any, I extends TreeItem<T> = TreeItem<T>> = TreeConfig<T, I> & {
  adapter?: TreeItemAdapter<T>;
  dataSource?: string | T[];
  fetchOnce?: boolean;
  selected?: T[];
};

export type ControllerTreeProps<
  T = any,
  I extends TreeItem<T> = TreeItem<T>,
  S extends TreeState<T, I> = TreeState<T, I>,
  C extends TreeController<T, I, S> = TreeController<T, I, S>
> = TreeConfig<T, I> & {
  controller: CollectionProxy<T, I, S, C>;
};

export type TreeConfig<T = any, I extends TreeItem<T> = TreeItem<T>> = {
  className?: string;
  itemClassName?: string | ((item: I) => string);
  ItemComponent?: React.FC<TreeItemProps<T, I>>;
  onActivate?: TreeItemHandler<T, I>;
  onCollapse?: TreeItemHandler<T, I>;
  onExpand?: TreeItemHandler<T, I>;
  onSelect?: TreeItemHandler<T, I>;
};

export type TreeController<
  T = any,
  I extends TreeItem<T> = TreeItem<T>,
  S extends TreeState<T, I> = TreeState<T, I>
> = Collection<T, I, S> & {
  collapse: TreeItemHandler<T, I>;
  expand: TreeItemHandler<T, I>;
};

export type TreeItem<T = any> = Item<T> & {
  active?: boolean;
  activable?: boolean;
  children?: string[];
  disabled?: boolean;
  expanded?: boolean;
  icon?: string;
  level: number;
  parent?: string;
  selectable?: boolean;
  selected?: boolean;
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
  onCollapse: TreeItemHandler<T, I>;
  onExpand: TreeItemHandler<T, I>;
};

export type TreeItemToggleProps<T = any, I extends TreeItem<T> = TreeItem<T>> = Pick<
  TreeItemProps<T, I>,
  'item' | 'onExpand' | 'onCollapse'
>;

export type TreeProps<
  T = any,
  I extends TreeItem<T> = TreeItem<T>,
  S extends TreeState<T, I> = TreeState<T, I>,
  C extends TreeController<T, I, S> = TreeController<T, I, S>
> = TreeConfig<T, I> & {
  adapter?: TreeItemAdapter<T>;
  controller?: CollectionProxy<T, I, S, C>;
  dataSource?: string | T[];
  fetchOnce?: boolean;
  selected?: T[];
};

export type TreeState<T, I extends TreeItem<T> = TreeItem<T>> = CollectionState<T, I> & {
  active?: string[];
  adapter?: TreeItemAdapter<T>;
  dataSource?: T[] | string;
  expanded?: string[];
  selected?: string[];
};

export type UseTreeOptions<T, I extends TreeItem<T>> = UseCollectionOptions<T, I> & {
  active?: T[];
  adapter?: TreeItemAdapter<T>;
  dataSource?: T[] | string;
  selected?: T[];
};

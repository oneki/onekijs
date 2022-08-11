import {
  Collection,
  CollectionProxy,
  CollectionState,
  Item,
  ItemAdaptee,
  UseCollectionOptions,
} from 'onekijs-framework';
import React, { ReactNode } from 'react';
import { ListItemHandler, ListItemProps, StandardListProps, VirtualListProps } from '../list/typings';

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
  height?: number;
  itemClassName?: string | ((item: I) => string);
  ItemComponent?: React.FC<TreeItemProps<T, I>>;
  IconComponent?: React.FC<TreeItemProps<T, I>>;
  TogglerComponent?: React.FC<TreeItemToggleProps>;
  onActivate?: TreeItemHandler<T, I>;
  onSelect?: TreeItemHandler<T, I>;
  virtual?: boolean;
  gap?: number;
  paddingLeft?: number;
  paddingRight?: number;
  animate?: boolean;
};

export type TreeController<
  T = any,
  I extends TreeItem<T> = TreeItem<T>,
  S extends TreeState<T, I> = TreeState<T, I>
> = Collection<T, I, S> & {
  collapse: TreeItemHandler<T, I>;
  collapsing: TreeItemHandler<T, I>;
  collpased: TreeItemHandler<T, I>;
  expand: TreeItemHandler<T, I>;
  expanding: TreeItemHandler<T, I>;
  expanded: TreeItemHandler<T, I>;
};

export type TreeItem<T = any> = Item<T> & {
  activable?: boolean;
  children?: string[];
  collapsing?: boolean;
  expanded?: boolean;
  expanding?: boolean;
  icon?: ReactNode;
  level: number;
  parent?: string;
  selectable?: boolean;
  type?: 'folder' | 'leaf';
};

export type TreeItemAdaptee<T> = ItemAdaptee & {
  children?: T[];
  icon?: ReactNode;
  selectable?: boolean;
  selected?: boolean;
  type?: 'folder' | 'leaf';
  expanded?: boolean;
};

export type TreeItemAdapter<T> = (data: T) => TreeItemAdaptee<T>;

export type TreeItemHandler<T = any, I extends TreeItem<T> = TreeItem<T>> = ListItemHandler<T, I>;

export type TreeItemProps<T = any, I extends TreeItem<T> = TreeItem<T>> = ListItemProps<T, I> & {
  className?: string;
  onCollapse: TreeItemHandler<T, I>;
  onExpand: TreeItemHandler<T, I>;
};

export type TreeItemToggleProps<T = any, I extends TreeItem<T> = TreeItem<T>> = Pick<
  TreeItemProps<T, I>,
  'item' | 'onExpand' | 'onCollapse' | 'index'
>;

export type TreeListProps<T = any, I extends TreeItem<T> = TreeItem<T>> = StandardListProps<T, I>;

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

export type TreeState<T = any, I extends TreeItem<T> = TreeItem<T>> = CollectionState<T, I> & {
  active?: string[];
  adapter?: TreeItemAdapter<T>;
  dataSource?: T[] | string;
  collapsing?: string[];
  expanded?: string[];
  expanding?: string[];
  selected?: string[];
};

export type UseTreeOptions<T = any, I extends TreeItem<T> = TreeItem<T>> = UseCollectionOptions<T, I> & {
  active?: T[];
  adapter?: TreeItemAdapter<T>;
  dataSource?: T[] | string;
  selected?: T[];
};

export type VirtualTreeListProps<T = any, I extends TreeItem<T> = TreeItem<T>> = VirtualListProps<T, I>;

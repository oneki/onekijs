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
  C extends TreeController<T, I, S> = TreeController<T, I, S>,
> = TreeConfig<T, I> & {
  controller: CollectionProxy<T, I, S, C>;
};

export type TreeConfig<T = any, I extends TreeItem<T> = TreeItem<T>> = {
  className?: string;
  height?: string | number;
  treeItemClassName?: string | ((item: I) => string);
  TreeItemComponent?: React.FC<TreeItemProps<T, I>>;
  TreeItemContentComponent?: React.FC<TreeItemProps<T, I>>;
  TreeIconComponent?: React.FC<TreeItemProps<T, I>>;
  TreeTogglerComponent?: React.FC<TreeItemToggleProps<T, I>>;
  onActivate?: TreeItemHandler<T, I>;
  onSelect?: TreeItemHandler<T, I>;
  virtual?: boolean;
  gap?: number;
  paddingLeft?: number;
  paddingRight?: number;
  animate?: boolean;
  keyboardNavigable?: boolean;
  listRef?: React.RefObject<HTMLDivElement>;
};

export type TreeController<
  T = any,
  I extends TreeItem<T> = TreeItem<T>,
  S extends TreeState<T, I> = TreeState<T, I>,
> = Collection<T, I, S> & {
  collapse: TreeItemHandler<T, I>;
  collapsing: TreeItemHandler<T, I>;
  collapsed: TreeItemHandler<T, I>;
  expand: TreeItemHandler<T, I>;
  expanding: TreeItemHandler<T, I>;
  expanded: TreeItemHandler<T, I>;
};

export type TreeItem<T = any> = Item<T> & {
  activable?: boolean;
  children?: string[];
  collapsing?: boolean;
  expanded?: boolean;
  filterExpanded?: boolean;
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

export type TreeItemContext<T = any, I extends TreeItem<T> = TreeItem<T>> = {
  className?: string;
  onCollapse: TreeItemHandler<T, I>;
  onExpand: TreeItemHandler<T, I>;
};

export type TreeItemProps<T = any, I extends TreeItem<T> = TreeItem<T>> = ListItemProps<T, I>;

export type TreeItemToggleProps<T = any, I extends TreeItem<T> = TreeItem<T>> = Pick<
  TreeItemProps<T, I>,
  'item' | 'index'
> &
  Pick<TreeItemContext<T, I>, 'onCollapse' | 'onExpand'>;

export type TreeListProps<T = any, I extends TreeItem<T> = TreeItem<T>> = StandardListProps<T, I>;

export type TreeProps<
  T = any,
  I extends TreeItem<T> = TreeItem<T>,
  S extends TreeState<T, I> = TreeState<T, I>,
  C extends TreeController<T, I, S> = TreeController<T, I, S>,
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
  filterExpanded?: string[];
  selected?: string[];
};

export type UseTreeOptions<T = any, I extends TreeItem<T> = TreeItem<T>> = UseCollectionOptions<T, I> & {
  active?: T[];
  adapter?: TreeItemAdapter<T>;
  dataSource?: T[] | string;
  selected?: T[];
};

export type VirtualTreeListProps<T = any, I extends TreeItem<T> = TreeItem<T>> = VirtualListProps<T, I>;

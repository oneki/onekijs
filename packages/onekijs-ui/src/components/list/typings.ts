import {
  Collection,
  CollectionProxy,
  CollectionState,
  Item,
  ItemAdaptee,
  ItemAdapter,
  UseCollectionOptions,
} from 'onekijs-framework';
import React, { FC, ReactNode } from 'react';
import { StylableProps } from '../../styles/typings';

export type ArrayListProps<T = any, I extends ListItem<T> = ListItem<T>> = ListConfig<T, I> & {
  adapter?: ListItemAdapter<T>;
  dataSource: T[] | string;
  fetchOnce?: boolean;
};

export type ListBodyProps<
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>,
  C extends ListCollection<T, I, S> = ListCollection<T, I, S>,
> = Pick<
  CollectionListProps<T, I>,
  | 'onItemSelect'
  | 'onItemUnselect'
  | 'onItemActivate'
  | 'onItemDeactivate'
  | 'onItemHighlight'
  | 'onItemUnhighlight'
  | 'multiSelect'
  | 'ItemComponent'
  | 'NotFoundComponent'
  | 'LoadingComponent'
  | 'height'
  | 'keyboardNavigable'
> & {
  bodyRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  ItemLoadingComponent?: FC;
  ItemComponent?: FC<ListItemProps<T, I>>;
  ItemContentComponent?: FC<ListItemProps<T, I>>;
  items: (I | undefined)[];
  ListComponent?: FC<StandardListProps<T, I>>;
  parentRef?: React.RefObject<HTMLDivElement>;
  service: C;
  state: S;
  style?: React.CSSProperties;
  totalSize?: number;
  scrollToIndex?: (index: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;
  virtualItems?: VirtualItem[];
  VirtualListComponent?: FC<VirtualListProps<T, I>>;
};

export type CollectionListProps<
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>,
  C extends ListCollection<T, I, S> = ListCollection<T, I, S>,
> = ListConfig<T, I> & {
  controller: CollectionProxy<T, I, S, C>;
};

export type ListCollection<
  T,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>,
> = Collection<T, I, S>;

export type ListFooterProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type ListHeaderProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type ListItem<T = any> = Item<T>;

export type ListItemAdaptee = ItemAdaptee;

export type ListItemAdapter<T = any> = ItemAdapter<T>;

export type ListItemHandler<T = any, I extends ListItem<T> = ListItem<T>> = (item: I, index: number) => void;

export interface ListItemProps<T = any, I extends ListItem<T> = ListItem<T>> {
  index: number;
  item: I;
  data: T;
  ItemContentComponent?: FC<ListItemProps<T, I>>;
  onClick?: ListItemHandler<T, I>;
  onMouseEnter?: ListItemHandler<T, I>;
  onMouseLeave?: ListItemHandler<T, I>;
}

export type ListItems<T = any, I extends ListItem<T> = ListItem<T>> = T[] | ListCollection<T, I>;

export type ListConfig<T = any, I extends ListItem<T> = ListItem<T>> = {
  className?: string;
  height?: number | string;
  increment?: number;
  ItemLoadingComponent?: FC;
  ItemComponent?: FC<ListItemProps<T, I>>;
  ItemContentComponent?: FC<ListItemProps<T, I>>;
  NotFoundComponent?: FC<ListNotFoundProps>;
  LoadingComponent?: FC<StylableProps>;
  itemHeight?: number | ((index: number) => number);
  keyboardNavigable?: boolean;
  multiSelect?: boolean;
  onItemActivate?: ListItemHandler<T, I>;
  onItemDeactivate?: ListItemHandler<T, I>;
  onItemHighlight?: ListItemHandler<T, I>;
  onItemUnhighlight?: ListItemHandler<T, I>;
  onItemSelect?: ListItemHandler<T, I>;
  onItemUnselect?: ListItemHandler<T, I>;
  overscan?: number;
  preload?: number;
  style?: React.CSSProperties;
  virtual?: boolean;
};

export type ListNotFoundProps = {
  text?: ReactNode | ReactNode[];
};

export type ListProps<
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>,
  C extends ListCollection<T, I, S> = ListCollection<T, I, S>,
> = ListConfig<T, I> & {
  adapter?: ListItemAdapter<T>;
  controller?: CollectionProxy<T, I, S, C>;
  dataSource?: T[] | string;
  fetchOnce?: boolean;
};

export type ListState<T, I extends ListItem<T> = ListItem<T>> = CollectionState<T, I>;

export enum ListStatus {
  NotInitialized = 'not initialized',
  NotLoaded = 'not loaded',
  Loading = 'loading',
  Fetching = 'fetching',
  PartialFetching = 'partial fetching',
  PartialLoading = 'partial loading',
  Loaded = 'loaded',
}

export type StandardListProps<T = any, I extends ListItem<T> = ListItem<T>> = Pick<
  ListBodyProps<T, I>,
  'items' | 'ItemComponent' | 'ItemLoadingComponent' | 'ItemContentComponent' | 'LoadingComponent'
> & {
  onItemClick?: ListItemHandler<T, I>;
  onItemMouseEnter?: ListItemHandler<T, I>;
  onItemMouseLeave?: ListItemHandler<T, I>;
};

export type UseListOptions<T, I extends ListItem<T> = ListItem<T>> = UseCollectionOptions<T, I> & {
  adapter?: ListItemAdapter<T>;
};

export type VirtualItem = {
  end: number;
  index: number;
  start: number;
  size: number;
  measureRef: (el: HTMLElement | null) => void;
};

export type VirtualListProps<T = any, I extends ListItem<T> = ListItem<T>> = StandardListProps<T, I> & {
  virtualItems: VirtualItem[];
};

export type VirtualItemWrapperProps<T = any, I extends ListItem<T> = ListItem<T>> = {
  ItemLoadingComponent?: FC;
  ItemComponent?: FC<ListItemProps<T, I>>;
  ItemContentComponent?: FC<ListItemProps<T, I>>;
  listItem: any;
  onItemClick?: ListItemHandler<T, I>;
  onItemMouseEnter?: ListItemHandler<T, I>;
  onItemMouseLeave?: ListItemHandler<T, I>;
  virtualItem: VirtualItem;
};

import {
  Collection,
  CollectionProxy,
  CollectionState,
  Item,
  ItemAdaptee,
  ItemAdapter,
  UseCollectionOptions,
} from 'onekijs-framework';
import React, { FC } from 'react';

export type ArrayListProps<T = any, I extends ListItem<T> = ListItem<T>> = _ListProps<T, I> & {
  dataSource: T[] | string;
  adapter?: ListItemAdapter<T>;
};

export type ListBodyProps<T = any, I extends ListItem<T> = ListItem<T>> = Pick<
  ListProps<T, I>,
  | 'onItemClick'
  | 'onItemMouseEnter'
  | 'onItemMouseLeave'
  | 'onItemMouseOut'
  | 'onItemMouseOver'
  | 'ItemComponent'
  | 'height'
> & {
  bodyRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  ItemComponent: FC<ListItemProps<T, I>>;
  items: (Item<T> | undefined)[];
  parentRef?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  totalSize?: number;
  virtualItems?: VirtualItem[];
};

export type ListComponentProps<
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>,
  C extends ListCollection<T, I, S> = ListCollection<T, I, S>
> = _ListProps<T, I> & {
  dataSource: CollectionProxy<T, I, S, C>;
};

export type ListCollection<
  T,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>
> = Collection<T, I, S>;

export type ListFooterProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type ListHeaderProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type ListItem<T> = Item<T>;

export type ListItemAdaptee = ItemAdaptee;

export type ListItemAdapter<T> = ItemAdapter<T>;

export type ListItemHandler<T, I extends ListItem<T> = ListItem<T>> = (item: I | undefined, index: number) => void;

export interface ListItemProps<T = any, I extends ListItem<T> = ListItem<T>> {
  index: number;
  item?: I;
  onClick?: ListItemHandler<T, I>;
  onMouseOver?: ListItemHandler<T, I>;
  onMouseOut?: ListItemHandler<T, I>;
  onMouseEnter?: ListItemHandler<T, I>;
  onMouseLeave?: ListItemHandler<T, I>;
}

export type ListItems<T, I extends ListItem<T> = ListItem<T>> = T[] | ListCollection<T, I>;

export type _ListProps<T = any, I extends ListItem<T> = ListItem<T>> = {
  className?: string;
  height?: number | string;
  increment?: number;
  ItemComponent?: FC<ListItemProps<T, I>>;
  itemHeight?: number | ((index: number) => number);
  onItemClick?: ListItemHandler<T, I>;
  onItemMouseOver?: ListItemHandler<T, I>;
  onItemMouseOut?: ListItemHandler<T, I>;
  onItemMouseEnter?: ListItemHandler<T, I>;
  onItemMouseLeave?: ListItemHandler<T, I>;
  overscan?: number;
  preload?: number;
  style?: React.CSSProperties;
  virtual?: boolean;
};

export type ListProps<
  T = any,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>,
  C extends ListCollection<T, I, S> = ListCollection<T, I, S>
> = ArrayListProps<T, I> | ListComponentProps<T, I, S, C>;

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

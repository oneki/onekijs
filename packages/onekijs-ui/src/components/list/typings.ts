import { Collection, Item, UseCollectionOptions, CollectionItemAdapter } from 'onekijs-framework';
import React, { FC } from 'react';

export type ListItems<T, I extends Item<T> = Item<T>> = T[] | Collection<T, I>;

export type ListItemHandler<T, I extends Item<T> = Item<T>> = (item: I | undefined, index: number) => void;

export interface ListItemProps<T = any, I extends Item<T> = Item<T>> {
  index: number;
  item?: I;
  onClick?: ListItemHandler<T, I>;
  onMouseOver?: ListItemHandler<T, I>;
  onMouseOut?: ListItemHandler<T, I>;
  onMouseEnter?: ListItemHandler<T, I>;
  onMouseLeave?: ListItemHandler<T, I>;
}

export interface ListProps<T = any, I extends Item<T> = Item<T>> {
  className?: string;
  height?: number | string;
  increment?: number;
  items: ListItems<T>;
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
}

export type ListBodyProps<T = any, I extends Item<T> = Item<T>> = Pick<
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

export type ListFooterProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type ListHeaderProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type ListInternalProps<T = any, I extends Item<T> = Item<T>> = Omit<ListProps<T>, 'items' | 'BodyComponent'> & {
  collection: Collection<T, I>;
  BodyComponent: React.FC<ListBodyProps<T, I>>;
};

export enum ListStatus {
  NotInitialized = 'not initialized',
  NotLoaded = 'not loaded',
  Loading = 'loading',
  Fetching = 'fetching',
  PartialFetching = 'partial fetching',
  PartialLoading = 'partial loading',
  Loaded = 'loaded',
}

export type StandardListProps<T = any, I extends Item<T> = Item<T>> = Omit<
  ListInternalProps<T, I>,
  'height' | 'itemHeight'
>;

export type UseListOptions<T, I extends Item<T> = Item<T>> = UseCollectionOptions<T, I> & {
  adapter?: CollectionItemAdapter<T, I>;
};

export type VirtualItem = {
  end: number;
  index: number;
  start: number;
  size: number;
  measureRef: (el: HTMLElement | null) => void;
};

export type VirtualListProps<T = any, I extends Item<T> = Item<T>> = ListInternalProps<T, I>;

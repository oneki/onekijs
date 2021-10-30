import { Collection, Item, ItemMeta, UseCollectionOptions, CollectionItemAdapter } from 'onekijs-framework';
import React, { FC } from 'react';

export type ListItems<T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>> =
  | T[]
  | Collection<T, M, I>;

export type ListItemHandler<T, M extends ItemMeta, I extends Item<T, M>> = (item: I, index: number) => void;

export interface ListItemProps<T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>> {
  index: number;
  item: I;
  onClick?: ListItemHandler<T, M, I>;
  onMouseOver?: ListItemHandler<T, M, I>;
  onMouseOut?: ListItemHandler<T, M, I>;
  onMouseEnter?: ListItemHandler<T, M, I>;
  onMouseLeave?: ListItemHandler<T, M, I>;
}

export interface ListProps<T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>> {
  className?: string;
  height?: number | string;
  increment?: number;
  items: ListItems<T, M>;
  ItemComponent?: FC<ListItemProps<T, M>>;
  itemHeight?: number | ((index: number) => number);
  onItemClick?: ListItemHandler<T, M, I>;
  onItemMouseOver?: ListItemHandler<T, M, I>;
  onItemMouseOut?: ListItemHandler<T, M, I>;
  onItemMouseEnter?: ListItemHandler<T, M, I>;
  onItemMouseLeave?: ListItemHandler<T, M, I>;
  overscan?: number;
  preload?: number;
  style?: React.CSSProperties;
  virtual?: boolean;
}

export type ListBodyProps<T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>> = Pick<
  ListProps<T, M>,
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
  ItemComponent: FC<ListItemProps<T, M, I>>;
  items: (Item<T, M> | undefined)[];
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

export type ListInternalProps<T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>> = Omit<
  ListProps<T, M>,
  'items' | 'BodyComponent'
> & {
  collection: Collection<T, M, I>;
  BodyComponent: React.FC<ListBodyProps<T, M, I>>;
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

export type StandardListProps<T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>> = Omit<
  ListInternalProps<T, M, I>,
  'height' | 'itemHeight'
>;

export type UseListOptions<T, M extends ItemMeta, I extends Item<T, M>> = UseCollectionOptions<T, M, I> & {
  adapter?: CollectionItemAdapter<T, M, I>;
};

export type VirtualItem = {
  end: number;
  index: number;
  start: number;
  size: number;
  measureRef: (el: HTMLElement | null) => void;
};

export type VirtualListProps<T = any, M extends ItemMeta = ItemMeta> = ListInternalProps<T, M>;

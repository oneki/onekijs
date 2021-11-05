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

export type ListController<
  T,
  I extends ListItem<T> = ListItem<T>,
  S extends ListState<T, I> = ListState<T, I>
> = Collection<T, I, S>;

export type ListItems<T, I extends Item<T> = Item<T>> = T[] | ListController<T, I>;

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

export type ListProps<
  T = any,
  I extends Item<T> = Item<T>,
  S extends ListState<T, I> = ListState<T, I>,
  C extends ListController<T, I, S> = ListController<T, I, S>
> = {
  controller?: CollectionProxy<T, I, S, C>;
  className?: string;
  height?: number | string;
  increment?: number;
  ItemComponent?: FC<ListItemProps<T, I>>;
  itemHeight?: number | ((index: number) => number);
  items?: T[];
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

export type ListInternalProps<T = any, I extends Item<T> = Item<T>> = Omit<
  ListProps<T>,
  'items' | 'BodyComponent' | 'controller'
> & {
  controller: ListController<T, I>;
  BodyComponent: React.FC<ListBodyProps<T, I>>;
};

export type ListItem<T> = Item<T>;

export type ListItemAdaptee = ItemAdaptee;

export type ListItemAdapter<T> = ItemAdapter<T>;

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

export type StandardListProps<T = any, I extends Item<T> = Item<T>> = Omit<
  ListInternalProps<T, I>,
  'height' | 'itemHeight'
>;

export type UseListOptions<T, I extends Item<T> = Item<T>> = UseCollectionOptions<T, I> & {
  adapter?: ListItemAdapter<T>;
};

export type VirtualItem = {
  end: number;
  index: number;
  start: number;
  size: number;
  measureRef: (el: HTMLElement | null) => void;
};

export type VirtualListProps<T = any, I extends Item<T> = Item<T>> = ListInternalProps<T, I>;

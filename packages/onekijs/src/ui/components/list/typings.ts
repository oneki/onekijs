import { FC, RefObject } from 'react';
import { Collection, Item, ItemMeta } from '../../../collection/typings';

export type ListItems<T = any, M extends ItemMeta = ItemMeta> = T[] | Collection<T, M>;

export type ListItemHandler<T = any, M extends ItemMeta = ItemMeta> = (item: Item<T, M>, index: number) => void;

export interface ListItemProps<T = any, M extends ItemMeta = ItemMeta> {
  index: number;
  item: Item<T, M>;
  onClick?: ListItemHandler<T, M>;
  onMouseOver?: ListItemHandler<T, M>;
  onMouseOut?: ListItemHandler<T, M>;
  onMouseEnter?: ListItemHandler<T, M>;
  onMouseLeave?: ListItemHandler<T, M>;
}

export interface ListProps<T = any, M extends ItemMeta = ItemMeta> {
  className?: string;
  bodyClassName?: string;
  BodyComponent?: React.FC<ListBodyProps<T, M>>;
  bodyStyle?: React.CSSProperties;
  footerClassName?: string;
  FooterComponent?: React.FC<ListFooterProps>;
  footerStyle?: React.CSSProperties;
  headerClassName?: string;
  HeaderComponent?: React.FC<ListHeaderProps>;
  headerStyle?: React.CSSProperties;
  height?: number | string;
  increment?: number;
  items: ListItems<T, M>;
  ItemComponent?: FC<ListItemProps<T, M>>;
  itemHeight?: number | ((index: number) => number);
  onItemClick?: ListItemHandler<T, M>;
  onItemMouseOver?: ListItemHandler<T, M>;
  onItemMouseOut?: ListItemHandler<T, M>;
  onItemMouseEnter?: ListItemHandler<T, M>;
  onItemMouseLeave?: ListItemHandler<T, M>;
  ref?: RefObject<HTMLDivElement>;
  preload?: number;
  style?: React.CSSProperties;
  virtual?: boolean;
}

export type ListBodyProps<T = any, M extends ItemMeta = ItemMeta> = Pick<
  ListProps<T, M>,
  'onItemClick' | 'onItemMouseEnter' | 'onItemMouseLeave' | 'onItemMouseOut' | 'onItemMouseOver' | 'ItemComponent'
> & {
  className?: string;
  items: (Item<T, M> | undefined)[];
  style?: React.CSSProperties;
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

export type ListInternalProps<T = any, M extends ItemMeta = ItemMeta> = Omit<
  ListProps<T, M>,
  'items' | 'BodyComponent'
> & {
  collection: Collection<T, M>;
  BodyComponent: React.FC<ListBodyProps<T, M>>;
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

export type StandardListProps<T = any, M extends ItemMeta = ItemMeta> = Omit<
  ListInternalProps<T, M>,
  'height' | 'itemHeight'
>;

export type VirtualItem = {
  end: number;
  index: number;
  start: number;
  size: number;
  measureRef: (el: HTMLElement | null) => void;
};

export type VirtualListProps<T = any, M extends ItemMeta = ItemMeta> = ListInternalProps<T, M>;
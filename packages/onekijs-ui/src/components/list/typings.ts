import { FC } from 'react';
import { Collection } from '../../lib/typings';

export interface ListProps<T = any> {
  adapter?: ListItemAdapter<T>;
  className?: string;
  data: T[] | Collection<T>;
  height?: number;
  ItemComponent?: FC<ListItemProps<T>>;
  itemHeight?: number | ((index: number) => number);
  preload?: number;
  increment?: number;
}

export interface ListItem<T = any> {
  id?: string | number;
  text?: string;
  loading: boolean;
  deprecated: boolean;
  item?: T;
}

export type ListItemAdapter<T = any> = (
  item: T,
) => {
  id: string | number;
  text: string;
};

export interface ListItemProps<T = any> extends ListItem<T> {
  index: number;
}

export enum ListStatus {
  NotInitialized = 'not initialized',
  NotLoaded = 'not loaded',
  Loading = 'loading',
  Deprecated = 'deprecate',
  PartialDeprecated = 'partial deprecated',
  PartialLoading = 'partial loading',
  Loaded = 'loaded',
}

export type StandardListProps<T = any> = Omit<ListProps<T>, 'height' | 'itemHeight'>;

export type VirtualListProps<T = any> = ListProps<T>;

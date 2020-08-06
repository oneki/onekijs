import { FC } from 'react';
import { Collection } from '../../lib/typings';

export interface ListProps<T = any> {
  className?: string;
  height?: number;
  itemHeight?: number | ((index: number) => number);
  ItemComponent?: FC<ListItemProps<T>>;
  adapter?: ListItemAdapter<T>;
  data: T[] | Collection<T>;
}

export interface ListItem<T = any> {
  id?: string | number;
  text?: string;
  loading: boolean;
  item?: T;
}

export type ListItemAdapter<T = any> = (item: T | symbol | undefined) => ListItem<T>;

export interface ListItemProps<T = any> extends ListItem<T> {
  index: number;
}

export type StandardListProps<T = any> = Omit<ListProps<T>, 'height' | 'itemHeight'>;

export type VirtualListProps<T = any> = ListProps<T> & {
  height: number;
  itemHeight?: number | ((index: number) => number);
};

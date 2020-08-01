import React, { FC } from 'react';

export interface ListProps<T = any> {
  className?: string;
  height?: number;
  itemHeight?: number | ((index: number) => number);
  ItemComponent?: FC<ListItemProps<T>>
  adapter?: ListItemAdapter<T>;
  items: T[];
}

export type StandardListProps<T = any> = Omit<ListProps<T>, 'height' | 'itemHeight'>;

export type VirtualListProps<T = any> = ListProps<T> & {
  height: number;
};

export interface ListItemProps<T = any> {
  item: T;
  adapter: ListItemAdapter<T>;
  index: number;
  loading?: boolean;
}

export interface ListItem {
  id: string | number;
  text: string;
}

export type ListItemAdapter<T = any> = (item: T) => ListItem;

export interface ListContextInterface<T = any> {
  adapter?: ListItemAdapter<T>;
  ItemComponent?: FC<ListItemProps<T>>;
}

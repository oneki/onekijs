import { Item } from 'onekijs-framework';
import React from 'react';

export type TreeItem<T = any, M extends TreeItemMeta = TreeItemMeta> = Item<T, M> & {
  icon?: string | React.FC<TreeItemIconProps<T, M, TreeItem<T, M>>>;
  children?: TreeItem<T, M>[];
};

export type TreeItemIconProps<
  T = any,
  M extends TreeItemMeta = TreeItemMeta,
  I extends TreeItem<T, M> = TreeItem<T, M>
> = {
  item: I;
};

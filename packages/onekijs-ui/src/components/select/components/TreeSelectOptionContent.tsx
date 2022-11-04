import React from 'react';
import { ListItemProps } from '../../list/typings';
import TreeItemComponent from '../../tree/components/TreeItemComponent';
import { TreeSelectItem } from '../typings';

export const TreeSelectOptionContent = <T, I extends TreeSelectItem<T> = TreeSelectItem<T>>(
  props: ListItemProps<T, I>,
) => {
  return props.item.group ? (
    <div className="o-select-option-data o-select-option-group-item">{props.item.text}</div>
  ) : (
    <TreeItemComponent {...props} />
  );
};

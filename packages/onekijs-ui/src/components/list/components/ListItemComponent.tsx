import React from 'react';
import { ListItem, ListItemProps } from '../typings';

export const ListItemContent = <T extends any = any, I extends ListItem<T> = ListItem<T>>({ item }: ListItemProps<T, I>) => {
  return <>{item.text || ''}</>;
};

const ListItemComponent = <T extends any = any, I extends ListItem<T> = ListItem<T>>(props: ListItemProps<T, I>) => {
  const { item, index, onMouseEnter, onMouseLeave, onClick, ItemContentComponent = ListItemContent } = props;
  return (
    <div
      className={`o-list-item${item?.selectable ? ' o-list-item-selectable' : ''}${
        item?.selected ? ' o-list-item-selected' : ''
      }${item?.highlighted ? ' o-list-item-highlighted' : ''}${item?.active ? ' o-list-item-active' : ''}${
        item?.disabled ? ' o-list-item-disabled' : ''
      }`}
      onMouseEnter={() => onMouseEnter && item && onMouseEnter(item, index)}
      onMouseLeave={() => onMouseLeave && item && onMouseLeave(item, index)}
      onClick={() => onClick && item && item.selectable && onClick(item, index)}
    >
      <ItemContentComponent {...props} />
    </div>
  );
};

ListItemComponent.displayName = 'ListItemComponent';

export default React.memo(ListItemComponent) as typeof ListItemComponent;

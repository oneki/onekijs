import { Item } from 'onekijs-framework';
import React, { FC } from 'react';
import { ListItemProps } from '../typings';

export const ListItemContent: FC<ListItemProps<any, Item<any>>> = ({ item }) => {
  return <>{item.text || ''}</>;
};

const ListItemComponent: FC<ListItemProps<any, Item<any>>> = React.memo((props) => {
  const { item, index, onMouseEnter, onMouseLeave, onClick, ItemContentComponent = ListItemContent } = props;
  return (
    <div
      className={`o-list-item${item?.selected ? ' o-list-item-selected' : ''}${
        item?.highlighted ? ' o-list-item-highlighted' : ''
      }${item?.active ? ' o-list-item-active' : ''}${item?.disabled ? ' o-list-item-disabled' : ''}`}
      onMouseEnter={() => onMouseEnter && item && onMouseEnter(item, index)}
      onMouseLeave={() => onMouseLeave && item && onMouseLeave(item, index)}
      onClick={() => onClick && item && onClick(item, index)}
    >
      <ItemContentComponent {...props} />
    </div>
  );
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;

import { Item, LoadingStatus } from 'onekijs-framework';
import React, { FC } from 'react';
import LoadingIcon from '../../icon/LoadingIcon';
import { ListItemProps } from '../typings';

export const listItemContainer = (
  ListItemContent: FC<ListItemProps<any, Item<any>>>,
): FC<ListItemProps<any, Item<any>>> => {
  const ListItemComponent: FC<ListItemProps<any, Item<any>>> = React.memo((props) => {
    const { item, index, onMouseEnter, onMouseLeave, onClick } = props;
    return (
      <div
        className={`o-list-item${item?.selected ? ' o-list-item-selected' : ''}${
          item?.highlighted ? ' o-list-item-highlighted' : ''
        }${item?.active ? ' o-list-item-active' : ''}${item?.disabled ? ' o-list-item-disabled' : ''}`}
        onMouseEnter={() => onMouseEnter && item && onMouseEnter(item, index)}
        onMouseLeave={() => onMouseLeave && item && onMouseLeave(item, index)}
        onClick={() => onClick && item && onClick(item, index)}
      >
        <ListItemContent {...props} />
      </div>
    );
  });
  ListItemComponent.displayName = 'ListItemComponent';
  return ListItemComponent;
};

export const ListItemContent: FC<ListItemProps<any, Item<any>>> = ({ item }) => {
  return (
    <>
      {item?.data === undefined && item?.loadingStatus === LoadingStatus.Loading ? <LoadingIcon /> : item?.text || ''}
    </>
  );
};

const ListItemComponent = listItemContainer(ListItemContent);

export default ListItemComponent;

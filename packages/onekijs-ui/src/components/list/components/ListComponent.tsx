import React, { FC, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import useList from '../hooks/useList';
import useListView from '../hooks/useListView';
import { ListProps } from '../typings';
import ListBodyComponent from './ListBodyComponent';
import ListItemComponent from './ListItemComponent';

const ListComponent: FC<ListProps> = ({
  className,
  height,
  ItemComponent = ListItemComponent,
  items,
  itemHeight,
  preload,
  increment,
  onItemClick,
  onItemMouseOver,
  onItemMouseOut,
  onItemMouseEnter,
  onItemMouseLeave,
  virtual,
  style,
}) => {
  const collection = useList(items);
  const ref = useRef<HTMLDivElement>(null);

  const { items: listItems, isVirtual, totalSize, virtualItems } = useListView({
    collection,
    height,
    itemHeight,
    preload,
    increment,
    ref,
    virtual,
  });

  return (
    <ListBodyComponent
      className={addClassname('o-list', className)}
      height={height}
      ItemComponent={ItemComponent}
      items={listItems}
      bodyRef={ref}
      onItemClick={onItemClick}
      onItemMouseEnter={onItemMouseEnter}
      onItemMouseLeave={onItemMouseLeave}
      onItemMouseOut={onItemMouseOut}
      onItemMouseOver={onItemMouseOver}
      style={style}
      totalSize={totalSize}
      virtualItems={isVirtual ? virtualItems : undefined}
    />
  );
};

export default ListComponent;

import React, { FC, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import useList from '../hooks/useList';
import { ListImmutableControllerContext, ListMutableControllerContext } from '../hooks/useListController';
import useListView from '../hooks/useListView';
import { ListProps } from '../typings';
import ListBodyComponent from './ListBodyComponent';
import ListItemComponent from './ListItemComponent';

const ListComponent: FC<ListProps> = ({
  className,
  controller,
  height,
  ItemComponent = ListItemComponent,
  itemHeight,
  items,
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
  const listController = useList(controller || items || []);
  const ref = useRef<HTMLDivElement>(null);

  const { items: listItems, isVirtual, totalSize, virtualItems } = useListView({
    controller: listController,
    height,
    itemHeight,
    preload,
    increment,
    ref,
    virtual,
  });

  return (
    <ListImmutableControllerContext.Provider value={listController.asService()}>
      <ListMutableControllerContext.Provider value={listController}>
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
      </ListMutableControllerContext.Provider>
    </ListImmutableControllerContext.Provider>
  );
};

export default ListComponent;

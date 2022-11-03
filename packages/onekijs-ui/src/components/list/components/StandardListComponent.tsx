import { LoadingStatus } from 'onekijs-framework';
import React from 'react';
import { ListItem, StandardListProps } from '../typings';
import ListItemComponent, { ListItemContent } from './ListItemComponent';
import LoadingItem from './LoadingItem';

const StandardListComponent = <T = any, I extends ListItem<T> = ListItem<T>>({
  items,
  ItemComponent = ListItemComponent,
  ItemLoadingComponent = LoadingItem,
  ItemContentComponent = ListItemContent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
}: StandardListProps<T, I>) => {
  return (
    <>
      {items.map((item: any, index: number) => {
        if (item?.loadingStatus === LoadingStatus.Loading) {
          return <ItemLoadingComponent key={`item-${index}`} />;
        }
        if (!item || !item.data) {
          return null;
        }
        return (
          <ItemComponent
            key={`item-${index}`}
            index={index}
            item={item}
            data={item.data}
            onClick={onItemClick}
            onMouseEnter={onItemMouseEnter}
            onMouseLeave={onItemMouseLeave}
            ItemContentComponent={ItemContentComponent}
          />
        );
      })}
    </>
  );
};

export default StandardListComponent;

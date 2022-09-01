import { LoadingStatus } from 'onekijs-framework';
import React from 'react';
import LoadingIcon from '../../icon/LoadingIcon';
import { StandardListProps } from '../typings';
import ListItemComponent, { ListItemContent } from './ListItemComponent';
import LoadingItem from './LoadingItem';

const StandardListComponent: React.FC<StandardListProps<any, any>> = ({
  items,
  ItemComponent = ListItemComponent,
  ItemLoadingComponent = LoadingItem,
  ItemContentComponent = ListItemContent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
}) => {
  return (
    <>
      {items.map((item: any, index: number) => {
        if (item?.loadingStatus === LoadingStatus.Loading) {
          return <ItemLoadingComponent />;
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

import React, { FC, useEffect } from 'react';
import { LoadingStatus } from 'onekijs-core';
import { addClassname } from '../../../utils/style';
import { StandardListProps } from '../typings';
import ListItemComponent from './ListItemComponent';
import { emptyListItem } from '../utils';

const StandardListComponent: FC<StandardListProps> = ({
  className,
  collection,
  ItemComponent = ListItemComponent,
  onItemClick,
  onItemMouseOver,
}) => {
  const items = collection.items ?? [];

  useEffect(() => {
    if (collection.status === LoadingStatus.NotInitialized) {
      return collection.load();
    }
  }, [collection]);

  return (
    <div className={addClassname('o-list', className)}>
      {items.map((item: any, index: number) => {
        return (
          <ItemComponent
            key={`item-${index}`}
            index={index}
            item={item || emptyListItem}
            onClick={onItemClick}
            onMouseOver={onItemMouseOver}
          />
        );
      })}
    </div>
  );
};

export default StandardListComponent;

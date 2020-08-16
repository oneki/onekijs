import React, { FC, useEffect } from 'react';
import { LoadingStatus } from '../../../lib/typings';
import { isCollection } from '../../../utils/collection';
import { addClassname } from '../../../utils/style';
import { StandardListProps } from '../typings';
import ListItemComponent from './ListItemComponent';

const StandardListComponent: FC<StandardListProps> = ({ className, collection, ItemComponent = ListItemComponent }) => {
  const items = collection.items ?? [];

  useEffect(() => {
    if (isCollection(collection)) {
      if (collection.status === LoadingStatus.NotInitialized) {
        return collection.load();
      }
    }
  }, [collection]);

  return (
    <div className={addClassname('o-list', className)}>
      {items.map((item, index) => {
        return <ItemComponent key={`item-${index}`} index={index} {...item} />;
      })}
    </div>
  );
};

export default StandardListComponent;

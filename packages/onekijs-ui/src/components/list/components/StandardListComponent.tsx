import React, { FC, useEffect } from 'react';
import { LoadingStatus } from '../../../lib/typings';
import { isCollection } from '../../../utils/collection';
import { addClassname } from '../../../utils/style';
import { ListItem, ListProps } from '../typings';
import { adapt } from '../utils';
import ListItemComponent from './ListItemComponent';

const defaultPreload = 5;

const StandardListComponent: FC<ListProps> = ({
  className,
  data,
  ItemComponent = ListItemComponent,
  adapter,
  preload = defaultPreload,
}) => {
  const items = (isCollection(data) ? data.data : data) ?? Array(preload);

  useEffect(() => {
    if (isCollection(data)) {
      if (data.status === LoadingStatus.NotInitialized) {
        return data.load();
      }
    }
  }, [data]);

  return (
    <div className={addClassname('o-list', className)}>
      {items.map((item, index) => {
        const meta = isCollection(data) && data.meta ? data.meta[index] : undefined;
        const listItem: ListItem = adapt(item, meta, adapter);
        return <ItemComponent key={`item-${index}`} index={index} {...listItem} />;
      })}
    </div>
  );
};

export default StandardListComponent;

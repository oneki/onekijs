import React, { FC, useEffect } from 'react';
import { addClassname } from '../../../utils/style';
import { ListItem, ListProps, ListStatus } from '../typings';
import { adapt, getListStatus } from '../utils';
import ListItemComponent from './ListItemComponent';
import { isCollection } from '../../../utils/collection';
import { loadingSymbol } from '../../../lib/typings';

const defaultPreload = 5;

const StandardListComponent: FC<ListProps> = ({
  className,
  data,
  ItemComponent = ListItemComponent,
  adapter,
  preload = defaultPreload,
}) => {
  const items = (isCollection(data) ? data.data : data) ?? Array(preload).fill(loadingSymbol);

  useEffect(() => {
    if (isCollection(data)) {
      const status = getListStatus(data);
      if (status === ListStatus.NotInitialized) {
        return data.load();
      }
    }
  }, [data]);

  return (
    <div className={addClassname('o-list', className)}>
      {items.map((item, index) => {
        const listItem: ListItem = adapt(item, adapter);
        return <ItemComponent key={`item-${index}`} index={index} {...listItem} />;
      })}
    </div>
  );
};

export default StandardListComponent;

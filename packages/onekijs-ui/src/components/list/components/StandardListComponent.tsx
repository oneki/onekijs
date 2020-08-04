import React, { FC } from 'react';
import { addClassname } from '../../../utils/style';
import { StandardListProps, ListItem } from '../typings';
import ListItemComponent from './ListItemComponent';
import { adapt } from '../utils';

const StandardListComponent: FC<StandardListProps> = ({
  className,
  items,
  ItemComponent = ListItemComponent,
  adapter,
}) => {
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

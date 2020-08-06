import React, { FC } from 'react';
import { addClassname } from '../../../utils/style';
import { ListItem, ListProps } from '../typings';
import { adapt } from '../utils';
import ListItemComponent from './ListItemComponent';

const StandardListComponent: FC<ListProps> = ({ className, data, ItemComponent = ListItemComponent, adapter }) => {
  return (
    <div className={addClassname('o-list', className)}>
      {data.map((item, index) => {
        const listItem: ListItem = adapt(item, adapter);
        return <ItemComponent key={`item-${index}`} index={index} {...listItem} />;
      })}
    </div>
  );
};

export default StandardListComponent;

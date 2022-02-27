import React from 'react';
import { StandardListProps } from '../typings';
import ListItemComponent from './ListItemComponent';

const StandardListComponent: React.FC<StandardListProps<any, any>> = ({
  items,
  ItemComponent = ListItemComponent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
}) => {
  return (
    <>
      {items.map((item: any, index: number) => {
        return (
          <ItemComponent
            key={`item-${index}`}
            index={index}
            item={item}
            onClick={onItemClick}
            onMouseEnter={onItemMouseEnter}
            onMouseLeave={onItemMouseLeave}
          />
        );
      })}
    </>
  );
};

export default StandardListComponent;

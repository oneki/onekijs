import React from 'react';
import { ItemMeta } from '../../../../collection/typings';
import { ListBodyProps } from '../typings';
import { emptyListItem } from '../utils';
import ListItemComponent from './ListItemComponent';

const ListBodyComponent: React.FC<ListBodyProps<any, ItemMeta>> = ({
  className,
  items,
  ItemComponent = ListItemComponent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  onItemMouseOut,
  onItemMouseOver,
  style,
  virtualItems,
}) => {
  if (virtualItems !== undefined) {
    return (
      <div className={className} style={style}>
        {virtualItems.map(({ index, measureRef, start }) => {
          const listItem = items[index];
          return (
            <div
              className="o-list-virtual-item"
              key={`virtual-item-${index}`}
              ref={measureRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                minHeight: '20px',
                transform: `translateY(${start}px)`,
              }}
            >
              <ItemComponent
                key={`item-${index}`}
                index={index}
                item={listItem || emptyListItem}
                onClick={onItemClick}
                onMouseOver={onItemMouseOver}
                onMouseOut={onItemMouseOut}
                onMouseEnter={onItemMouseEnter}
                onMouseLeave={onItemMouseLeave}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={className} style={style}>
        {items.map((item: any, index: number) => {
          return (
            <ItemComponent
              key={`item-${index}`}
              index={index}
              item={item || emptyListItem}
              onClick={onItemClick}
              onMouseOver={onItemMouseOver}
              onMouseOut={onItemMouseOut}
              onMouseEnter={onItemMouseEnter}
              onMouseLeave={onItemMouseLeave}
            />
          );
        })}
      </div>
    );
  }
};

export default ListBodyComponent;

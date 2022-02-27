import React from 'react';
import { VirtualListProps } from '../typings';
import ListItemComponent from './ListItemComponent';

const VirtualListComponent: React.FC<VirtualListProps<any, any>> = ({
  items,
  ItemComponent = ListItemComponent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  virtualItems,
}) => {
  return (
    <>
      {virtualItems.map(({ index, measureRef, start }) => {
        const listItem = items[index];
        return (
          <div
            className="o-virtual-item"
            key={`virtual-item-${listItem?.uid || index}`}
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
              key={`item-${listItem?.uid || index}`}
              index={index}
              item={listItem}
              onClick={onItemClick}
              onMouseEnter={onItemMouseEnter}
              onMouseLeave={onItemMouseLeave}
            />
          </div>
        );
      })}
    </>
  );
};

export default VirtualListComponent;

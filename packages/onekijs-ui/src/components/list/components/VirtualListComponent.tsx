import React, { FC, useCallback, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { addClassname } from '../../../utils/style';
import { ListItem, VirtualListProps } from '../typings';
import { adapt } from '../utils';
import ListItemComponent from './ListItemComponent';

const VirtualistComponent: FC<VirtualListProps> = ({
  className,
  data,
  height,
  itemHeight = 21,
  ItemComponent = ListItemComponent,
  adapter,
}) => {
  const parentRef = useRef(null);
  const estimateSize = useCallback(
    (index: number) => {
      if (typeof itemHeight === 'function') {
        return itemHeight(index);
      }
      return itemHeight;
    },
    [itemHeight],
  );
  const { totalSize, virtualItems } = useVirtual({
    size: data.length,
    estimateSize,
    parentRef,
  });
  return (
    <div
      ref={parentRef}
      className={addClassname('o-list', className)}
      style={{
        height: `${height}px`,
        overflow: 'auto',
      }}
    >
      <div
        className="o-list-virtualizer"
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map(({ index, measureRef, start }) => {
          const item = data[index];
          const listItem: ListItem = adapt(item, adapter);
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
                transform: `translateY(${start}px)`,
              }}
            >
              <ItemComponent key={`item-${index}`} index={index} {...listItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualistComponent;

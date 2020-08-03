import React, { FC, useRef, useCallback } from 'react';
import { useVirtual } from 'react-virtual';
import { ListProps } from './typings';
import ListItemComponent from './components/item';
import { defaultItemAdapter } from './utils';
import { addClassname } from '../../utils/style';

const ListComponent: FC<ListProps> = ({
  className,
  items,
  height,
  itemHeight = 21,
  ItemComponent = ListItemComponent,
  adapter = defaultItemAdapter,
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
    size: items.length,
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
          const item = items[index];
          const { id } = adapter(item);
          return (
            <div
              className="o-list-virtual-item"
              key={`virtual-item-${id}`}
              ref={measureRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                //height: `${size}px`,
                transform: `translateY(${start}px)`,
              }}
            >
              <ItemComponent index={index} item={item} adapter={adapter} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListComponent;

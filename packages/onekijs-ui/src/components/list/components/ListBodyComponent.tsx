import React from 'react';
import { addStyle } from '../../../utils/style';
import { ListBodyProps } from '../typings';

const ListBodyComponent: React.FC<ListBodyProps<any, any>> = ({
  bodyRef,
  className,
  height,
  items,
  ItemComponent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  onItemMouseOut,
  onItemMouseOver,
  parentRef,
  style,
  totalSize,
  virtualItems,
}) => {
  const overflow = parentRef && parentRef !== bodyRef ? 'visible' : 'auto';
  if (virtualItems !== undefined) {
    return (
      <div
        ref={bodyRef}
        className={className}
        style={addStyle(
          {
            maxHeight: `${typeof height === 'string' ? height : `${height}px`}`,
            overflow: overflow,
          },
          style,
        )}
      >
        <div
          className="o-virtualizer"
          style={{
            height: `${totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
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
                  onMouseOver={onItemMouseOver}
                  onMouseOut={onItemMouseOut}
                  onMouseEnter={onItemMouseEnter}
                  onMouseLeave={onItemMouseLeave}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        ref={bodyRef}
        className={className}
        style={addStyle(
          {
            maxHeight: `${typeof height === 'string' ? height : `${height}px`}`,
            overflow: 'auto',
          },
          style,
        )}
      >
        {items.map((item: any, index: number) => {
          return (
            <ItemComponent
              key={`item-${index}`}
              index={index}
              item={item}
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

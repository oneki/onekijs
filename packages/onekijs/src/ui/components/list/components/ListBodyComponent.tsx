import React, { RefAttributes } from 'react';
import { addStyle } from '../../../utils/style';
import { ListBodyProps } from '../typings';
import { emptyListItem } from '../utils';

const ListBodyComponent: React.ForwardRefExoticComponent<
  ListBodyProps<any, any> & RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, ListBodyProps<any, any>>(
  (
    {
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
    },
    ref,
  ) => {
    const overflow = parentRef && parentRef !== ref ? 'visible' : 'auto';
    if (virtualItems !== undefined) {
      return (
        <div
          ref={ref}
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
        </div>
      );
    } else {
      return (
        <div
          ref={ref}
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
  },
);

ListBodyComponent.displayName = 'ListBody';

export default ListBodyComponent;

import { CollectionStatus, Item, ItemMeta, LoadingStatus, toCollectionItem } from '@oneki/collection';
import React, { ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { addClassname, addStyle } from '../../../utils/style';
import ListBodyComponent from '../components/ListBodyComponent';
import { ListInternalProps } from '../typings';
import { canFetchMore, getListStatus } from '../utils';

const defaultHeight = '100%';
const defaultItemHeight = 37;
const defaultPreload = 100;
const defaultIncrement = 100;

const useListView: (
  props: ListInternalProps,
) => {
  view: ReactElement;
  scrollToIndex?: (index: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;
} = ({
  className,
  bodyClassName,
  BodyComponent = ListBodyComponent,
  bodyStyle,
  collection,
  footerClassName,
  FooterComponent,
  footerStyle,
  headerClassName,
  HeaderComponent,
  headerStyle,
  height = defaultHeight,
  ItemComponent,
  itemHeight = defaultItemHeight,
  preload = defaultPreload,
  increment = defaultIncrement,
  onItemClick,
  onItemMouseOver,
  onItemMouseOut,
  onItemMouseEnter,
  onItemMouseLeave,
  ref,
  virtual,
  style,
}) => {
  const isVirtual = virtual === undefined ? height !== undefined : virtual;
  const localParentRef = useRef<HTMLDivElement>(null);
  if (ref === undefined) {
    ref = localParentRef;
  }

  const estimatedItemHeight = useCallback(
    (index: number) => {
      if (typeof itemHeight === 'function') {
        return itemHeight(index) || defaultItemHeight;
      }
      return defaultItemHeight;
    },
    [itemHeight],
  );

  const memo = useMemo(() => {
    const result: {
      items: (Item<any, ItemMeta> | undefined)[];
      status: CollectionStatus;
    } = {
      items: [],
      status: getListStatus(collection),
    };

    if (result.status === LoadingStatus.NotInitialized) {
      result.items = Array(preload).fill(toCollectionItem(undefined, collection.getAdapter()));
    } else {
      result.items = collection.items || [];
    }
    return result;
  }, [collection, preload]);

  const { totalSize, virtualItems, scrollToIndex } = useVirtual({
    size: memo.items.length,
    estimateSize: estimatedItemHeight,
    parentRef: ref,
  });

  useEffect(() => {
    if (isVirtual) {
      if (collection.status === LoadingStatus.NotInitialized) {
        collection.load(preload);
      } else if (canFetchMore(collection)) {
        const lastVirtualItem = virtualItems[virtualItems.length - 1];
        const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;
        if (lastVirtualItemIndex >= memo.items.length - preload / 2) {
          collection.load(increment, (collection.items as any[]).length);
        }
      }
    } else if (collection.status === LoadingStatus.NotInitialized) {
      collection.load();
    }
  }, [collection, preload, virtualItems, increment, memo, isVirtual]);

  let view: ReactElement;

  if (isVirtual) {
    view = (
      <div
        ref={ref}
        className={addClassname('o-list', className)}
        style={addStyle(
          {
            maxHeight: `${typeof height === 'string' ? height : `${height}px`}`,
            overflow: 'auto',
          },
          style,
        )}
      >
        {HeaderComponent && (
          <HeaderComponent className={addClassname('o-list-header', headerClassName)} style={headerStyle} />
        )}
        <div
          className="o-list-virtualizer"
          style={{
            height: `${totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <BodyComponent
            className={addClassname('o-list-body', bodyClassName)}
            items={memo.items}
            ItemComponent={ItemComponent}
            onItemClick={onItemClick}
            onItemMouseOver={onItemMouseOver}
            onItemMouseOut={onItemMouseOut}
            onItemMouseEnter={onItemMouseEnter}
            onItemMouseLeave={onItemMouseLeave}
            virtualItems={virtualItems}
            style={bodyStyle}
          />
        </div>
        {FooterComponent && (
          <FooterComponent className={addClassname('o-list-footer', footerClassName)} style={footerStyle} />
        )}
      </div>
    );
    return { view, scrollToIndex };
  } else {
    view = (
      <div ref={ref} className={addClassname('o-list', className)} style={style}>
        {HeaderComponent && (
          <HeaderComponent className={addClassname('o-list-header', headerClassName)} style={headerStyle} />
        )}
        <BodyComponent
          className={addClassname('o-list-body', bodyClassName)}
          items={memo.items}
          ItemComponent={ItemComponent}
          onItemClick={onItemClick}
          onItemMouseOver={onItemMouseOver}
          onItemMouseOut={onItemMouseOut}
          onItemMouseEnter={onItemMouseEnter}
          onItemMouseLeave={onItemMouseLeave}
          style={bodyStyle}
        />
        {FooterComponent && (
          <FooterComponent className={addClassname('o-list-footer', footerClassName)} style={footerStyle} />
        )}
      </div>
    );
    return {
      view,
    };
  }
};

export default useListView;

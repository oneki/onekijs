import { Item, ItemMeta, LoadingStatus } from 'onekijs-framework';
import { RefObject, useCallback, useEffect, useMemo } from 'react';
import { useVirtual } from 'react-virtual';
import { ListInternalProps, VirtualItem } from '../typings';
import { canFetchMore, getListStatus } from '../utils';

const defaultHeight = '100%';
const defaultItemHeight = 37;
const defaultPreload = 100;
const defaultIncrement = 100;
const defaultOverscan = 1;

const useListView: <T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>>(
  props: Pick<
    ListInternalProps<T, M>,
    'collection' | 'height' | 'itemHeight' | 'overscan' | 'preload' | 'increment' | 'virtual'
  > & {
    ref: RefObject<HTMLDivElement>;
  },
) => {
  isVirtual: boolean;
  items: (I | undefined)[];
  scrollToIndex: (index: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;
  totalSize: number;
  virtualItems: VirtualItem[];
} = ({
  collection,
  height = defaultHeight,
  itemHeight = defaultItemHeight,
  overscan = defaultOverscan,
  preload = defaultPreload,
  increment = defaultIncrement,
  ref,
  virtual,
}) => {
  const isVirtual = virtual === undefined ? height !== undefined : virtual;

  const estimatedItemHeight = useCallback(
    (index: number) => {
      if (typeof itemHeight === 'function') {
        return itemHeight(index) || defaultItemHeight;
      }
      return itemHeight;
    },
    [itemHeight],
  );

  const items = useMemo(() => {
    const status = getListStatus(collection);

    if (status === LoadingStatus.NotInitialized) {
      return Array(preload).fill(collection.adapt(undefined));
    } else {
      return collection.items || [];
    }
  }, [collection, preload]);

  const { totalSize, virtualItems, scrollToIndex } = useVirtual({
    size: items.length,
    estimateSize: estimatedItemHeight,
    parentRef: ref,
    overscan: overscan,
  });

  useEffect(() => {
    if (isVirtual) {
      if (collection.status === LoadingStatus.NotInitialized) {
        collection.load(preload);
      } else if (canFetchMore(collection)) {
        const lastVirtualItem = virtualItems[virtualItems.length - 1];
        const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;
        if (lastVirtualItemIndex >= items.length - preload / 2) {
          collection.load(increment, (collection.items as any[]).length);
        }
      }
    } else if (collection.status === LoadingStatus.NotInitialized) {
      collection.load();
    }
  }, [collection, preload, virtualItems, increment, items, isVirtual]);

  return {
    items,
    isVirtual,
    scrollToIndex,
    totalSize,
    virtualItems,
  };
};

export default useListView;

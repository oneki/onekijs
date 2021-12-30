import { Item, LoadingStatus } from 'onekijs-framework';
import { RefObject, useCallback, useEffect } from 'react';
import { useVirtual } from '../../../vendor/reactVirtual';
//import { useVirtual } from 'react-virtual';
import { CollectionListProps, ListCollection, VirtualItem } from '../typings';
import { canFetchMore } from '../utils';

const defaultHeight = '100%';
const defaultItemHeight = 37;
const defaultPreload = 100;
const defaultIncrement = 100;
const defaultOverscan = 1;

const useListView: <T = any, I extends Item<T> = Item<T>>(
  props: Pick<CollectionListProps<T, I>, 'height' | 'itemHeight' | 'overscan' | 'preload' | 'increment' | 'virtual'> & {
    ref: RefObject<HTMLDivElement>;
    dataSource: ListCollection<T, I>;
    scrollToFn?: (offset: number, defaultScrollToFn?: (offset: number) => void) => void;
  },
) => {
  isVirtual: boolean;
  items: (I | undefined)[];
  scrollToIndex: (index: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;
  scrollToOffset: (offsetInPixels: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;
  totalSize: number;
  virtualItems: VirtualItem[];
  measure: () => void;
} = ({
  dataSource,
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

  const state = dataSource.state;

  const { totalSize, virtualItems, scrollToIndex, scrollToOffset, measure } = useVirtual({
    size: state.items?.length || 0,
    estimateSize: estimatedItemHeight,
    parentRef: ref,
    overscan: overscan,
  });

  useEffect(() => {
    if (isVirtual) {
      if (state.status === LoadingStatus.NotInitialized) {
        dataSource.load(preload);
      } else if (canFetchMore(dataSource)) {
        const lastVirtualItem = virtualItems[virtualItems.length - 1];
        const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;
        if (lastVirtualItemIndex >= (state.items?.length || 0) - preload / 2) {
          dataSource.load(increment, ((state.items || []) as any[]).length);
        }
      }
    } else if (dataSource.status === LoadingStatus.NotInitialized) {
      dataSource.load();
    }
  }, [dataSource, state, preload, virtualItems, increment, isVirtual]);

  return {
    items: state.items || [],
    isVirtual,
    scrollToIndex,
    scrollToOffset,
    measure,
    totalSize,
    virtualItems,
  };
};

export default useListView;

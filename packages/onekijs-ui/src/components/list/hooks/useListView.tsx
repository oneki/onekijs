import { Item, LoadingStatus } from 'onekijs-framework';
import { RefObject, useCallback, useEffect, useReducer } from 'react';
import { useVirtual } from '../../../vendor/reactVirtual';
//import { useVirtual } from 'react-virtual';
import { CollectionListProps, ListCollection, VirtualItem } from '../typings';
import { canFetchMore } from '../utils';

const defaultItemHeight = 37;
const defaultPreload = 50;
const defaultIncrement = 50;
const defaultOverscan = 1;

const defaultKeyExtractor = (index: number) => index;

const useListView: <T = any, I extends Item<T> = Item<T>>(
  props: Pick<CollectionListProps<T, I>, 'height' | 'itemHeight' | 'overscan' | 'preload' | 'increment' | 'virtual'> & {
    ref: RefObject<HTMLDivElement>;
    controller: ListCollection<T, I>;
    scrollToFn?: (offset: number, defaultScrollToFn?: (offset: number) => void) => void;
    keyExtractor?: (index: number) => number | string;
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
  controller,
  height,
  itemHeight = defaultItemHeight,
  overscan = defaultOverscan,
  preload = defaultPreload,
  increment = defaultIncrement,
  keyExtractor,
  ref,
  virtual,
}) => {
  const isVirtual = virtual === undefined ? height !== undefined : virtual;
  const [force, forceMeasure] = useReducer((x) => x + 1, 0);

  const estimatedItemHeight = useCallback(
    (index: number) => {
      if (typeof itemHeight === 'function') {
        return itemHeight(index) || defaultItemHeight;
      }
      return itemHeight;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemHeight],
  );

  // Trick for force recalcutate position without losing measurementCache
  // In the react-virtual code, the position are recalculate if the forceExtractor function change
  const forceKeyExtractor = useCallback(
    (index: number) => {
      const fn = keyExtractor || defaultKeyExtractor;
      return fn(index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [keyExtractor, force],
  );

  const state = controller.state;

  const { totalSize, virtualItems, scrollToIndex, scrollToOffset } = useVirtual({
    size: state.items?.length || 0,
    estimateSize: estimatedItemHeight,
    parentRef: ref,
    overscan: overscan,
    keyExtractor: forceKeyExtractor,
  });

  useEffect(() => {
    if (controller.status !== LoadingStatus.NotReady) {
      if (isVirtual) {
        if (controller.status === LoadingStatus.NotInitialized) {
          controller.load(preload);
        } else if (canFetchMore(controller)) {
          const lastVirtualItem = virtualItems[virtualItems.length - 1];
          const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;
          if (lastVirtualItemIndex >= (state.items?.length || 0) - preload / 2) {
            controller.load(increment, ((state.items || []) as any[]).length);
          }
        }
      } else if (controller.status === LoadingStatus.NotInitialized) {
        controller.load();
      }
    }
  }, [controller, state, preload, virtualItems, increment, isVirtual]);

  return {
    items: state.items || [],
    isVirtual,
    scrollToIndex,
    scrollToOffset,
    measure: forceMeasure,
    totalSize,
    virtualItems,
  };
};

export default useListView;

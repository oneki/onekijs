import { Item, LoadingStatus, isItemFetching } from 'onekijs-framework';
import { RefObject, useCallback, useEffect, useReducer } from 'react';
import { useVirtual } from '../../../vendor/reactVirtual';
import { CollectionListProps, ListCollection, VirtualItem } from '../typings';

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
    paddingEnd?: number;
    paddingStart?: number;
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
  paddingEnd,
  paddingStart,
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
    size: state.total ? state.total : state.items?.length || 0,
    estimateSize: estimatedItemHeight,
    parentRef: ref,
    overscan: overscan,
    keyExtractor: forceKeyExtractor,
    paddingEnd,
    paddingStart,
  });

  useEffect(() => {
    if (controller.status !== LoadingStatus.NotReady) {
      if (isVirtual) {
        if (controller.status === LoadingStatus.NotInitialized) {
          controller.load(preload, undefined, true);
        } else {
          const lastVirtualItem = virtualItems[virtualItems.length - 1];
          const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;

          if (state.items) {
            const isVirtualItemFetching = lastVirtualItem ? isItemFetching(state.items[lastVirtualItemIndex]) : false;
            if (isVirtualItemFetching) return;

            // Check the increment windows around the lastVirtualItem and check what we need to load
            // it can be backward or forward or both

            // start with backward
            let from: number | undefined;
            let to: number | undefined;

            const first = Math.max(0, lastVirtualItemIndex - increment);

            if (lastVirtualItemIndex > 0) {
              let slice = state.items.slice(first, lastVirtualItemIndex);
              if (slice.length < lastVirtualItemIndex - first) {
                const arr = new Array(lastVirtualItemIndex - first);
                arr.splice(arr.length - slice.length, slice.length, ...slice);
                slice = arr;
              }

              let notLoadedPreviousIndex: number | undefined = undefined;

              for (let i = slice.length - 1; i >= 0; i--) {
                if (slice[i] === undefined) {
                  notLoadedPreviousIndex = i;
                  break;
                }
              }
              if (notLoadedPreviousIndex !== undefined) {
                from = Math.max(0, lastVirtualItemIndex - slice.length + notLoadedPreviousIndex - increment);
                to = from + increment;
              }
            }

            // check forward
            const end =
              state.total !== undefined
                ? Math.min(state.total, lastVirtualItemIndex + increment + 1)
                : lastVirtualItemIndex + increment + 1;

            if (end > lastVirtualItemIndex) {
              let notLoadedNextIndex: number | undefined = undefined;
              let slice = state.items.slice(lastVirtualItemIndex, end);
              if (slice.length < end - lastVirtualItemIndex) {
                const arr = new Array(end - lastVirtualItemIndex);
                arr.splice(0, slice.length, ...slice);
                slice = arr;
              }
              for (let i = 0; i < slice.length; i++) {
                if (slice[i] === undefined) {
                  notLoadedNextIndex = i;
                  break;
                }
              }

              if (notLoadedNextIndex !== undefined) {
                const offset = state.total
                  ? Math.min(state.total, lastVirtualItemIndex + notLoadedNextIndex)
                  : lastVirtualItemIndex + notLoadedNextIndex;

                if (from === undefined) {
                  from = offset;
                }
                to = offset + increment;
              }

              if (from !== undefined && to !== undefined && to > from) {
                from = Math.max(0, from);
                if (state.total !== undefined) {
                  to = Math.min(state.total, to);
                }
                controller.load(to - from, from, true);
              }
            }
          } else {
            controller.load(Math.max(preload, increment), undefined, true);
          }
          // if (lastVirtualItemIndex >= (state.items?.length || 0) - preload / 2) {
          //   controller.load(increment, ((state.items || []) as any[]).length, true);
          // }
        }
      } else if (controller.status === LoadingStatus.NotInitialized) {
        controller.load(undefined, undefined, true);
      }
    }
  }, [controller, state, preload, virtualItems, increment, isVirtual]);

  controller.scrollToIndex = scrollToIndex;
  controller.scrollToOffset = scrollToOffset;

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

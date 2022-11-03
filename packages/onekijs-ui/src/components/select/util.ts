import { CollectionProxy, isSameFilter, Query, shallowEqual } from 'onekijs-framework';
import { SelectController, SelectItem, SelectState } from './typings';

export const findSelectItem = <
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
>(
  controller: CollectionProxy<T, I, S, C> | C,
  pattern: string,
): I | undefined => {
  let result = undefined;
  if (controller.items === undefined) {
    return undefined;
  }
  for (const item of controller.items) {
    if (item === undefined || item.text === undefined) {
      continue;
    }
    if (item.text.toLowerCase().startsWith(pattern.toLowerCase())) {
      return item;
    }
    if (result === undefined && item.text.toLowerCase().includes(pattern.toLowerCase())) {
      result = item;
    }
  }
  return result;
};

export const findSelectItemIndex = <
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
>(
  controller: CollectionProxy<T, I, S, C> | C,
  item?: I,
): number => {
  if (controller.items === undefined) {
    return -1;
  }
  return controller.items.findIndex((i) => {
    if (i === undefined) {
      return false;
    }
    if (i.id === undefined) {
      return false;
    }
    return i.id === item?.id;
  });
};

export const shouldCheckSelect = (currentQuery: Query, lastCheckQuery?: Query): boolean => {
  if (lastCheckQuery === undefined) return true;
  if (!isSameFilter(currentQuery.filter, lastCheckQuery.filter)) return true;
  if (!shallowEqual(currentQuery.params || null, lastCheckQuery.params || null)) return true;
  return false;
};

export const getGroupText = (item: SelectItem<unknown> | undefined): string | undefined => {
  if (item === undefined) return undefined;
  if (item.group === undefined) return undefined;
  if (typeof item.group === 'string') return item.group;
  return item.group.text;
};

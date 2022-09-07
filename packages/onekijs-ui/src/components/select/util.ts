import { Collection, isSameFilter, Item, Query, shallowEqual } from 'onekijs-framework';
import { SelectItem } from './typings';

export const findSelectItem = (
  controller: Collection<any, SelectItem<any>>,
  pattern: string,
): SelectItem<any> | undefined => {
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

export const findSelectItemIndex = (controller: Collection<any, SelectItem<any>>, item?: Item<any>): number => {
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

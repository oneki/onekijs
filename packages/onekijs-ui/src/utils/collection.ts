import { Collection, Item, ItemAdapter, typeOfCollectionItem, ItemMeta } from '../lib/typings';
import { isNull } from 'onekijs';

export const isCollection = <T, M extends ItemMeta>(data: T[] | Collection<T, M>): data is Collection<T, M> => {
  return !Array.isArray(data);
};

export const toCollectionItem = <T, M>(data?: T, adapter?: ItemAdapter<T, M>): Item<T, M> => {
  const getId = (data: any) => {
    if (isNull(data)) {
      return undefined;
    }
    if (!isNull(data.id)) {
      return String(data.id);
    } else {
      return undefined;
    }
  };
  const getText = (data: any) => {
    if (isNull(data)) {
      return undefined;
    }
    if (!isNull(data.text)) {
      return String(data.text);
    } else {
      return undefined;
    }
  };
  if (adapter) {
    const adaptee = adapter(data);
    return Object.assign({}, adaptee, {
      type: typeOfCollectionItem,
      id: adaptee.id === undefined ? getId(data) : String(adaptee.id),
    });
  }

  return {
    data,
    meta: undefined,
    id: getId(data),
    text: getText(data),
    type: typeOfCollectionItem,
  };
};

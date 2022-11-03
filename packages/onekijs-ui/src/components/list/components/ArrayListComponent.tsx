import React from 'react';
import useListController from '../hooks/useListController';
import { ArrayListProps, ListItem } from '../typings';
import CollectionListComponent from './CollectionListComponent';

const ArrayListComponent = <T = any, I extends ListItem<T> = ListItem<T>>(props: ArrayListProps<T, I>) => {
  const controller = useListController<T, I>(props.dataSource, { adapter: props.adapter, fetchOnce: props.fetchOnce });
  return <CollectionListComponent {...props} controller={controller} />;
};

export default ArrayListComponent;

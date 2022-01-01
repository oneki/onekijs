import React, { FC } from 'react';
import useListController from '../hooks/useListController';
import { ArrayListProps } from '../typings';
import CollectionListComponent from './CollectionListComponent';

const ArrayListComponent: FC<ArrayListProps> = (props) => {
  const controller = useListController(props.dataSource, { adapter: props.adapter, fetchOnce: props.fetchOnce });
  return <CollectionListComponent {...props} controller={controller} />;
};

export default ArrayListComponent;

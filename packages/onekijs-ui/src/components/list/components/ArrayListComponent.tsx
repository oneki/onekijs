import React, { FC } from 'react';
import useListDataSource from '../hooks/useListDataSource';
import { ArrayListProps } from '../typings';
import CollectionListComponent from './CollectionListComponent';

const ArrayListComponent: FC<ArrayListProps> = (props) => {
  const collection = useListDataSource(props.dataSource, { adapter: props.adapter, fetchOnce: props.fetchOnce });
  return <CollectionListComponent {...props} dataSource={collection} />;
};

export default ArrayListComponent;

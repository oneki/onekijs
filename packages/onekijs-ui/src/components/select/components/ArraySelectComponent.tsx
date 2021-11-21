import React, { FC } from 'react';
import useSelectDataSource from '../hooks/useSelectDataSource';
import { ArraySelectProps } from '../typings';
import CollectionSelectComponent from './CollectionSelectComponent';

const ArraySelectComponent: FC<ArraySelectProps> = (props) => {
  const collection = useSelectDataSource(props.dataSource, { adapter: props.adapter });
  return <CollectionSelectComponent {...props} dataSource={collection} />;
};

export default ArraySelectComponent;

import React, { FC } from 'react';
import useSelectController from '../hooks/useSelectController';
import { ArraySelectProps } from '../typings';
import CollectionSelectComponent from './CollectionSelectComponent';

const ArraySelectComponent: FC<ArraySelectProps> = (props) => {
  const controller = useSelectController(props.dataSource, { adapter: props.adapter, fetchOnce: props.fetchOnce });
  return <CollectionSelectComponent {...props} controller={controller} />;
};

export default ArraySelectComponent;

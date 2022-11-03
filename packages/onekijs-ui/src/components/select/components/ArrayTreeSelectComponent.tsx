import React from 'react';
import useTreeSelectController from '../hooks/useTreeSelectController';
import { ArrayTreeSelectProps, TreeSelectItem } from '../typings';
import ControlledTreeSelectComponent from './ControlledTreeSelectComponent';

const ArrayTreeSelectComponent = <T = any, I extends TreeSelectItem<T> = TreeSelectItem<T>>(
  props: ArrayTreeSelectProps<T, I>,
) => {
  const controller = useTreeSelectController<T, I>(props.dataSource, {
    adapter: props.adapter,
    fetchOnce: props.fetchOnce,
  });
  return <ControlledTreeSelectComponent {...props} controller={controller} />;
};

export default ArrayTreeSelectComponent;

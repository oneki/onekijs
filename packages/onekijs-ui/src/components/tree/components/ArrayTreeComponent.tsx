import React from 'react';
import useTreeController from '../hooks/useTreeController';
import { ArrayTreeProps, TreeItem } from '../typings';
import ControllerTreeComponent from './ControllerTreeComponent';

const ArrayTreeComponent = <T = any, I extends TreeItem<T> = TreeItem<T>>(props: ArrayTreeProps<T, I>) => {
  const controller = useTreeController<T, I>(props.dataSource, {
    adapter: props.adapter,
    fetchOnce: props.fetchOnce,
  });
  return <ControllerTreeComponent {...props} controller={controller} />;
};

export default ArrayTreeComponent;

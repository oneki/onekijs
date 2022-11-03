import React from 'react';
import useSelectController from '../hooks/useSelectController';
import { ArraySelectProps, SelectItem } from '../typings';
import ControlledSelectComponent from './ControlledSelectComponent';

const ArraySelectComponent = <T = any, I extends SelectItem<T> = SelectItem<T>>(props: ArraySelectProps<T, I>) => {
  const controller = useSelectController<T, I>(props.dataSource, {
    adapter: props.adapter,
    fetchOnce: props.fetchOnce,
  });
  return <ControlledSelectComponent {...props} controller={controller} />;
};

export default ArraySelectComponent;

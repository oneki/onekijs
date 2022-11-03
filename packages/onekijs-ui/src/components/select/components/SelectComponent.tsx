import { isCollection } from 'onekijs-framework';
import React from 'react';
import { SelectController, SelectItem, SelectProps, SelectState } from '../typings';
import ArraySelectComponent from './ArraySelectComponent';
import ControlledSelectComponent from './ControlledSelectComponent';

const SelectComponent = <
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
>(
  props: SelectProps<T, I, S, C>,
) => {
  const controller = props.controller;
  if (isCollection(controller)) {
    return <ControlledSelectComponent {...props} controller={controller} />;
  } else {
    return <ArraySelectComponent {...props} dataSource={props.dataSource || []} />;
  }
};

SelectComponent.displayName = 'SelectComponent';

export default React.memo(SelectComponent) as typeof SelectComponent;

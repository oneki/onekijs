import { isCollection } from 'onekijs-framework';
import React from 'react';
import { TreeSelectController, TreeSelectItem, TreeSelectProps, TreeSelectState } from '../typings';
import ArrayTreeSelectComponent from './ArrayTreeSelectComponent';
import ControlledTreeSelectComponent from './ControlledTreeSelectComponent';

const TreeSelectComponent = <
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
  C extends TreeSelectController<T, I, S> = TreeSelectController<T, I, S>,
>(
  props: TreeSelectProps<T, I, S, C>,
) => {
  const controller = props.controller;

  if (isCollection(controller)) {
    return <ControlledTreeSelectComponent {...props} controller={controller} />;
  } else {
    return <ArrayTreeSelectComponent {...props} dataSource={props.dataSource || []} />;
  }
};

TreeSelectComponent.displayName = 'TreeSelectComponent';

export default React.memo(TreeSelectComponent) as typeof TreeSelectComponent;

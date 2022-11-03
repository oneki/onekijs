import { isCollection } from 'onekijs-framework';
import React from 'react';
import { TreeSelectController, TreeSelectItem, TreeSelectProps, TreeSelectState } from '../typings';
import ArrayTreeSelectComponent from './ArrayTreeSelectComponent';
import ControlledTreeSelectComponent from './ControlledTreeSelectComponent';
import { TreeSelectOptionContent } from './TreeSelectOptionContent';

const TreeSelectComponent = <
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
  C extends TreeSelectController<T, I, S> = TreeSelectController<T, I, S>,
>(
  props: TreeSelectProps<T, I, S, C>,
) => {
  const controller = props.controller;
  const defaultProps: Partial<TreeSelectProps<T, I, S, C>> = {
    OptionContentComponent: TreeSelectOptionContent,
  };
  if (isCollection(controller)) {
    return <ControlledTreeSelectComponent {...defaultProps} {...props} controller={controller} />;
  } else {
    return <ArrayTreeSelectComponent {...defaultProps} {...props} dataSource={props.dataSource || []} />;
  }
};

TreeSelectComponent.displayName = 'TreeSelectComponent';

export default React.memo(TreeSelectComponent) as typeof TreeSelectComponent;

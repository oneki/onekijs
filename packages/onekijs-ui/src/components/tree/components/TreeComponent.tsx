import { isCollection } from 'onekijs-framework';
import React from 'react';
import { TreeItem, TreeProps } from '../typings';
import ArrayTreeComponent from './ArrayTreeComponent';
import ControllerTreeComponent from './ControllerTreeComponent';

const TreeComponent = <T = any, I extends TreeItem<T> = TreeItem<T>>(props: TreeProps<T, I>) => {
  if (isCollection(props.controller)) {
    return <ControllerTreeComponent {...props} controller={props.controller} />;
  } else {
    return <ArrayTreeComponent {...props} dataSource={props.dataSource || []} />;
  }
};

TreeComponent.displayName = 'TreeComponent';

export default React.memo(TreeComponent) as typeof TreeComponent;

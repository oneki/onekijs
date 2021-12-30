import { isCollection } from 'onekijs-framework';
import React from 'react';
import { TreeProps } from '../typings';
import ArrayTreeComponent from './ArrayTreeComponent';
import ControllerTreeComponent from './ControllerTreeComponent';

const TreeComponent: React.FC<TreeProps> = React.memo((props) => {
  if (isCollection(props.controller)) {
    return <ControllerTreeComponent {...props} controller={props.controller} />;
  } else {
    return <ArrayTreeComponent {...props} dataSource={props.dataSource || []} />;
  }
});

TreeComponent.displayName = 'TreeComponent';

export default TreeComponent;

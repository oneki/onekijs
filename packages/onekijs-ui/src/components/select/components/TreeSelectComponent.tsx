import { isCollection } from 'onekijs-framework';
import React from 'react';
import { TreeSelectProps } from '../typings';
import ArrayTreeSelectComponent from './ArrayTreeSelectComponent';
import ControllerSelectComponent from './ControllerSelectComponent';

const TreeSelectComponent: React.FC<TreeSelectProps> = React.memo((props) => {
  const controller = props.controller;
  if (isCollection(controller)) {
    return <ControllerSelectComponent {...props} controller={controller} />;
  } else {
    return <ArrayTreeSelectComponent {...props} dataSource={props.dataSource || []} />;
  }
});

TreeSelectComponent.displayName = 'TreeSelectComponent';

export default TreeSelectComponent;

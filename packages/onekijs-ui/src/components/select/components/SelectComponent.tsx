import { isCollection } from 'onekijs-framework';
import React from 'react';
import { SelectProps } from '../typings';
import ArraySelectComponent from './ArraySelectComponent';
import CollectionSelectComponent from './CollectionSelectComponent';

const SelectComponent: React.FC<SelectProps> = React.memo((props) => {
  const controller = props.controller;
  if (isCollection(controller)) {
    return <CollectionSelectComponent {...props} controller={controller} />;
  } else {
    return <ArraySelectComponent {...props} dataSource={props.dataSource || []} />;
  }
});

SelectComponent.displayName = 'SelectComponent';

export default SelectComponent;

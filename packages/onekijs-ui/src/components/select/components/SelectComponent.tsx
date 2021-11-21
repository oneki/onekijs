import { isCollection } from 'onekijs-framework';
import React from 'react';
import { SelectProps } from '../typings';
import ArraySelectComponent from './ArraySelectComponent';
import CollectionSelectComponent from './CollectionSelectComponent';

const SelectComponent: React.FC<SelectProps> = React.memo((props) => {
  const dataSource = props.dataSource;
  if (isCollection(dataSource)) {
    return <CollectionSelectComponent {...props} dataSource={dataSource} />;
  } else {
    return <ArraySelectComponent {...props} dataSource={dataSource} />;
  }
});

SelectComponent.displayName = 'SelectComponent';

export default SelectComponent;

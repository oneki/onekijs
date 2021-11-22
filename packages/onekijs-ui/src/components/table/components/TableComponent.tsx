import { isCollection } from 'onekijs-framework';
import React from 'react';
import { TableProps } from '../typings';
import ArrayTableComponent from './ArrayTableComponent';
import ControllerTableComponent from './ControllerTableComponent';

const TableComponent: React.FC<TableProps> = React.memo((props) => {
  if (isCollection(props.controller)) {
    return <ControllerTableComponent {...props} controller={props.controller} />;
  } else {
    return <ArrayTableComponent {...props} dataSource={props.dataSource || []} columns={props.columns || []} />;
  }
});

TableComponent.displayName = 'TableComponent';

export default TableComponent;

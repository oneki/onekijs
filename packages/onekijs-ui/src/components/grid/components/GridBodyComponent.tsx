import ListBodyComponent from 'components/list/components/ListBodyComponent';
import React from 'react';
import { GridBodyProps } from '../typings';

const GridBodyComponent: React.FC<GridBodyProps> = (props) => {
  return <ListBodyComponent {...props} />;
};

export default GridBodyComponent;

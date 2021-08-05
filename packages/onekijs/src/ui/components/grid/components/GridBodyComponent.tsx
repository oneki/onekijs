import React from 'react';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import { GridBodyProps } from '../typings';

const GridBodyComponent: React.FC<GridBodyProps> = (props) => {
  return <ListBodyComponent {...props} />;
};

export default GridBodyComponent;

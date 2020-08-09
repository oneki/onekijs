import { omit } from 'onekijs';
import React, { FC } from 'react';
import { ListProps, StandardListProps } from '../typings';
import StandardListComponent from './StandardListComponent';
import VirtualistComponent from './VirtualListComponent';

const ListComponent: FC<ListProps> = (props) => {
  if (props.height) {
    return <VirtualistComponent {...props} />;
  } else {
    const standardProps: StandardListProps = omit(props, ['itemHeight', 'height', 'preload']);
    return <StandardListComponent {...standardProps} />;
  }
};

export default ListComponent;

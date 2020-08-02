import React, { FC } from 'react';
import { ListProps, StandardListProps } from '../typings';
import VirtualistComponent from './VirtualListComponent';
import StandardListComponent from './StandardListComponent';
import { omit } from 'onekijs';

const ListComponent: FC<ListProps> = (props) => {
  if (props.height) {
    return <VirtualistComponent {...props} height={props.height} />
  } else {
    const standardProps: StandardListProps = omit(props, ['itemHeight', 'height']);
    return <StandardListComponent {...standardProps} />
  }
}

export default ListComponent;

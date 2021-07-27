import useListView from 'components/list/hooks/useListView';
import { ListItemProps } from 'components/list/typings';
import React, { FC } from 'react';
import { GridBodyProps } from '../typings';
import GridBodyRowComponent from './GridBodyRowComponent';

const GridBodyComponent: FC<GridBodyProps> = React.memo((props) => {
  const ItemComponent = props.RowComponent || GridBodyRowComponent;

  const Component = (listItemProps: ListItemProps) => {
    return <ItemComponent {...listItemProps} columns={props.columns} />;
  };

  const { view } = useListView(Object.assign({ className: 'o-grid-body', ItemComponent: Component }, props));

  return <>{view}</>;
});

GridBodyComponent.displayName = 'GridBody';

export default GridBodyComponent;

import useListView from 'components/list/hooks/useListView';
import { ListItemProps } from 'components/list/typings';
import React from 'react';
import { GridBodyProps } from '../typings';
import GridBodyRowComponent from './GridBodyRowComponent';

const GridBodyComponent = React.forwardRef<HTMLDivElement, GridBodyProps>((props, ref) => {
  const ItemComponent = props.RowComponent || GridBodyRowComponent;

  const Component = (listItemProps: ListItemProps) => {
    return <ItemComponent {...listItemProps} columns={props.columns} />;
  };

  const { view } = useListView(
    Object.assign({ className: 'o-grid-body', ItemComponent: Component, parentRef: ref }, props),
  );

  return <>{view}</>;
});

GridBodyComponent.displayName = 'GridBody';

export default GridBodyComponent;

import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import useTreeService from '../hooks/useTreeService';
import { ControllerTreeProps } from '../typings';
import VirtualTreeListComponent from './VirtualTreeListComponent';

const TreeBodyComponent: React.FC<ControllerTreeProps> = ({ className, controller }) => {
  const service = useTreeService();
  const ref = useRef<HTMLDivElement>(null);
  const { items, totalSize, virtualItems, measure } = useListView({
    controller,
    ref,
    overscan: 2,
  });

  return (
    <ListBodyComponent
      className={addClassname('o-tree-body', className)}
      items={items}
      parentRef={ref}
      bodyRef={ref}
      totalSize={totalSize}
      virtualItems={virtualItems}
      service={service}
      state={service.state}
      VirtualListComponent={VirtualTreeListComponent}
      onItemAnimate={measure}
      height={'400px'}
    />
  );
};
TreeBodyComponent.displayName = 'TreeBody';

export default TreeBodyComponent;

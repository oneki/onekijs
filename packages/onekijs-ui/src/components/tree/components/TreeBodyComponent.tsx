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
  const { items, isVirtual, totalSize, virtualItems, measure } = useListView({
    controller,
    ref,
  });

  return (
    <ListBodyComponent
      className={addClassname('o-table-body', className)}
      items={items}
      parentRef={ref}
      bodyRef={ref}
      totalSize={totalSize}
      virtualItems={isVirtual ? virtualItems : undefined}
      service={service}
      state={service.state}
      VirtualListComponent={VirtualTreeListComponent}
      onItemAnimate={measure}
    />
  );
};
TreeBodyComponent.displayName = 'TreeBody';

export default TreeBodyComponent;

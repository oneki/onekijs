import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useTreeService from '../hooks/useTreeService';
import { ControllerTreeProps } from '../typings';
import TreeListComponent from './TreeListComponent';

const TreeBodyComponent: React.FC<ControllerTreeProps> = ({ className, controller }) => {
  const service = useTreeService();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ListBodyComponent
      className={addClassname('o-tree-body', className)}
      items={controller.items}
      ListComponent={TreeListComponent}
      parentRef={ref}
      bodyRef={ref}
      service={service}
      state={service.state}
    />
  );
};
TreeBodyComponent.displayName = 'TreeBody';

export default TreeBodyComponent;

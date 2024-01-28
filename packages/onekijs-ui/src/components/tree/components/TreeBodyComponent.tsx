import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import { useTreeConfig } from '../hooks/useTreeConfig';
import useTreeService from '../hooks/useTreeService';
import { ControllerTreeProps, TreeItem } from '../typings';
import TreeListComponent from './TreeListComponent';

const TreeBodyComponent = <T extends any = any, I extends TreeItem<T> = TreeItem<T>>({
  className,
  controller,
}: ControllerTreeProps<T, I>) => {
  const service = useTreeService();
  const ref = useRef<HTMLDivElement | null>(null);
  const config = useTreeConfig();
  return (
    <ListBodyComponent
      className={addClassname('o-tree-body', className)}
      items={controller.items}
      ListComponent={TreeListComponent}
      parentRef={ref}
      bodyRef={config.listRef || ref}
      service={service}
      state={service.state}
      onItemSelect={config.onSelect}
      onItemActivate={config.onActivate}
      keyboardNavigable={config.keyboardNavigable}
    />
  );
};
TreeBodyComponent.displayName = 'TreeBody';

export default TreeBodyComponent;

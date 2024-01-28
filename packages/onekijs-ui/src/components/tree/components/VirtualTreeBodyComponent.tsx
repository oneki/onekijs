import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { useTreeConfig } from '../hooks/useTreeConfig';
import useTreeService from '../hooks/useTreeService';
import { ControllerTreeProps, TreeItem } from '../typings';
import VirtualTreeListComponent from './VirtualTreeListComponent';

const VirtualTreeBodyComponent = <T extends any = any, I extends TreeItem<T> = TreeItem<T>>({
  className,
  controller,
  height,
}: ControllerTreeProps<T, I>) => {
  const service = useTreeService();
  const ref = useRef<HTMLDivElement | null>(null);
  const config = useTreeConfig();
  const { items, totalSize, virtualItems, scrollToIndex } = useListView({
    controller,
    ref: config.listRef || ref,
    overscan: 20,
  });

  return (
    <ListBodyComponent
      className={addClassname('o-tree-body', className)}
      items={items}
      parentRef={config.listRef || ref}
      bodyRef={config.listRef || ref}
      totalSize={totalSize}
      virtualItems={virtualItems}
      service={service}
      state={service.state}
      VirtualListComponent={VirtualTreeListComponent}
      height={height}
      onItemSelect={config.onSelect}
      onItemActivate={config.onActivate}
      keyboardNavigable={config.keyboardNavigable}
      scrollToIndex={scrollToIndex}
    />
  );
};
VirtualTreeBodyComponent.displayName = 'VirtualTreeBody';

export default VirtualTreeBodyComponent;

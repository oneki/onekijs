import { useLazyRef } from 'onekijs-framework';
import React, { useMemo, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListItemProps } from '../../list/typings';
import { useTreeConfig } from '../hooks/useTreeConfig';
import useTreeService from '../hooks/useTreeService';
import { ControllerTreeProps } from '../typings';
import TreeItemComponent from './TreeItemComponent';
import VirtualTreeListComponent from './VirtualTreeListComponent';

const TreeBodyComponent: React.FC<ControllerTreeProps> = ({ className, controller }) => {
  const ItemComponentRef = useLazyRef<React.FC<ListItemProps<any, any>>>(() => {
    const Component = (props: ListItemProps<any, any>) => {
      const service = useTreeService();
      const collapse = useMemo(() => service.collapse, [service]);
      const expand = useMemo(() => service.expand, [service]);
      const { onCollapse = collapse, onExpand = expand, itemClassName } = useTreeConfig();
      const className = typeof itemClassName === 'function' ? itemClassName(props.item) : itemClassName;
      return <TreeItemComponent {...props} className={className} onCollapse={onCollapse} onExpand={onExpand} />;
    };
    Component.displayName = 'TreeItemComponent';
    return Component;
  });

  const service = useTreeService();
  const ref = useRef<HTMLDivElement>(null);
  const { items, isVirtual, totalSize, virtualItems } = useListView({
    controller,
    ref,
  });

  return (
    <ListBodyComponent
      className={addClassname('o-table-body', className)}
      ItemComponent={ItemComponentRef.current}
      items={items}
      parentRef={ref}
      bodyRef={ref}
      totalSize={totalSize}
      virtualItems={isVirtual ? virtualItems : undefined}
      service={service}
      state={service.state}
      VirtualListComponent={VirtualTreeListComponent}
    />
  );
};
TreeBodyComponent.displayName = 'TreeBody';

export default TreeBodyComponent;

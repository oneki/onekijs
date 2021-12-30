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

const TreeBodyComponent: React.FC<ControllerTreeProps> = ({ className }) => {
  const ItemComponentRef = useLazyRef<React.FC<ListItemProps<any, any>>>(() => {
    const Component = (props: ListItemProps<any, any>) => {
      const service = useTreeService();
      const activate = useMemo(() => service.activate, [service]);
      const collapse = useMemo(() => service.collapse, [service]);
      const expand = useMemo(() => service.expand, [service]);
      const select = useMemo(() => service.select, [service]);
      const {
        onActivate = activate,
        onCollapse = collapse,
        onExpand = expand,
        onSelect = select,
        itemClassName,
      } = useTreeConfig();
      const className = typeof itemClassName === 'function' ? itemClassName(props.item) : itemClassName;
      return (
        <TreeItemComponent
          {...props}
          className={className}
          onActivate={onActivate}
          onCollapse={onCollapse}
          onExpand={onExpand}
          onSelect={onSelect}
        />
      );
    };
    Component.displayName = 'TreeItemComponent';
    return Component;
  });

  const service = useTreeService();
  const ref = useRef<HTMLDivElement>(null);
  const { items, isVirtual, totalSize, virtualItems } = useListView({
    dataSource: service,
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
    />
  );
};
TreeBodyComponent.displayName = 'TreeBody';

export default TreeBodyComponent;

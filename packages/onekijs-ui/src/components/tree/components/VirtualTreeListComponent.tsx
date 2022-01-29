import React from 'react';
import { VirtualItem } from '../../list/typings';
import useTreeService from '../hooks/useTreeService';
import { TreeItem, TreeItemHandler, TreeItemProps, VirtualTreeListProps } from '../typings';

type VirtualTreeItem<T = any, I extends TreeItem<T> = TreeItem<T>> = VirtualItem & {
  item?: I;
  children: VirtualTreeItem<T, I>[];
};

type VirtualTreeListItemProps<T = any, I extends TreeItem<T> = TreeItem<T>> = {
  virtualItem: VirtualTreeItem;
  itemClassName?: string | ((item: I) => string);
  ItemComponent: React.FC<TreeItemProps<T, I>>;
  onClick?: TreeItemHandler<T, I>;
  onMouseEnter?: TreeItemHandler<T, I>;
  onMouseLeave?: TreeItemHandler<T, I>;
};

const VirtualTreeListItemComponent: React.FC<VirtualTreeListItemProps> = ({
  itemClassName,
  ItemComponent,
  virtualItem,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { index, measureRef, start, children, item } = virtualItem;
  const className = typeof itemClassName !== 'function' ? itemClassName : item ? itemClassName(item) : undefined;
  const service = useTreeService();
  const onCollapse: TreeItemHandler = (item) => service.collapse(item, index);
  const onExpand: TreeItemHandler = (item) => service.expand(item, index);
  return (
    <div
      className="o-virtual-item"
      key={`virtual-item-${item?.uid || index}`}
      ref={measureRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '20px',
        transform: `translateY(${start}px)`,
      }}
    >
      <ItemComponent
        key={`item-${item?.uid || index}`}
        className={className}
        index={index}
        item={item}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onExpand={onExpand}
        onCollapse={onCollapse}
      >
        {children.map((child) => {
          return (
            <VirtualTreeListItemComponent
              key={`virtual-item-${child.item?.uid || child.index}`}
              virtualItem={child}
              ItemComponent={ItemComponent}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          );
        })}
      </ItemComponent>
    </div>
  );
};

type NodeItem = {
  parentNode?: NodeItem;
  parentItem: { children: VirtualTreeItem[] };
  child?: VirtualTreeItem;
  level: number;
};

const buildTree = (virtualItems: VirtualItem[], items: (TreeItem | undefined)[]): VirtualTreeItem[] => {
  const rootItem = {
    children: [],
  };
  let node: NodeItem = {
    parentItem: rootItem,
    level: virtualItems && virtualItems.length > 0 ? items[virtualItems[0].index]?.level || 0 : 0,
  };
  virtualItems.forEach((virtualItem) => {
    const item = items[virtualItem.index];
    const itemLevel = item?.level || 0;
    const treeItem = Object.assign(
      {
        children: [],
        item,
      },
      virtualItem,
    );
    if (itemLevel === node.level) {
      node.parentItem.children.push(treeItem);
      node.child = treeItem;
    } else if (itemLevel > node.level) {
      if (node.child) {
        node.child.children.push(treeItem);
        node = {
          parentNode: node,
          parentItem: node.child,
          child: treeItem,
          level: treeItem.item?.level || 0,
        };
      }
    } else {
      let nextParentNode = node.parentNode;
      while (nextParentNode) {
        if (nextParentNode.level === itemLevel) {
          node = nextParentNode;
          break;
        }
        nextParentNode = nextParentNode.parentNode;
      }
      node.parentItem.children.push(treeItem);
    }
  });
  return rootItem.children;
};

const VirtualTreeListComponent: React.FC<VirtualTreeListProps> = ({
  items,
  ItemComponent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  virtualItems,
}) => {
  // convert a flat list into a tree layout
  const virtualTreeItems = buildTree(virtualItems, items);

  return (
    <>
      {virtualTreeItems.map((virtualTreeItem) => {
        return (
          <VirtualTreeListItemComponent
            key={`virtual-item-${virtualTreeItem.item?.uid || virtualTreeItem.index}`}
            virtualItem={virtualTreeItem}
            ItemComponent={ItemComponent}
            onClick={onItemClick}
            onMouseEnter={onItemMouseEnter}
            onMouseLeave={onItemMouseLeave}
          />
        );
      })}
    </>
  );
};

export default VirtualTreeListComponent;

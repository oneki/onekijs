import React from 'react';
import { VirtualItem } from '../../list/typings';
import useTreeService from '../hooks/useTreeService';
import { TreeItem, TreeItemHandler, TreeItemProps, VirtualTreeListProps } from '../typings';

type VirtualTreeItem<T = any, I extends TreeItem<T> = TreeItem<T>> = VirtualItem & {
  item?: I;
  children: VirtualTreeItem<T, I>[];
  offset: number;
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
  const { index, measureRef, start, children, item, offset } = virtualItem;
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
        transform: `translateY(${start - offset}px)`,
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
  offset: number;
};

const buildTree = (virtualItems: VirtualItem[], items: (TreeItem | undefined)[]): VirtualTreeItem[] => {
  // we create a fake rootItem because we need a structure with one root item only
  // the result will be the children of this root item
  const rootItem = {
    children: [],
  };

  // a node is a context per tree level
  // give us the link to the parent level and to the child level
  // the offset is the position of the parent element in the tree because child elements will be placed relatively to this parent element
  let node: NodeItem = {
    parentItem: rootItem,
    level: virtualItems && virtualItems.length > 0 ? items[virtualItems[0].index]?.level || 0 : 0,
    offset: virtualItems && virtualItems.length > 0 ? virtualItems[0].start || 0 : 0,
  };

  // convert a flat list structure to a tree structure. Note that the first element is not necessarly at level=0 because of the "virtual" feature of the tree
  // it's possible that the user has already scrolled down
  virtualItems.forEach((virtualItem) => {
    // the item is the actual data of the element
    const item = items[virtualItem.index];
    // the horizontal position in the tree
    const itemLevel = item?.level || 0;
    // a treeitem is a virtual item with a relation to the item, children of the item and the vertical offset of the parent item
    const treeItem = Object.assign(
      {
        children: [],
        item,
        offset: node.offset,
      },
      virtualItem,
    );

    if (itemLevel === node.level) {
      // this item is a sibling of the previous item
      node.parentItem.children.push(treeItem);
      node.child = treeItem;
    } else if (itemLevel > node.level) {
      // this item is a child of the previous item (saved in node.child)
      if (node.child) {
        node.child.children.push(treeItem);
        node = {
          // change the current context
          parentNode: node,
          parentItem: node.child,
          child: treeItem,
          level: treeItem.item?.level || 0,
          offset: node.child.start,
        };
        treeItem.offset = node.offset;
      }
    } else {
      // this item is the uncle (or xGrand uncle) of the previous item
      // try to find the correct context by finding an ancester nodecommon to the previous item and the current item
      let nextParentNode = node.parentNode;
      while (nextParentNode) {
        if (nextParentNode.level === itemLevel) {
          node = nextParentNode;
          treeItem.offset = node.offset;
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

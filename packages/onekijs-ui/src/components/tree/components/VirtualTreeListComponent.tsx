import { AnonymousObject } from 'onekijs-framework';
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { VirtualItem } from '../../list/typings';
import { useTreeConfig } from '../hooks/useTreeConfig';
import useTreeService from '../hooks/useTreeService';
import { TreeItem, TreeItemHandler, TreeItemProps, VirtualTreeListProps } from '../typings';
import TreeItemComponent from './TreeItemComponent';

const timeout = 200;

type VirtualTreeItem<T = any, I extends TreeItem<T> = TreeItem<T>> = VirtualItem & {
  item?: I;
  children: VirtualTreeItem<T, I>[];
  offset: number;
  animate: boolean;
};

type VirtualTreeListItemProps<T = any, I extends TreeItem<T> = TreeItem<T>> = {
  virtualItem: VirtualTreeItem;
  itemClassName?: string | ((item: I) => string);
  ItemComponent: React.FC<TreeItemProps<T, I>>;
  onAnimate?: TreeItemHandler<T, I>;
  onClick?: TreeItemHandler<T, I>;
  onMouseEnter?: TreeItemHandler<T, I>;
  onMouseLeave?: TreeItemHandler<T, I>;
};

const VirtualTreeListItemComponent: React.FC<VirtualTreeListItemProps> = ({
  itemClassName,
  ItemComponent,
  virtualItem,
  onAnimate,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { index, measureRef, start, children, item, offset } = virtualItem;
  const className = typeof itemClassName !== 'function' ? itemClassName : item ? itemClassName(item) : undefined;
  const service = useTreeService();
  const { onExpand, onCollapse } = useTreeConfig();

  const expandedHeightRef = useRef<number>(0);

  const expand: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    onAnimate && onAnimate(item, index);
    onExpand ? onExpand(item, index) : service.expand(item, index);
  };

  const collapse: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    onAnimate && onAnimate(item, index);
    onCollapse ? onCollapse(item, index) : service.collapse(item, index);
  };

  const onExiting = (node: HTMLElement) => {
    if (onAnimate && true && item) {
      const height = node.getBoundingClientRect().height;
      node.style.height = `${height}px`;
      node.style.height = '0';
      node.style.opacity = '0';
      for (let i = 0; i <= timeout; i += 20) {
        setTimeout(() => onAnimate(item, index), i);
      }
    }
  };

  const onEntering = (node: HTMLElement) => {
    if (onAnimate && true && item) {
      expandedHeightRef.current = node.getBoundingClientRect().height;
      node.style.height = '0px';
      console.log('set node height', node, 0);
      node.style.opacity = '0';
      setTimeout(() => {
        node.style.height = `${expandedHeightRef.current}px`;
        console.log('set node height', node, `${expandedHeightRef.current}px`);
        node.style.opacity = '1';
      }, 0);
      for (let i = 0; i <= timeout; i += 20) {
        setTimeout(() => onAnimate(item, index), i);
      }
    }
  };

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
        onExpand={expand}
        onCollapse={collapse}
      >
        <CSSTransition
          in={item && item.expanded}
          classNames="o-tree-item-children"
          timeout={timeout}
          mountOnEnter={true}
          appear={false}
          unmountOnExit={true}
          onEntering={onEntering}
          onExiting={onExiting}
        >
          <div className="o-tree-item-children">
            {children.map((child) => {
              return (
                <VirtualTreeListItemComponent
                  key={`virtual-item-${child.item?.uid || child.index}`}
                  virtualItem={child}
                  ItemComponent={ItemComponent}
                  onClick={onClick}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onAnimate={onAnimate}
                />
              );
            })}
          </div>
        </CSSTransition>
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

const VirtualTreeListComponent: React.FC<VirtualTreeListProps> = ({
  items,
  onItemAnimate,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  virtualItems,
}) => {
  // we keep a reference of the expanded status of virtualItems
  const expandedStatusRef = useRef<AnonymousObject<boolean>>({});
  const nextExpandedStatus: AnonymousObject<boolean> = {};
  const { ItemComponent = TreeItemComponent } = useTreeConfig();

  // we create a fake rootItem because we need a structure with one root item only
  // the virtualTreeItems will be the children of this root item
  const rootItem: { children: VirtualTreeItem[] } = {
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
    if (item) {
      nextExpandedStatus[item.uid] = !!item.expanded;
    }
    // the horizontal position in the tree
    const itemLevel = item?.level || 0;
    // a treeitem is a virtual item with a relation to the item, children of the item and the vertical offset of the parent item
    const treeItem = Object.assign(
      {
        children: [],
        item,
        offset: node.offset,
        animate:
          !!item &&
          expandedStatusRef.current[item.uid] !== undefined &&
          !!item.expanded !== !!expandedStatusRef.current[item.uid],
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

  expandedStatusRef.current = nextExpandedStatus;

  return (
    <>
      {rootItem.children.map((virtualTreeItem) => {
        return (
          <VirtualTreeListItemComponent
            key={`virtual-item-${virtualTreeItem.item?.uid || virtualTreeItem.index}`}
            virtualItem={virtualTreeItem}
            ItemComponent={ItemComponent}
            onAnimate={onItemAnimate}
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

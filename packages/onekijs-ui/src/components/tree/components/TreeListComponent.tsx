import { AnonymousObject, useGlobalProp } from 'onekijs-framework';
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTreeConfig } from '../hooks/useTreeConfig';
import useTreeService from '../hooks/useTreeService';
import { TreeItem, TreeItemHandler, TreeItemProps, VirtualTreeListProps } from '../typings';
import TreeItemComponent from './TreeItemComponent';

const timeout = 150;

type TreeListItemProps<T = any, I extends TreeItem<T> = TreeItem<T>> = {
  item: I;
  index: number;
  itemClassName?: string | ((item: I) => string);
  ItemComponent: React.FC<TreeItemProps<T, I>>;
  onClick?: TreeItemHandler<T, I>;
  onMouseEnter?: TreeItemHandler<T, I>;
  onMouseLeave?: TreeItemHandler<T, I>;
  defer?: () => void;
};

const TreeListItemComponent: React.FC<TreeListItemProps> = ({
  index,
  item,
  itemClassName,
  ItemComponent,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const className = typeof itemClassName !== 'function' ? itemClassName : item ? itemClassName(item) : undefined;
  const service = useTreeService();

  const expand: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    service.expanding(item, index);
  };

  const collapse: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    service.collapsing(item, index);
  };

  const onEntering = (node: HTMLElement) => {
    if (item?.expanding) {
      const currentHeight = node.getBoundingClientRect().height;
      node.style.height = '0px';
      setTimeout(() => {
        node.style.height = `${currentHeight}px`;
      }, 0);
    }
  };

  const onEntered = (node: HTMLElement) => {
    node.style.height = '';
    if (item && item.expanding) {
      service.expanded(item, index);
    }
  };

  const onExiting = (node: HTMLElement) => {
    node.style.height = `${node.getBoundingClientRect().height}px`;
    setTimeout(() => {
      node.style.height = '0px';
    }, 0);
  };

  const onExited = () => {
    if (item) {
      service.collpased(item, index);
    }
  };

  const expanded = !!(item && item.expanded && !item.collapsing);
  const children = item?.children || [];

  return (
    <div>
      <div className="o-virtual-item" key={`virtual-item-${item?.uid || index}`}>
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
        />
      </div>
      <CSSTransition
        in={expanded}
        classNames="o-tree-item-children"
        timeout={timeout}
        mountOnEnter={false}
        appear={false}
        unmountOnExit={true}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div
          className={`o-tree-item-children${item?.expanding ? ' o-tree-item-children-expanding' : ''}${
            item?.collapsing ? ' o-tree-item-children-collapsing' : ''
          }`}
        >
          {children.map((child, childIndex) => {
            const childItem = service.getItem(child);
            return (
              <TreeListItemComponent
                key={`virtual-item-${childItem?.uid || childIndex}`}
                index={childIndex}
                item={childItem as TreeItem}
                ItemComponent={ItemComponent}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
};

const VirtualTreeListComponent: React.FC<VirtualTreeListProps> = ({
  items,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  virtualItems,
}) => {
  const debug = useGlobalProp<boolean>('debug');
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
        animate:
          !!item &&
          (!item.expanded ||
            (expandedStatusRef.current[item.uid] !== undefined &&
              !!item.expanded !== !!expandedStatusRef.current[item.uid])),
      },
      virtualItem,
    );

    if (itemLevel === node.level) {
      // this item is a sibling of the previous item
      if (debug) console.log('current node equal level', Object.assign({}, node), 'item', item);
      node.parentItem.children.push(treeItem);
      node.childItem = treeItem;
      if (debug) console.log('next node equal level', Object.assign({}, node), 'item', item);
    } else if (itemLevel > node.level) {
      if (debug) console.log('current node greater level', Object.assign({}, node), 'item', item);
      // this item is a child of the previous item (saved in node.child)
      if (node.childItem) {
        node.childItem.children.push(treeItem);
        node = {
          // change the current context
          parentNode: node,
          parentItem: node.childItem,
          childItem: treeItem,
          level: treeItem.item?.level || 0,
        };
      }
      if (debug) console.log('next node greater level', Object.assign({}, node), 'item', item);
    } else {
      if (debug) console.log('current node lower level', Object.assign({}, node), 'item', item);
      // this item is the uncle (or xGrand uncle) of the previous item
      // try to find the correct context by finding an ancester nodecommon to the previous item and the current item
      let nextParentNode = node.parentNode;
      while (nextParentNode) {
        if (nextParentNode.level === itemLevel) {
          node = nextParentNode;
          break;
        }
        nextParentNode = nextParentNode.parentNode;
      }
      node.parentItem.children.push(treeItem);
      node.childItem = treeItem;
      node.level = Math.min(itemLevel, node.level);
      if (debug) console.log('next node lower level', Object.assign({}, node), 'item', item);
    }
  });

  const printNode = (nodes: VirtualTreeItem[], level = 0, parentNode: VirtualTreeItem | undefined = undefined) => {
    nodes.forEach((node) => {
      console.log(`${'  '.repeat(level || 0)}${node.item?.text}`);
      console.log('parentNode =', Object.assign({}, parentNode));
      printNode(node.children, level + 1, node);
    });
  };
  if (debug) {
    console.log('-----------------');
    printNode(rootItem.children);
  }

  expandedStatusRef.current = nextExpandedStatus;
  return (
    <div style={{ position: 'absolute', top: rootItem.children[0]?.start }}>
      {rootItem.children.map((virtualTreeItem) => {
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
    </div>
  );
};

export default VirtualTreeListComponent;

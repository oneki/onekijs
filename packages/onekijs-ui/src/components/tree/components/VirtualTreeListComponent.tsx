import { AnonymousObject, LoadingStatus, useLogger } from 'onekijs-framework';
import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import useIsomorphicLayoutEffect from '../../../vendor/useIsomorphicLayoutEffect';
import LoadingItem from '../../list/components/LoadingItem';
import { VirtualItem } from '../../list/typings';
import { useTreeConfig } from '../hooks/useTreeConfig';
import useTreeService from '../hooks/useTreeService';
import { TreeItem, TreeItemHandler, TreeItemProps, VirtualTreeListProps } from '../typings';
import TreeItemComponent from './TreeItemComponent';

const timeout = 200;

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
  defer?: () => void;
};

const VirtualTreeListItemComponent: React.FC<VirtualTreeListItemProps> = ({
  itemClassName,
  ItemComponent,
  virtualItem,
  onClick,
  onMouseEnter,
  onMouseLeave,
  defer,
}) => {
  const { index, measureRef, children, item } = virtualItem;
  const className = typeof itemClassName !== 'function' ? itemClassName : item ? itemClassName(item) : undefined;
  const service = useTreeService();

  const deferRenderRef = useRef(false);
  deferRenderRef.current = false;

  const deferRender = () => {
    if (item?.expanding) {
      deferRenderRef.current = true;
    } else if (defer) {
      defer();
    }
  };

  const expand: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    service.expanding(item, index);
  };

  const collapse: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    service.collapsing(item, index);
  };

  const onExiting = (node: HTMLElement) => {
    if (childrenAnimateRef.current) {
      childrenAnimateRef.current.style.height = `${node.getBoundingClientRect().height}px`;
    }
    setTimeout(() => {
      if (childrenAnimateRef.current) {
        childrenAnimateRef.current.style.height = '0px';
      }
    }, 0);
  };

  const onExited = () => {
    if (item) {
      service.collpased(item, index);
    }
  };

  const ref = !item?.collapsing ? measureRef : undefined;
  const childrenAnimateRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (itemRef.current && defer) {
      const height = itemRef.current.getBoundingClientRect().height;
      if (height !== virtualItem.size) {
        defer();
      }
    }
  });

  const expanded = !!(item && item.expanded && !item.collapsing);

  useEffect(() => {
    if (!deferRenderRef.current && childrenRef.current && childrenAnimateRef.current && item?.expanding) {
      const currentHeight = childrenRef.current.getBoundingClientRect().height;
      childrenAnimateRef.current.style.height = '0px';
      childrenAnimateRef.current.style.transitionDuration = `${timeout}ms`;
      childrenAnimateRef.current.style.transitionTimingFunction = expanded ? 'ease-out' : 'ease-in';
      setTimeout(() => {
        if (childrenAnimateRef.current) childrenAnimateRef.current.style.height = `${currentHeight}px`;
      }, 0);
      setTimeout(() => {
        if (item) {
          service.expanded(item, index);
        }
      }, timeout);
    }
    if (childrenRef.current && childrenAnimateRef.current && !item?.expanding && item?.expanded && !item.collapsing) {
      childrenAnimateRef.current.style.height = '';
    }
  });

  return (
    <div ref={itemRef}>
      <div className="o-virtual-item" key={`virtual-item-${item?.uid || index}`} ref={ref}>
        {item?.loadingStatus === LoadingStatus.Loading && <LoadingItem />}
        {item?.loadingStatus !== LoadingStatus.Loading && item && item.data && (
          <ItemComponent
            key={`item-${item?.uid || index}`}
            className={className}
            index={index}
            item={item}
            data={item.data}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onExpand={expand}
            onCollapse={collapse}
          />
        )}
      </div>
      <CSSTransition
        in={expanded}
        classNames="o-tree-item-children"
        timeout={timeout}
        mountOnEnter={false}
        appear={false}
        unmountOnExit={true}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div
          ref={childrenAnimateRef}
          className={`o-tree-item-children${item?.expanding ? ' o-tree-item-children-expanding' : ''}${
            item?.collapsing ? ' o-tree-item-children-collapsing' : ''
          }`}
        >
          <div ref={childrenRef}>
            {children.map((child) => {
              return (
                <VirtualTreeListItemComponent
                  key={`virtual-item-${child.item?.uid || child.index}`}
                  virtualItem={child}
                  ItemComponent={ItemComponent}
                  onClick={onClick}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  defer={deferRender}
                />
              );
            })}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

type NodeItem = {
  parentNode?: NodeItem;
  parentItem: { children: VirtualTreeItem[] };
  childItem?: VirtualTreeItem;
  level: number;
};

const VirtualTreeListComponent: React.FC<VirtualTreeListProps> = ({
  items,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  virtualItems,
}) => {
  const logger = useLogger();
  logger.debug('virtualItems', virtualItems);
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
      logger.debug('current node equal level', Object.assign({}, node), 'item', item);
      node.parentItem.children.push(treeItem);
      node.childItem = treeItem;
      logger.debug('next node equal level', Object.assign({}, node), 'item', item);
    } else if (itemLevel > node.level) {
      logger.debug('current node greater level', Object.assign({}, node), 'item', item);
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
      logger.debug('next node greater level', Object.assign({}, node), 'item', item);
    } else {
      logger.debug('current node lower level', Object.assign({}, node), 'item', item);
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
      logger.debug('next node lower level', Object.assign({}, node), 'item', item);
    }
  });

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

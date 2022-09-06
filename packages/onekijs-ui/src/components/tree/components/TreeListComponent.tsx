import { AnonymousObject } from 'onekijs-framework';
import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTreeConfig } from '../hooks/useTreeConfig';
import useTreeService from '../hooks/useTreeService';
import { TreeController, TreeItem, TreeItemHandler, TreeItemProps, TreeListProps, TreeState } from '../typings';
import TreeItemComponent from './TreeItemComponent';

const getChildrenSize = (
  item: TreeItem<any> | undefined,
  service: TreeController<any, TreeItem<any>, TreeState<any, TreeItem<any>>>,
): number => {
  if (item === undefined || item.children === undefined) return 0;
  return item.children.reduce((accumulator, childUid) => {
    const child = service.getItem(childUid);
    const expanded = !!(child && child.expanded && !child.collapsing);
    return accumulator + 1 + (expanded ? getChildrenSize(child, service) : 0);
  }, 0);
};

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
  const { animate } = useTreeConfig();

  const childrenAnimateRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const expand: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    if (animate) {
      service.expanding(item, index);
    } else {
      service.expand(item, index);
    }
  };

  const collapse: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    if (animate) {
      service.collapsing(item, index);
    } else {
      service.collapse(item, index);
    }
  };

  const timeout = animate ? Math.min(500, 100 + getChildrenSize(item, service) * 4) : 0;

  useEffect(() => {
    if (animate) {
      if (childrenRef.current && childrenAnimateRef.current && item.expanding) {
        const currentHeight = childrenRef.current.getBoundingClientRect().height;
        childrenAnimateRef.current.style.height = '0px';
        setTimeout(() => {
          if (childrenAnimateRef.current) childrenAnimateRef.current.style.height = `${currentHeight}px`;
        }, 0);
        setTimeout(() => {
          if (item) {
            service.expanded(item, index);
          }
        }, timeout);
      }
      if (childrenRef.current && childrenAnimateRef.current && !item.expanding && item.expanded && !item.collapsing) {
        childrenAnimateRef.current.style.height = '';
      }
    }
  });

  const onExiting = (node: HTMLElement) => {
    if (animate) {
      node.style.height = `${node.getBoundingClientRect().height}px`;
      node.style.transitionDuration = `${timeout}ms`;
      node.style.transitionTimingFunction = 'ease-out';
      setTimeout(() => {
        node.style.height = '0px';
      }, 0);
    }
  };

  const onExited = () => {
    if (item) {
      service.collpased(item, index);
    }
  };

  const expanded = !!(item && item.expanded && !item.collapsing);

  const onEntering = (node: HTMLElement) => {
    if (animate) {
      node.style.transitionDuration = `${timeout}ms`;
      node.style.transitionTimingFunction = 'ease-in';
    }
  };

  const children = item?.children || [];

  return (
    <div ref={itemRef}>
      <div className="o-tree-item-container" key={`tree-item-container-${item?.uid || index}`}>
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
      </div>
      <CSSTransition
        in={expanded}
        classNames="o-tree-item-animate"
        timeout={timeout}
        mountOnEnter={true}
        appear={false}
        unmountOnExit={true}
        onEntering={onEntering}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div
          ref={childrenAnimateRef}
          className={`o-tree-item-animate${item?.expanding ? ' o-tree-item-animate-expanding' : ''}${
            item?.collapsing ? ' o-tree-item-animate-collapsing' : ''
          }`}
        >
          <div className="o-tree-item-children" ref={childrenRef}>
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
        </div>
      </CSSTransition>
    </div>
  );
};

const TreeListComponent: React.FC<TreeListProps> = ({ items, onItemClick, onItemMouseEnter, onItemMouseLeave }) => {
  // we keep a reference of the expanded status of items
  const expandedStatusRef = useRef<AnonymousObject<boolean>>({});
  const nextExpandedStatus: AnonymousObject<boolean> = {};

  expandedStatusRef.current = nextExpandedStatus;

  const rootItems = items.filter((item) => item && item.level === 0) as TreeItem[];

  return (
    <div>
      {rootItems.map((rooItem, index) => {
        return (
          <TreeListItemComponent
            key={`tree-item-${rooItem?.uid || index}`}
            item={rooItem}
            index={index}
            ItemComponent={TreeItemComponent}
            onClick={onItemClick}
            onMouseEnter={onItemMouseEnter}
            onMouseLeave={onItemMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default TreeListComponent;

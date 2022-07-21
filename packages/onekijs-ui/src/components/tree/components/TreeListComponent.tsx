import { AnonymousObject } from 'onekijs-framework';
import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTreeConfig } from '../hooks/useTreeConfig';
import useTreeService from '../hooks/useTreeService';
import { TreeItem, TreeItemHandler, TreeItemProps, TreeListProps } from '../typings';
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

  const childrenAnimateRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const expand: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    service.expanding(item, index);
  };

  const collapse: TreeItemHandler<any, TreeItem<any>> = (item, index) => {
    service.collapsing(item, index);
  };

  useEffect(() => {
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
  });

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
    <div ref={itemRef}>
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
  const { ItemComponent = TreeItemComponent } = useTreeConfig();

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

export default TreeListComponent;

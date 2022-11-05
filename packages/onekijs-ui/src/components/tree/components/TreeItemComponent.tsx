import { AnonymousObject, isItemLoading } from 'onekijs-framework';
import React, { CSSProperties, MouseEventHandler, ReactNode, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import FileIcon from '../../icon/FileIcon';
import FolderIcon from '../../icon/FolderIcon';
import LoadingIcon from '../../icon/LoadingIcon';
import TogglerIcon from '../../icon/TogglerIcon';
import { ListItemProps } from '../../list/typings';
import { useTreeConfig } from '../hooks/useTreeConfig';
import { useTreeItemContext } from '../hooks/useTreeItemContext';
import useTreeService from '../hooks/useTreeService';
import { TreeItem, TreeItemProps, TreeItemToggleProps } from '../typings';
import { isTreeItemExpanded } from '../util';

export const TreeItemToggler = <T = any, I extends TreeItem<T> = TreeItem<T>>({
  item,
  onExpand,
  onCollapse,
  index,
}: TreeItemToggleProps<T, I>) => {
  const service = useTreeService<T, I>();

  if (item === undefined) return null;

  const isFolder = item.type !== 'leaf' && (item.children === undefined || item.children.length > 0);
  const expanded = isTreeItemExpanded(item, service);
  const handler = expanded ? onCollapse : onExpand;

  if (isItemLoading(item)) {
    return <LoadingIcon />;
  }

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    handler(item, index);
    e.preventDefault();
    e.stopPropagation();
  };

  return <TogglerIcon onClick={onClick} open={expanded} visible={isFolder} />;
};

export const TreeItemContent = <T = any, I extends TreeItem<T> = TreeItem<T>>(props: TreeItemProps<T, I>) => {
  const { item, onClick: doClick, index } = props;
  const { TreeIconComponent } = useTreeConfig<T, I>();

  if (item === undefined) return null;

  const isFolder = item.type !== 'leaf' && (item.children === undefined || item.children.length > 0);
  let iconElement: ReactNode = null;
  if (TreeIconComponent) {
    iconElement = <TreeIconComponent {...props} />;
  } else {
    iconElement = item.icon;
  }

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (doClick) {
      const result = doClick(item, index);
      if (result === false) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  return (
    <div className="o-tree-item-content" onClick={onClick}>
      {isFolder ? <FolderIcon /> : <FileIcon />}
      {iconElement && <span className="o-tree-item-icon">{iconElement}</span>}
      <span className="o-tree-item-text">{item.text || ''}</span>
    </div>
  );
};

const TreeItemComponent = <T = any, I extends TreeItem<T> = TreeItem<T>>(props: ListItemProps<T, I>) => {
  const {
    TreeItemContentComponent = TreeItemContent,
    TreeTogglerComponent = TreeItemToggler,
    gap = 20,
    paddingLeft = 0,
    paddingRight = 0,
  } = useTreeConfig<T, I>();
  const { item, index, onClick } = props;
  const { className, onExpand, onCollapse } = useTreeItemContext<T, I>();
  const ref = useRef<AnonymousObject>({});
  ref.current.item = item;
  let itemClassName = addClassname('o-tree-item', className);
  if (item?.selected) {
    itemClassName = addClassname('o-tree-item-selected', itemClassName);
  }
  if (item?.active) {
    itemClassName = addClassname('o-tree-item-active', itemClassName);
  }
  if (item?.visible === false) {
    itemClassName = addClassname('o-tree-item-hide', itemClassName);
  }

  if (item === undefined) {
    return <div className={itemClassName}></div>;
  }

  const style: CSSProperties = {
    paddingLeft: `${item.level * gap + paddingLeft}px`,
  };

  if (paddingRight > 0) {
    style.paddingRight = `${paddingRight}px`;
  }

  return (
    <>
      <div className={itemClassName} style={style}>
        <TreeTogglerComponent item={item} onExpand={onExpand} onCollapse={onCollapse} index={index} />
        <TreeItemContentComponent {...props} onClick={onClick} />
      </div>
    </>
  );
};

TreeItemComponent.displayName = 'TreeItemComponent';

export default React.memo(TreeItemComponent) as typeof TreeItemComponent;

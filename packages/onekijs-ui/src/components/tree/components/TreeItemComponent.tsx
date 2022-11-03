import { AnonymousObject, isItemLoading } from 'onekijs-framework';
import React, { CSSProperties, ReactNode, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import FileIcon from '../../icon/FileIcon';
import FolderIcon from '../../icon/FolderIcon';
import LoadingIcon from '../../icon/LoadingIcon';
import TogglerIcon from '../../icon/TogglerIcon';
import { useTreeConfig } from '../hooks/useTreeConfig';
import { useTreeItemContext } from '../hooks/useTreeItemContext';
import { TreeItem, TreeItemProps, TreeItemToggleProps } from '../typings';

export const TreeItemToggler = <T = any, I extends TreeItem<T> = TreeItem<T>>({
  item,
  onExpand,
  onCollapse,
  index,
}: TreeItemToggleProps<T, I>) => {
  if (item === undefined) return null;

  const isFolder = item.type !== 'leaf' && (item.children === undefined || item.children.length > 0);

  const handler = item.expanded && !item.collapsing ? onCollapse : onExpand;

  if (isItemLoading(item)) {
    return <LoadingIcon />;
  }

  return (
    <TogglerIcon
      onClick={() => item && handler && handler(item, index)}
      open={item.expanded && !item.collapsing}
      visible={isFolder}
    />
  );
};

export const TreeItemContent = <T = any, I extends TreeItem<T> = TreeItem<T>>(props: TreeItemProps<T, I>) => {
  const { item } = props;
  const { TreeIconComponent } = useTreeConfig<T, I>();

  if (item === undefined) return null;

  const isFolder = item.type !== 'leaf' && (item.children === undefined || item.children.length > 0);
  let iconElement: ReactNode = null;
  if (TreeIconComponent) {
    iconElement = <TreeIconComponent {...props} />;
  } else {
    iconElement = item.icon;
  }

  return (
    <>
      {isFolder ? <FolderIcon /> : <FileIcon />}
      {iconElement && <span className="o-tree-item-icon">{iconElement}</span>}
      <span className="o-tree-item-text">{item.text || ''}</span>
    </>
  );
};

const TreeItemComponent = <T = any, I extends TreeItem<T> = TreeItem<T>>(props: TreeItemProps<T, I>) => {
  const {
    TreeItemComponent = TreeItemContent,
    TreeTogglerComponent = TreeItemToggler,
    gap = 20,
    paddingLeft = 0,
    paddingRight = 0,
  } = useTreeConfig<T, I>();
  const { item, index } = props;
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
        <TreeItemComponent {...props} />
      </div>
    </>
  );
};

TreeItemComponent.displayName = 'TreeItemComponent';

export default React.memo(TreeItemComponent) as typeof TreeItemComponent;

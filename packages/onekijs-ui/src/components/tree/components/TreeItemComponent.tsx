import { AnonymousObject, isItemLoading } from 'onekijs-framework';
import React, { CSSProperties, FC, ReactNode, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import FileIcon from '../../icon/FileIcon';
import FolderIcon from '../../icon/FolderIcon';
import LoadingIcon from '../../icon/LoadingIcon';
import TogglerIcon from '../../icon/TogglerIcon';
import { useTreeConfig } from '../hooks/useTreeConfig';
import { TreeItemProps, TreeItemToggleProps } from '../typings';

export const TreeItemToggler: React.FC<TreeItemToggleProps> = ({ item, onExpand, onCollapse, index }) => {
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

export const TreeItemContent: React.FC<TreeItemProps> = (props) => {
  const { item } = props;
  const { IconComponent } = useTreeConfig();

  if (item === undefined) return null;

  const isFolder = item.type !== 'leaf' && (item.children === undefined || item.children.length > 0);
  let iconElement: ReactNode = null;
  if (IconComponent) {
    iconElement = <IconComponent {...props} />;
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

const TreeItemComponent: FC<TreeItemProps> = React.memo((props) => {
  const {
    ItemComponent = TreeItemContent,
    TogglerComponent = TreeItemToggler,
    gap = 20,
    paddingLeft = 0,
    paddingRight = 0,
  } = useTreeConfig();
  const { className, item, onExpand, onCollapse, index } = props;
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
        <TogglerComponent item={item} onExpand={onExpand} onCollapse={onCollapse} index={index} />
        <ItemComponent {...props} />
      </div>
    </>
  );
});

TreeItemComponent.displayName = 'TreeItemComponent';

export default TreeItemComponent;

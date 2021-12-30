import { AnonymousObject } from 'onekijs-framework';
import React, { FC, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import FolderIcon from '../../icon/FolderIcon';
import TogglerIcon from '../../icon/TogglerIcon';
import { TreeItemProps, TreeItemToggleProps } from '../typings';

const Toggler: React.FC<TreeItemToggleProps> = ({ item, onExpand, onCollapse }) => {
  if (item === undefined) return null;

  const isFolder = item.type !== 'leaf' && (item.children === undefined || item.children.length > 0);

  const handler = item.expanded ? onCollapse : onExpand;

  return <div>{<TogglerIcon onClick={() => handler(item)} open={item.expanded} visible={isFolder} />}</div>;
};

const TreeItemComponent: FC<TreeItemProps> = React.memo(({ className, item, onExpand, onCollapse }) => {
  const ref = useRef<AnonymousObject>({});
  ref.current.item = item;
  const itemClassName = addClassname('o-tree-item', className);
  if (item === undefined) {
    return <div className={itemClassName}></div>;
  }

  const style = {
    paddingLeft: `${item.level * 20}px`,
  };

  return (
    <div className={itemClassName} style={style}>
      <Toggler item={item} onExpand={onExpand} onCollapse={onCollapse} />
      <FolderIcon />
      <span className="o-tree-item-text">{item.text || ''}</span>
    </div>
  );
});

TreeItemComponent.displayName = 'TreeItemComponent';

export default TreeItemComponent;

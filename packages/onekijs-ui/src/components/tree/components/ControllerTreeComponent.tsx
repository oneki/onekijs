import React, { useMemo } from 'react';
import { TreeConfigContext } from '../hooks/useTreeConfig';
import { TreeServiceContext } from '../hooks/useTreeService';
import { TreeStateContext } from '../hooks/useTreeState';
import { ControllerTreeProps, TreeConfig, TreeItem } from '../typings';
import TreeBodyComponent from './TreeBodyComponent';
import VirtualTreeBodyComponent from './VirtualTreeBodyComponent';

const ControllerTreeComponent = <T = any, I extends TreeItem<T> = TreeItem<T>>({
  controller,
  className,
  onActivate,
  onSelect,
  height,
  virtual,
  gap,
  TreeIconComponent,
  TreeItemComponent,
  TreeItemContentComponent,
  treeItemClassName,
  TreeTogglerComponent,
  paddingLeft,
  paddingRight,
  animate = true,
  keyboardNavigable,
  listRef,
}: ControllerTreeProps<T, I>) => {
  const config: TreeConfig<T, I> = useMemo(() => {
    return {
      className,
      onActivate,
      animate,
      onSelect,
      height,
      virtual,
      gap,
      TreeIconComponent,
      TreeItemComponent,
      TreeItemContentComponent,
      treeItemClassName,
      TreeTogglerComponent,
      paddingLeft,
      paddingRight,
      keyboardNavigable,
      listRef,
    };
  }, [
    className,
    onActivate,
    animate,
    onSelect,
    height,
    virtual,
    gap,
    TreeIconComponent,
    TreeItemComponent,
    TreeItemContentComponent,
    treeItemClassName,
    TreeTogglerComponent,
    paddingLeft,
    paddingRight,
    keyboardNavigable,
    listRef,
  ]);

  const BodyComponent = height || virtual ? VirtualTreeBodyComponent : TreeBodyComponent;

  return (
    <TreeServiceContext.Provider value={controller.asService()}>
      <TreeStateContext.Provider value={controller.state}>
        <TreeConfigContext.Provider value={config}>
          <BodyComponent {...config} controller={controller} />
        </TreeConfigContext.Provider>
      </TreeStateContext.Provider>
    </TreeServiceContext.Provider>
  );
};

ControllerTreeComponent.displayName = 'Tree';

export default ControllerTreeComponent;

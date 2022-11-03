import { useMemo } from 'react';
import { TreeConfigContext } from '../../tree/hooks/useTreeConfig';
import { TreeServiceContext } from '../../tree/hooks/useTreeService';
import { TreeStateContext } from '../../tree/hooks/useTreeState';
import { TreeConfig } from '../../tree/typings';
import { ControllerTreeSelectProps, TreeSelectController, TreeSelectItem, TreeSelectState } from '../typings';
import React from 'react';
import { ControlledSelectComponent } from '../../..';

const ControlledTreeSelectComponent = <
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
  C extends TreeSelectController<T, I, S> = TreeSelectController<T, I, S>,
>(
  props: ControllerTreeSelectProps<T, I, S, C>,
) => {
  const config: TreeConfig<T, I> = useMemo(() => {
    return {
      className: props.className,
      onActivate: props.onActivate,
      animate: props.animate,
      onSelect: props.onSelect,
      height: props.height,
      virtual: props.virtual,
      gap: props.gap,
      TreeIconComponent: props.TreeIconComponent,
      TreeItemComponent: props.TreeItemComponent,
      treeItemClassName: props.treeItemClassName,
      TreeTogglerComponent: props.TreeTogglerComponent,
      paddingLeft: props.paddingLeft,
      paddingRight: props.paddingRight,
    };
  }, [
    props.className,
    props.onActivate,
    props.animate,
    props.onSelect,
    props.height,
    props.virtual,
    props.gap,
    props.TreeIconComponent,
    props.TreeItemComponent,
    props.treeItemClassName,
    props.TreeTogglerComponent,
    props.paddingLeft,
    props.paddingRight,
  ]);

  return (
    <TreeServiceContext.Provider value={props.controller.asService()}>
      <TreeStateContext.Provider value={props.controller.state}>
        <TreeConfigContext.Provider value={config}>
          <ControlledSelectComponent {...props} />
        </TreeConfigContext.Provider>
      </TreeStateContext.Provider>
    </TreeServiceContext.Provider>
  );
};

export default ControlledTreeSelectComponent;

import React, { useMemo } from 'react';
import { TreeConfigContext } from '../hooks/useTreeConfig';
import { TreeServiceContext } from '../hooks/useTreeService';
import { TreeStateContext } from '../hooks/useTreeState';
import { ControllerTreeProps, TreeConfig } from '../typings';
import TreeBodyComponent from './TreeBodyComponent';
import VirtualTreeBodyComponent from './VirtualTreeBodyComponent';

const ControllerTreeComponent: React.FC<ControllerTreeProps> = ({
  controller,
  className,
  onActivate,
  onSelect,
  height,
  virtual,
  gap,
  IconComponent,
  ItemComponent,
  itemClassName,
  TogglerComponent,
  paddingLeft,
  paddingRight,
  animate = true,
}) => {
  const config: TreeConfig = useMemo(() => {
    return {
      className,
      onActivate,
      animate,
      onSelect,
      height,
      virtual,
      gap,
      IconComponent,
      ItemComponent,
      itemClassName,
      TogglerComponent,
      paddingLeft,
      paddingRight,
    };
  }, [
    className,
    onActivate,
    animate,
    onSelect,
    height,
    virtual,
    gap,
    IconComponent,
    ItemComponent,
    itemClassName,
    TogglerComponent,
    paddingLeft,
    paddingRight,
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
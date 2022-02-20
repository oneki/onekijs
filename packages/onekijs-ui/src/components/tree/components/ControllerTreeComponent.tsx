import React, { useMemo } from 'react';
import { TreeConfigContext } from '../hooks/useTreeConfig';
import { TreeServiceContext } from '../hooks/useTreeService';
import { TreeStateContext } from '../hooks/useTreeState';
import { ControllerTreeProps, TreeConfig } from '../typings';
import TreeBodyComponent from './TreeBodyComponent';

const ControllerTreeComponent: React.FC<ControllerTreeProps> = ({ controller, className, onActivate, onSelect }) => {
  const config: TreeConfig = useMemo(() => {
    return {
      className,
      onActivate,
      onSelect,
    };
  }, [className, onActivate, onSelect]);

  return (
    <TreeServiceContext.Provider value={controller.asService()}>
      <TreeStateContext.Provider value={controller.state}>
        <TreeConfigContext.Provider value={config}>
          <TreeBodyComponent {...config} controller={controller} />
        </TreeConfigContext.Provider>
      </TreeStateContext.Provider>
    </TreeServiceContext.Provider>
  );
};

ControllerTreeComponent.displayName = 'Tree';

export default ControllerTreeComponent;

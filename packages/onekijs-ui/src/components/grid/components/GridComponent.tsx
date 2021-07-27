import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import GridService from '../GridService';
import { GridProps } from '../typings';
import { DefaultGridContext } from '../useGridContext';
import GridBodyComponent from './GridBodyComponent';

const GridComponent: React.FC<GridProps> = ({ service }) => {
  const classNames = addClassname('o-grid', service.className);

  const contextRef = useRef<GridService>(service);

  return (
    <DefaultGridContext.Provider value={contextRef.current}>
      <div className={classNames}>
        <GridBodyComponent collection={service} columns={service.columns} />
      </div>
    </DefaultGridContext.Provider>
  );
};

GridComponent.displayName = 'Grid';

export default GridComponent;
